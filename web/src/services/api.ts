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
}

export interface NewsListResponse {
  data: NewsItem[];
  total: number;
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
  getNewsById: (id: string) => api.get<NewsItem>(`/news/${id}`)
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

export const getFullUrl = (path: string) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `${BASE_URL}${path}`;
};

export default api; 