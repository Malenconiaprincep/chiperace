import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';

const API_BASE_URL = isDev
  ? 'http://localhost:4000/api'  // 开发环境
  : '/api';  // 生产环境

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
}); 