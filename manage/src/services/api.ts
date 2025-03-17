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
  order: number;
}

export interface ProductData {
  id?: number;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  details?: string;
}

// 添加新的接口类型
export interface PurchaseFormData {
  id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  requirements: string;
  status: 'pending' | 'processing' | 'completed';
  submitTime: string;
}

export interface CustomDocData {
  id?: number;
  type: string;
  content: string;
  updatedAt?: Date;
}

// 添加 ApplicationData 接口
export interface ApplicationData {
  id?: number;
  order: number;
  title: string;
  description: string;
  image: string;
  link: string;
  details?: string;
  subtitle?: string;
  hasDetails?: boolean;
}

export interface ApplicationListParams {
  page?: number;
  pageSize?: number;
}

export interface ApplicationListResponse {
  data: ApplicationData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
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

// 添加新的 API 方法
export const purchaseApi = {
  // 获取采购申请列表
  getPurchaseList: () => api.get<PurchaseFormData[]>('/purchases'),

  // 更新采购申请状态
  updatePurchaseStatus: (id: string, status: string) => api.put<PurchaseFormData>(`/purchases/${id}/status`, { status }),

  // 搜索采购申请
  searchPurchases: (params: { query?: string; status?: string }) => api.get<PurchaseFormData[]>('/purchases/search', { params }),
};

export const customDocApi = {
  getDocs: () => api.get<CustomDocData[]>('/custom-docs'),
  getDocById: (id: number) => api.get<CustomDocData>(`/custom-docs/${id}`),
  createDoc: (data: Partial<CustomDocData>) => api.post<CustomDocData>('/custom-docs', data),
  updateDoc: (id: number, data: Partial<CustomDocData>) => api.put<CustomDocData>(`/custom-docs/${id}`, data),
  deleteDoc: (id: number) => api.delete(`/custom-docs/${id}`),
};

// 添加应用领域 API
export const applicationApi = {
  // 获取应用领域列表
  getApplicationList: (params?: ApplicationListParams) =>
    api.get<ApplicationListResponse>('/applications', { params }).then(res => res.data),

  // 获取单个应用领域
  getApplicationById: (id: number) => api.get<ApplicationData>(`/applications/${id}`),

  // 创建应用领域
  createApplication: (data: ApplicationData) => api.post<ApplicationData>('/applications', data),

  // 更新应用领域
  updateApplication: (id: number, data: ApplicationData) => api.put<ApplicationData>(`/applications/${id}`, data),

  // 删除应用领域
  deleteApplication: (id: number) => api.delete(`/applications/${id}`),
};

export default api; 