import { Form, Input, Switch, Button, Card, message, Upload, DatePicker } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig } from '@wangeditor/editor';
import { useState, useEffect } from 'react';
import { newsApi, uploadApi, getFullUrl } from '../services/api';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
// @ts-expect-error
import type { NewsData } from '../services/api';
import dayjs from 'dayjs';

// @ts-expect-error
interface NewsFormData {
  title: string;
  source: string;
  link: string;
  content: string;
  image?: string;
  isFeature?: boolean;
  date?: Date;
}

const NewsForm = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [uploading, setUploading] = useState(false);

  // 加载新闻数据
  useEffect(() => {
    const fetchNews = async () => {
      if (!id) return;

      try {
        setInitialLoading(true);
        const response = await newsApi.getNewsById(Number(id));
        const news = response.data;

        form.setFieldsValue({
          title: news.title,
          source: news.source,
          link: news.link,
          isFeature: news.isFeature,
          date: news.date ? dayjs(news.date) : undefined
        });
        setHtml(news.content || '');
        setImageUrl(news.image);
      } catch (error) {
        console.error('获取新闻失败:', error);
        message.error('获取新闻失败');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchNews();
  }, [id, form]);

  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        // 使用 base64 上传图片
        customUpload(file: File, insertFn: any) {
          // 校验文件大小
          const isLt5M = file.size / 1024 / 1024 < 5;
          if (!isLt5M) {
            message.error('图片必须小于5MB!');
            return;
          }

          // 校验文件类型
          const isImage = file.type.startsWith('image/');
          if (!isImage) {
            message.error('只能上传图片文件!');
            return;
          }

          // 转换为 base64
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
    try {
      setLoading(true);
      const formData = {
        ...values,
        content: html,
        date: values.date ? values.date.toDate() : new Date()
      };

      if (id) {
        await newsApi.updateNews(Number(id), formData);
      } else {
        await newsApi.createNews(formData);
      }

      message.success('保存成功');
      navigate('/news');
    } catch (error) {
      console.error('保存新闻失败:', error);
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
        form.setFieldsValue({ image: response.data.url });
      } catch (error) {
        message.error('上传图片失败');
        console.error('上传图片失败:', error);
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
    <div>
      <Card title={id ? "编辑新闻" : "新建新闻"} style={{ maxWidth: 1000, margin: '0 auto' }}>
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
            rules={[{ message: '请输入新闻链接' }]}
          >
            <Input placeholder="请输入新闻链接" />
          </Form.Item>

          <Form.Item
            name="image"
            label="新闻图片"
            extra="支持jpg、png、gif格式，大小不超过5MB"
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
                  alt="新闻图片"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            name="date"
            label="发布时间"
          >
            <DatePicker
              showTime
              placeholder="请选择发布时间"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="新闻内容"
            required
            rules={[{
              required: true,
              message: '请输入新闻内容',
              validator: (_) => {
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
            <Button
              type="primary"
              htmlType="submit"
              loading={loading || initialLoading}
              style={{ marginRight: 8 }}
            >
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