import { Table, Button, Space, Modal, message } from 'antd';
import { useState, useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { newsApi } from '../services/api';
import type { NewsData } from '../services/api';

const NewsList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<NewsData[]>([]);
  const navigate = useNavigate();

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await newsApi.getNewsList() as any;
      setNews(response.data?.data);
    } catch (error) {
      console.error('获取新闻列表失败:', error);
      message.error('获取新闻列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await newsApi.deleteNews(id);
      message.success('删除成功');
      fetchNews(); // 重新加载列表
    } catch (error) {
      console.error('删除失败:', error);
      message.error('删除失败');
    }
  };

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: '确定要删除这篇新闻吗？',
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

  const handleBatchDelete = async () => {
    try {
      await newsApi.batchDeleteNews(selectedRowKeys as number[]);
      message.success('批量删除成功');
      setSelectedRowKeys([]);
      fetchNews(); // 重新加载列表
    } catch (error) {
      console.error('批量删除失败:', error);
      message.error('批量删除失败');
    }
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '来源',
      dataIndex: 'source',
    },
    {
      title: '发布时间',
      dataIndex: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: NewsData) => (
        <Space size="middle">
          <Button type="link" onClick={() => navigate(`/news/edit/${record.id}`)}>
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
          style={{ marginRight: 8 }}
          onClick={() => navigate('/news/new')}
        >
          新建新闻
        </Button>
        <Button
          danger
          disabled={!selectedRowKeys.length}
          onClick={() => handleBatchDelete()}
        >
          批量删除
        </Button>
      </div>
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        columns={columns}
        dataSource={news}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default NewsList;
