import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { DashboardOutlined, FileTextOutlined, PictureOutlined, ShoppingOutlined, FormOutlined, BookOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: 'news',
      icon: <FileTextOutlined />,
      label: '新闻管理',
    },
    {
      key: 'banners',
      icon: <PictureOutlined />,
      label: 'Banner管理',
    },
    {
      key: 'products',
      icon: <ShoppingOutlined />,
      label: '产品管理',
    },
    {
      key: 'purchases',
      icon: <FormOutlined />,
      label: '采购申请',
    },
    {
      key: 'custom-docs',
      icon: <BookOutlined />,
      label: '自定义文档',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 0, background: '#fff' }}>
        <div style={{ padding: '0 24px', fontSize: '18px' }}>
          后台管理系统
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            onClick={({ key }) => navigate(`/${key}`)}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 