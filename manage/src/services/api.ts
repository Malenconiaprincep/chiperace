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

const API_BASE_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

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

export default api; 