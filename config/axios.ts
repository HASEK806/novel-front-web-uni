import axios from 'axios';

// 设置基本的 axios 配置
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000', // 确保你的后端 API 路径正确
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default instance;
