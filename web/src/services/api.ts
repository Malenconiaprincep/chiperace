import axios from 'axios';

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  source: string;
  link: string;
  image?: string;
  isFeature?: boolean;
  date: string;
}

export interface BannerItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
}

export interface ProductItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link?: string;
  details?: string;
}

export interface ProductImage {
  url: string;
  alt?: string;
}

export interface SpecificationDetail {
  label: string;
  value: string;
}

export interface Advantage {
  title: string;
  description: string;
}

export interface ProductDetail extends ProductItem {
  content?: string;          // 详细内容
  images?: {                 // 产品图片列表
    url: string;
    alt?: string;
  }[];
  specifications?: {         // 产品规格
    summary: string;         // 规格概述
    details: {               // 规格详情列表
      label: string;         // 规格名称
      value: string;         // 规格值
    }[];
  };
  advantages?: {             // 产品优势
    title: string;           // 优势标题
    description: string;     // 优势描述
  }[];
}

export interface NewsListParams {
  year?: number | null;
  month?: number | null;
  page?: number;
  pageSize?: number;
  isNormal?: boolean;
}

export interface NewsListResponse {
  data: NewsItem[];
  total: number;
}

export interface PurchaseFormData {
  id?: number;
  company: string;
  contact: string;
  phone: string;
  email: string;
  requirements: string;
  status?: 'pending' | 'processing' | 'completed';
  submitTime?: string;
}

export interface CustomDoc {
  id: number;
  type: string;
  content: string;
  updatedAt: string;
}

export interface ApplicationItem {
  id: number;
  order: number;
  title: string;
  description: string;
  image: string;
  link?: string;
  details?: string;
  hasDetails?: boolean;
}

export const BASE_URL = location.host.indexOf('localhost') !== -1 ? 'http://localhost:4000' : '';
const API_BASE_URL = location.host.indexOf('localhost') !== -1
  ? 'http://localhost:4000/api'  // 开发环境
  : '/api';  // 生产环境

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const newsApi = {
  // 获取新闻列表
  getNewsList: (params?: NewsListParams) => {
    return api.get<NewsListResponse>('/news', { params }).then(res => res.data);
  },

  // 获取新闻详情
  getNewsById: (id: string) => api.get<NewsItem>(`/news/${id}`),

  getFeatureNews: () => api.get<NewsItem[]>('/news/feature').then(res => res.data),
};

export const bannerApi = {
  // 获取 banner 列表
  getBannerList: () => api.get<BannerItem[]>('/banners'),

  // 获取单个 banner
  getBannerById: (id: number) => api.get<BannerItem>(`/banners/${id}`)
};

export const productApi = {
  // 获取产品列表
  getProductList: () => api.get<ProductItem[]>('/products'),

  // 获取产品详情
  getProductById: (id: number) => api.get<ProductItem>(`/products/${id}`),

  getProductDetail: (id: string) => {
    return api.get<ProductDetail>(`/products/${id}`);
  },
};

export const purchaseApi = {
  // 提交采购申请
  submitPurchase: (data: PurchaseFormData) =>
    api.post<PurchaseFormData>('/purchases', data),

  // 获取采购申请列表
  getPurchaseList: () =>
    api.get<PurchaseFormData[]>('/purchases'),

  // 获取单个采购申请
  getPurchaseById: (id: number) =>
    api.get<PurchaseFormData>(`/purchases/${id}`),

  // 更新采购申请状态
  updatePurchaseStatus: (id: number, status: string) =>
    api.put<PurchaseFormData>(`/purchases/${id}/status`, { status }),

  // 搜索采购申请
  searchPurchases: (params: { query?: string; status?: string }) =>
    api.get<PurchaseFormData[]>('/purchases/search', { params }),
};

export const customDocApi = {
  // 获取所有文档
  getDocs: () => api.get<CustomDoc[]>('/custom-docs'),

  // 根据类型获取文档
  getDocByType: async (type: string) => {
    const response = await api.get<CustomDoc[]>('/custom-docs');
    const docs = response.data;
    return docs.find(doc => doc.type === type);
  }
};

export const applicationApi = {
  // 获取应用领域列表
  getApplicationList: () => api.get<ApplicationItem[]>('/applications').then(res => res.data),

  // 获取单个应用领域
  getApplicationById: (id: number) => api.get<ApplicationItem>(`/applications/${id}`).then(res => res.data),
};

export const getFullUrl = (path: string) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `${BASE_URL}${path}`;
};

export default api; 