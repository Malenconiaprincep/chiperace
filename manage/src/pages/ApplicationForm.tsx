import { Form, Input, Button, Card, message, Upload, InputNumber } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig } from '@wangeditor/editor';
import { useState, useEffect } from 'react';
import { applicationApi, uploadApi, getFullUrl } from '../services/api';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';

const ApplicationForm = () => {
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
    const fetchApplication = async () => {
      if (!id) return;

      try {
        setInitialLoading(true);
        const response = await applicationApi.getApplicationById(Number(id));
        const application = response.data;

        form.setFieldsValue({
          title: application.title,
          description: application.description,
          link: application.link,
          order: application.order,
        });
        setHtml(application.details || '');
        setImageUrl(application.image);
      } catch (error) {
        console.error('获取应用领域失败:', error);
        message.error('获取应用领域失败');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchApplication();
  }, [id, form]);

  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入应用领域详情（可选）...',
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
      message.error('请上传应用领域图片');
      return;
    }

    try {
      setLoading(true);
      const data = {
        ...values,
        image: imageUrl,
        details: html
      };

      if (id) {
        await applicationApi.updateApplication(Number(id), data);
        message.success('更新成功');
      } else {
        await applicationApi.createApplication(data);
        message.success('创建成功');
      }
      navigate('/applications');
    } catch (error) {
      console.error('保存失败:', error);
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

  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setUploading(true);
      return;
    }
    if (info.file.status === 'done') {
      setUploading(false);
      setImageUrl(info.file.response.url);
    }
  };

  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  return (
    <Card title={id ? '编辑应用领域' : '新建应用领域'}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ order: 0 }}
      >
        <Form.Item
          name="order"
          label="序号"
          rules={[{ required: true, message: '请输入序号' }]}
        >
          <InputNumber placeholder="请输入序号" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="title"
          label="应用领域名称"
          rules={[{ required: true, message: '请输入应用领域名称' }]}
        >
          <Input placeholder="请输入应用领域名称" />
        </Form.Item>

        <Form.Item
          name="description"
          label="应用领域描述"
          rules={[{ required: true, message: '请输入应用领域描述' }]}
        >
          <Input.TextArea rows={4} placeholder="请输入应用领域描述" />
        </Form.Item>

        <Form.Item
          name="link"
          label="应用领域链接"
          rules={[{ message: '请输入应用领域链接' }]}
        >
          <Input placeholder="请输入应用领域链接" />
        </Form.Item>

        <Form.Item
          label="应用领域图片"
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
                alt="应用领域图片"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          label="应用领域详情（可选）"
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
          <Button onClick={() => navigate('/applications')}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ApplicationForm; 