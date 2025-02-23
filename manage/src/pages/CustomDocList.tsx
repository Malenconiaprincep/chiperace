import { Table, Button, Space, Popconfirm, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customDocApi } from '../services/api';

const CustomDocList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await customDocApi.getDocs();
      setData(response.data);
    } catch (error) {
      console.error('获取文档列表失败:', error);
      message.error('获取文档列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await customDocApi.deleteDoc(id);
      message.success('删除成功');
      fetchData();
    } catch (error) {
      console.error('删除文档失败:', error);
      message.error('删除失败');
    }
  };

  const getDocTypeName = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'user-agreement': '用户协议',
      'legal-notice': '法律声明',
      'privacy-policy': '隐私政策'
    };
    return typeMap[type] || type;
  };

  const columns = [
    {
      title: '文档类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => getDocTypeName(type)
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => new Date(date).toLocaleString()
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link" onClick={() => navigate(`/custom-docs/edit/${record.id}`)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个文档吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => navigate('/custom-docs/new')}>
          新建文档
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default CustomDocList; 