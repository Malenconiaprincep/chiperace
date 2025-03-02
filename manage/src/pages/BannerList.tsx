import { Table, Button, Space, Modal, message } from 'antd';
import { useState, useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { bannerApi, getFullUrl } from '../services/api';
import type { BannerData } from '../services/api';

const BannerList = () => {
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState<BannerData[]>([]);
  const navigate = useNavigate();

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await bannerApi.getBannerList();
      setBanners(response.data);
    } catch (error) {
      console.error('获取Banner列表失败:', error);
      message.error('获取Banner列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await bannerApi.deleteBanner(id);
      message.success('删除成功');
      fetchBanners();
    } catch (error) {
      console.error('删除失败:', error);
      message.error('删除失败');
    }
  };

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: '确定要删除这个Banner吗？',
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
      sorter: (a: BannerData, b: BannerData) => (a.order || 0) - (b.order || 0),
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '副标题',
      dataIndex: 'subtitle',
    },
    {
      title: '图片',
      dataIndex: 'image',
      render: (image: string) => (
        <img
          src={getFullUrl(image)}
          alt="banner"
          style={{ width: '120px', height: '60px', objectFit: 'cover' }}
        />
      ),
    },
    {
      title: '链接',
      dataIndex: 'link',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: BannerData) => (
        <Space size="middle">
          <Button type="link" onClick={() => navigate(`/banners/edit/${record.id}`)}>
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
          onClick={() => navigate('/banners/new')}
        >
          新建Banner
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={banners}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default BannerList; 