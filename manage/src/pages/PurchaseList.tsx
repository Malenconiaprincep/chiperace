import { Table, Space, Button, Modal, message, Tag, Input, Select } from 'antd';
import { useState, useEffect } from 'react';
import { purchaseApi, type PurchaseFormData } from '../services/api';

const { Search } = Input;
const { Option } = Select;

const PurchaseList = () => {
  const [loading, setLoading] = useState(false);
  const [purchases, setPurchases] = useState<PurchaseFormData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      if (searchText || statusFilter !== 'all') {
        const response = await purchaseApi.searchPurchases({
          query: searchText || undefined,
          status: statusFilter === 'all' ? undefined : statusFilter
        });
        setPurchases(response.data);
      } else {
        const response = await purchaseApi.getPurchaseList();
        setPurchases(response.data);
      }
    } catch (error) {
      message.error('获取采购申请列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, [searchText, statusFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await purchaseApi.updatePurchaseStatus(id, newStatus);
      message.success('状态更新成功');
      fetchPurchases();
    } catch (error) {
      message.error('状态更新失败');
    }
  };

  const showDetails = (record: PurchaseFormData) => {
    Modal.info({
      title: '采购申请详情',
      width: 600,
      content: (
        <div>
          <p><strong>公司名称：</strong>{record.company}</p>
          <p><strong>联系人：</strong>{record.contact}</p>
          <p><strong>联系电话：</strong>{record.phone}</p>
          <p><strong>电子邮箱：</strong>{record.email}</p>
          <p><strong>提交时间：</strong>{record.submitTime}</p>
          <p><strong>采购需求：</strong></p>
          <p>{record.requirements}</p>
        </div>
      ),
    });
  };

  const columns = [
    {
      title: '申请编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '联系方式',
      key: 'contact',
      render: (_: any, record: PurchaseFormData) => (
        <>
          <div>{record.phone}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>{record.email}</div>
        </>
      ),
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
    },
    {
      title: '状态',
      key: 'status',
      render: (_: any, record: PurchaseFormData) => (
        <Select
          value={record.status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record.id, value)}
        >
          <Option value="pending">待处理</Option>
          <Option value="processing">处理中</Option>
          <Option value="completed">已完成</Option>
        </Select>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: PurchaseFormData) => (
        <Button type="link" onClick={() => showDetails(record)}>
          查看详情
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <Search
          placeholder="搜索公司名称或联系人"
          style={{ width: 300 }}
          onSearch={value => setSearchText(value)}
        />
        <Select
          defaultValue="all"
          style={{ width: 120 }}
          onChange={value => setStatusFilter(value)}
        >
          <Option value="all">全部状态</Option>
          <Option value="pending">待处理</Option>
          <Option value="processing">处理中</Option>
          <Option value="completed">已完成</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={purchases}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default PurchaseList; 