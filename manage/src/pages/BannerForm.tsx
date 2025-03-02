import { Form, Input, Button, Card, message, Upload, InputNumber } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { bannerApi, uploadApi, getFullUrl } from '../services/api';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';

const BannerForm = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      if (!id) return;

      try {
        setInitialLoading(true);
        const response = await bannerApi.getBannerById(Number(id));
        const banner = response.data;

        form.setFieldsValue({
          title: banner.title,
          subtitle: banner.subtitle,
          description: banner.description,
          link: banner.link,
          order: banner.order,
        });
        setImageUrl(banner.image);
      } catch (error) {
        console.error('获取Banner失败:', error);
        message.error('获取Banner失败');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchBanner();
  }, [id, form]);

  const onFinish = async (values: any) => {
    if (!imageUrl) {
      message.error('请上传Banner图片');
      return;
    }

    try {
      setLoading(true);
      const formData = {
        ...values,
        image: imageUrl,
      };

      if (id) {
        await bannerApi.updateBanner(Number(id), formData);
      } else {
        await bannerApi.createBanner(formData);
      }

      message.success('保存成功');
      navigate('/banners');
    } catch (error) {
      console.error('保存Banner失败:', error);
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
    <Card title={id ? "编辑Banner" : "新建Banner"} style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
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
          label="标题"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input placeholder="请输入标题" />
        </Form.Item>

        <Form.Item
          name="subtitle"
          label="副标题"
          rules={[{ message: '请输入副标题' }]}
        >
          <Input placeholder="请输入副标题" />
        </Form.Item>

        <Form.Item
          name="description"
          label="描述"
          rules={[{ message: '请输入描述' }]}
        >
          <Input.TextArea rows={4} placeholder="请输入描述" />
        </Form.Item>

        <Form.Item
          name="link"
          label="链接"
          rules={[{ required: true, message: '请输入链接' }]}
        >
          <Input placeholder="请输入链接" />
        </Form.Item>

        <Form.Item
          label="Banner图片"
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
                alt="banner"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
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
          <Button onClick={() => navigate('/banners')}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default BannerForm; 