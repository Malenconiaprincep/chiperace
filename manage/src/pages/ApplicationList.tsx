import { Table, Button, Space, Modal, message } from 'antd';
import { useState, useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { applicationApi, getFullUrl } from '../services/api';
import type { ApplicationData, ApplicationListParams } from '../services/api';

const ApplicationList = () => {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const navigate = useNavigate();

  const fetchApplications = async (params: ApplicationListParams = {}) => {
    try {
      setLoading(true);
      const response = await applicationApi.getApplicationList({
        page: params.page || pagination.current,
        pageSize: params.pageSize || pagination.pageSize
      });
      setApplications(response.data);
      setPagination({
        current: response.page,
        pageSize: response.pageSize,
        total: response.total
      });
    } catch (error) {
      console.error('获取应用领域列表失败:', error);
      message.error('获取应用领域列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await applicationApi.deleteApplication(id);
      message.success('删除成功');
      fetchApplications();
    } catch (error) {
      console.error('删除失败:', error);
      message.error('删除失败');
    }
  };

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: '确定要删除这个应用领域吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后将无法恢复',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        return handleDelete(id);
      },
    });
  };

  const handleTableChange = (pagination: any) => {
    fetchApplications({
      page: pagination.current,
      pageSize: pagination.pageSize
    });
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'order',
      sorter: (a: ApplicationData, b: ApplicationData) => (a.order || 0) - (b.order || 0),
    },
    {
      title: '应用领域图片',
      dataIndex: 'image',
      render: (image: string) => (
        <img
          src={getFullUrl(image)}
          alt="应用领域图片"
          style={{ width: '120px', height: '60px', objectFit: 'cover' }}
        />
      ),
    },
    {
      title: '应用领域名称',
      dataIndex: 'title',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: ApplicationData) => (
        <Space size="middle">
          <Button type="link" onClick={() => navigate(`/applications/edit/${record.id}`)}>
            编辑
          </Button>
          <Button type="link" danger onClick={() => showDeleteConfirm(record.id!)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => navigate('/applications/new')}
        >
          新建应用领域
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={applications}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条记录`
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ApplicationList; 