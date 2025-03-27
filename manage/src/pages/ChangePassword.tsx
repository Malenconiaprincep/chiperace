import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { changePassword } from '../services/auth';

const ChangePassword: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await changePassword(values);
      message.success('密码修改成功');
      form.resetFields();
    } catch (error: any) {
      message.error(error.message || '密码修改失败');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card title="修改密码" style={{ maxWidth: 500, margin: '0 auto' }}>
        <Form
          form={form}
          name="changePassword"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="oldPassword"
            label="当前密码"
            rules={[{ required: true, message: '请输入当前密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码长度不能少于6位' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="确认新密码"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '请确认新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              确认修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePassword; 