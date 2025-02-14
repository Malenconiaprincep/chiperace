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
export const BASE_URL = location.host.indexOf('localhost') !== -1 ? 'http://localhost:4000' : '/admin';
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

export const getFullUrl = (path: string) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `${BASE_URL}${path}`;
};

export default api; 