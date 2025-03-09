import { Form, Button, Card, message, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig } from '@wangeditor/editor';
import { useState, useEffect } from 'react';
import { customDocApi } from '../services/api';



const docTypes = [
  { value: 'user-agreement', label: '用户协议' },
  { value: 'legal-notice', label: '法律声明' },
  { value: 'privacy-policy', label: '隐私政策' }
];

const CustomDocForm = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  // 加载文档数据
  useEffect(() => {
    const fetchDoc = async () => {
      if (!id) return;

      try {
        setInitialLoading(true);
        const response = await customDocApi.getDocById(Number(id));
        const doc = response.data;

        form.setFieldsValue({
          type: doc.type
        });
        setHtml(doc.content || '');
      } catch (error) {
        console.error('获取文档失败:', error);
        message.error('获取文档失败');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchDoc();
  }, [id, form]);

  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
  };

  const toolbarConfig = {
    excludeKeys: []
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const formData = {
        ...values,
        title: docTypes.find(t => t.value === values.type)?.label || values.type,
        content: html,
        updatedAt: new Date()
      };

      if (id) {
        await customDocApi.updateDoc(Number(id), formData);
      } else {
        await customDocApi.createDoc(formData);
      }

      message.success('保存成功');
      navigate('/custom-docs');
    } catch (error) {
      console.error('保存文档失败:', error);
      message.error('保存失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card title={id ? "编辑文档" : "新建文档"} style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="type"
            label="文档类型"
            rules={[{ required: true, message: '请选择文档类型' }]}
          >
            <Select
              placeholder="请选择文档类型"
              options={docTypes}
            />
          </Form.Item>

          <Form.Item
            label="文档内容"
            required
            rules={[{
              required: true,
              message: '请输入文档内容',
              validator: (_) => {
                if (html && html.trim() !== '<p><br></p>') {
                  return Promise.resolve();
                }
                return Promise.reject('请输入文档内容');
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading || initialLoading}
              style={{ marginRight: 8 }}
            >
              保存
            </Button>
            <Button onClick={() => navigate('/custom-docs')}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CustomDocForm;
