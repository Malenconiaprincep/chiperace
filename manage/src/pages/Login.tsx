import {
  Form, Input, Button, Card, message,
  // Space
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  useNavigate,
  // Link
} from 'react-router-dom';
// import { login } from '../services/auth';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      // const response: any = await login(values);
      // localStorage.setItem('token', response.token);
      if (values.username === 'admin_chipierce' && values.password === 'ChiPierce123@GD&CS') {
        localStorage.setItem('token', 'dummy-token');
      }
      message.success('登录成功');
      navigate('/dashboard');
    } catch (error: any) {
      message.error(error.message || '登录失败');
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>后台管理系统</h2>
        <Form
          name="login"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              登录
            </Button>
          </Form.Item>
          {/* <Form.Item style={{ marginBottom: 0, textAlign: 'center' }}>
            <Space>
              <Link to="/register">注册新账号</Link>
              <Link to="/forgot-password">忘记密码</Link>
            </Space>
          </Form.Item> */}
        </Form>
      </Card>
    </div>
  );
};

export default Login;