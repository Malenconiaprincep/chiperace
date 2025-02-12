import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3010, // 设置开发服务器端口为3000
    open: true, // 自动打开浏览器
    host: '0.0.0.0', // 允许外部访问
  }
}) 