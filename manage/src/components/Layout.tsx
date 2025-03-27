import { Layout, Menu, Dropdown, Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  DashboardOutlined, 
  FileTextOutlined, 
  PictureOutlined, 
  ShoppingOutlined, 
  FormOutlined, 
  BookOutlined, 
  AppstoreOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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
    {
      key: 'applications',
      icon: <AppstoreOutlined />,
      label: '应用领域管理',
    },
  ];

  const userMenuItems = [
    {
      key: 'change-password',
      icon: <UserOutlined />,
      label: '修改密码',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      handleLogout();
    } else if (key === 'change-password') {
      navigate('/change-password');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: '0 24px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '18px' }}>
          后台管理系统
        </div>
        <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenuClick }} placement="bottomRight">
          <Button type="link" icon={<UserOutlined />}>
            管理员
          </Button>
        </Dropdown>
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