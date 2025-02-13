module.exports = {
  // ... 其他配置
  customFields: {
    isDev: process.env.NODE_ENV === 'development',
  },
  // 添加开发服务器代理配置
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
}; 