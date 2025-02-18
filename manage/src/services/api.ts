import axios from 'axios';

export interface NewsData {
  id?: number;
  title: string;
  content: string;
  source: string;
  link: string;
  image?: string;
  isFeature?: boolean;
  date?: Date;
}

export interface BannerData {
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
}

export interface ProductData {
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  details?: string;
}

// 添加基础URL配置
const isDev = process.env.NODE_ENV === 'development';
const BASE_URL = isDev ? 'http://localhost:4000' : '';
const API_BASE_URL = isDev ? 'http://localhost:4000/api' : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 添加获取完整URL的工具函数
export const getFullUrl = (path: string) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `${BASE_URL}${path}`;
};

export const newsApi = {
  // 获取新闻列表
  getNewsList: () => api.get<NewsData[]>('/news'),

  // 获取单个新闻
  getNewsById: (id: number) => api.get<NewsData>(`/news/${id}`),

  // 创建新闻
  createNews: (data: NewsData) => api.post<NewsData>('/news', data),

  // 更新新闻
  updateNews: (id: number, data: NewsData) => api.put<NewsData>(`/news/${id}`, data),

  // 删除新闻
  deleteNews: (id: number) => api.delete(`/news/${id}`),

  // 批量删除新闻
  batchDeleteNews: (ids: number[]) => api.post('/news/batch-delete', { ids })
};

export const uploadApi = {
  // 上传文件
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post<{ url: string }>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export const bannerApi = {
  // 获取 banner 列表
  getBannerList: () => api.get<BannerData[]>('/banners'),

  // 获取单个 banner
  getBannerById: (id: number) => api.get<BannerData>(`/banners/${id}`),

  // 创建 banner
  createBanner: (data: BannerData) => api.post<BannerData>('/banners', data),

  // 更新 banner
  updateBanner: (id: number, data: BannerData) => api.put<BannerData>(`/banners/${id}`, data),

  // 删除 banner
  deleteBanner: (id: number) => api.delete(`/banners/${id}`),
};

export const productApi = {
  // 获取产品列表
  getProductList: () => api.get<ProductData[]>('/products'),

  // 获取单个产品
  getProductById: (id: number) => api.get<ProductData>(`/products/${id}`),

  // 创建产品
  createProduct: (data: ProductData) => api.post<ProductData>('/products', data),

  // 更新产品
  updateProduct: (id: number, data: ProductData) => api.put<ProductData>(`/products/${id}`, data),

  // 删除产品
  deleteProduct: (id: number) => api.delete(`/products/${id}`),
};

export default api; 