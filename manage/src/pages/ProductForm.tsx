import { Form, Input, Button, Card, message, Upload } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig } from '@wangeditor/editor';
import { useState, useEffect } from 'react';
import { productApi, uploadApi, getFullUrl } from '../services/api';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setInitialLoading(true);
        const response = await productApi.getProductById(Number(id));
        const product = response.data;

        form.setFieldsValue({
          title: product.title,
          subtitle: product.subtitle,
          description: product.description,
          link: product.link,
        });
        setHtml(product.details || '');
        setImageUrl(product.image);
      } catch (error) {
        console.error('获取产品失败:', error);
        message.error('获取产品失败');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProduct();
  }, [id, form]);

  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入产品详情...',
    MENU_CONF: {
      uploadImage: {
        customUpload(file: File, insertFn: any) {
          const isLt5M = file.size / 1024 / 1024 < 5;
          if (!isLt5M) {
            message.error('图片必须小于5MB!');
            return;
          }

          const isImage = file.type.startsWith('image/');
          if (!isImage) {
            message.error('只能上传图片文件!');
            return;
          }

          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const base64Str = reader.result as string;
            insertFn(base64Str);
          };
          reader.onerror = () => {
            message.error('图片上传失败');
          };
        }
      }
    }
  };

  const toolbarConfig = {
    excludeKeys: []
  };

  const onFinish = async (values: any) => {
    if (!imageUrl) {
      message.error('请上传产品图片');
      return;
    }

    if (!html || html.trim() === '<p><br></p>') {
      message.error('请输入产品详情');
      return;
    }

    try {
      setLoading(true);
      const formData = {
        ...values,
        image: imageUrl,
        details: html,
      };

      if (id) {
        await productApi.updateProduct(Number(id), formData);
      } else {
        await productApi.createProduct(formData);
      }

      message.success('保存成功');
      navigate('/products');
    } catch (error) {
      console.error('保存产品失败:', error);
      message.error('保存失败');
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('只能上传图片文件!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('图片必须小于5MB!');
    }
    return isImage && isLt5M;
  };

  const handleChange = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setUploading(true);
      return;
    }

    if (info.file.status === 'done') {
      try {
        const response = await uploadApi.uploadFile(info.file.originFileObj as File);
        setImageUrl(response.data.url);
      } catch (error) {
        message.error('上传图片失败');
      } finally {
        setUploading(false);
      }
    }
  };

  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  return (
    <Card title={id ? "编辑产品" : "新建产品"} style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          label="产品名称"
          rules={[{ required: true, message: '请输入产品名称' }]}
        >
          <Input placeholder="请输入产品名称" />
        </Form.Item>

        <Form.Item
          name="subtitle"
          label="副标题"
          rules={[{ required: true, message: '请输入副标题' }]}
        >
          <Input placeholder="请输入副标题" />
        </Form.Item>

        <Form.Item
          name="description"
          label="产品描述"
          rules={[{ required: true, message: '请输入产品描述' }]}
        >
          <Input.TextArea rows={4} placeholder="请输入产品描述" />
        </Form.Item>

        <Form.Item
          name="link"
          label="产品链接"
          rules={[{ message: '请输入产品链接' }]}
        >
          <Input placeholder="请输入产品链接" />
        </Form.Item>

        <Form.Item
          label="产品图片"
          required
          extra="支持jpg、png格式，大小不超过5MB"
        >
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            customRequest={async ({ file, onSuccess, onError }) => {
              try {
                const response = await uploadApi.uploadFile(file as File);
                onSuccess?.(response.data);
              } catch (error) {
                onError?.(error as Error);
              }
            }}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={getFullUrl(imageUrl)}
                alt="产品图片"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          label="产品详情"
          required
          rules={[{
            required: true,
            message: '请输入产品详情',
            validator: (_) => {
              if (html && html.trim() !== '<p><br></p>') {
                return Promise.resolve();
              }
              return Promise.reject('请输入产品详情');
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
          <Button onClick={() => navigate('/products')}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProductForm; 