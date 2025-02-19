import { Table, Button, Space, Modal, message } from 'antd';
import { useState, useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { productApi, getFullUrl } from '../services/api';
import type { ProductData } from '../services/api';

const ProductList = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductData[]>([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getProductList();
      setProducts(response.data);
    } catch (error) {
      console.error('获取产品列表失败:', error);
      message.error('获取产品列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await productApi.deleteProduct(id);
      message.success('删除成功');
      fetchProducts();
    } catch (error) {
      console.error('删除失败:', error);
      message.error('删除失败');
    }
  };

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: '确定要删除这个产品吗？',
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
      title: '产品图片',
      dataIndex: 'image',
      render: (image: string) => (
        <img
          src={getFullUrl(image)}
          alt="产品图片"
          style={{ width: '120px', height: '60px', objectFit: 'cover' }}
        />
      ),
    },
    {
      title: '产品名称',
      dataIndex: 'title',
    },
    {
      title: '副标题',
      dataIndex: 'subtitle',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: ProductData) => (
        <Space size="middle">
          <Button type="link" onClick={() => navigate(`/products/edit/${record.id}`)}>
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
          onClick={() => navigate('/products/new')}
        >
          新建产品
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default ProductList; 