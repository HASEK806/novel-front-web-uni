// 获取当前环境变量
export const getEnv = () => {
    return process.env.NODE_ENV || 'development'; // 返回开发环境、生产环境或测试环境
  };
  