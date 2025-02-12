import { Form, Input, Switch, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig } from '@wangeditor/editor';
import { useState } from 'react';
import { newsApi } from '../services/api';

interface NewsFormData {
  title: string;
  source: string;
  link: string;
  content: string;
  image?: string;
  isFeature?: boolean;
}

const NewsForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);

  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {}
  };

  const toolbarConfig = {
    excludeKeys: []
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const formData = {
        ...values,
        content: html,
        date: new Date()
      };

      await newsApi.createNews(formData);
      message.success('保存成功');
      navigate('/news');
    } catch (error) {
      console.error('创建新闻失败:', error);
      message.error('保存失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card title="新建新闻" style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            isFeature: false
          }}
        >
          <Form.Item
            name="title"
            label="新闻标题"
            rules={[{ required: true, message: '请输入新闻标题' }]}
          >
            <Input placeholder="请输入新闻标题" />
          </Form.Item>

          <Form.Item
            name="source"
            label="新闻来源"
            rules={[{ required: true, message: '请输入新闻来源' }]}
          >
            <Input placeholder="请输入新闻来源" />
          </Form.Item>

          <Form.Item
            name="link"
            label="新闻链接"
            rules={[{ required: true, message: '请输入新闻链接' }]}
          >
            <Input placeholder="请输入新闻链接" />
          </Form.Item>

          <Form.Item
            name="image"
            label="新闻图片"
            extra="请输入图片URL地址"
          >
            <Input placeholder="请输入图片URL" />
          </Form.Item>

          <Form.Item
            label="新闻内容"
            required
            rules={[{
              required: true,
              message: '请输入新闻内容',
              validator: (_, value) => {
                if (html && html.trim() !== '<p><br></p>') {
                  return Promise.resolve();
                }
                return Promise.reject('请输入新闻内容');
              }
            }]}
          >
            <div style={{ border: '1px solid #d9d9d9', borderRadius: '2px' }}>
              <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                style={{ borderBottom: '1px solid #d9d9d9' }}
              />
              <Editor
                defaultConfig={editorConfig}
                value={html}
                onCreated={setEditor}
                onChange={editor => setHtml(editor.getHtml())}
                mode="default"
                style={{ height: '500px', overflowY: 'hidden' }}
              />
            </div>
          </Form.Item>

          <Form.Item
            name="isFeature"
            label="是否为特色新闻"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ marginRight: 8 }}>
              保存
            </Button>
            <Button onClick={() => navigate('/news')}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default NewsForm; 