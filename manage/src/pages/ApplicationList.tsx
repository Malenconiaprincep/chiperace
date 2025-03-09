import { Table, Button, Space, Modal, message } from 'antd';
import { useState, useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { applicationApi, getFullUrl } from '../services/api';
import type { ApplicationData } from '../services/api';

const ApplicationList = () => {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationApi.getApplicationList();
      setApplications(response.data);
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
      />
    </div>
  );
};

export default ApplicationList; 