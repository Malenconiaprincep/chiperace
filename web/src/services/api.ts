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
  images?: ProductImage[];
  specifications?: {
    summary: string;
    details: SpecificationDetail[];
  };
  advantages?: Advantage[];
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
  getNewsList: () => api.get<NewsItem[]>('/news'),

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