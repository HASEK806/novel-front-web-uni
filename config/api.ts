import axios from './axios';

// 定义接口类型
export interface Book {
  id: number;
  title: string;
  author: string;
  cover_image: string;
  description: string;
}

// 获取书籍列表
export const getBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      return response;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  };

// 其他接口可以按需添加




