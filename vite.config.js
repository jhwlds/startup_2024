import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4000', // 기존 API 프록시 설정
      '/ws': {
        target: 'ws://localhost:4000', // WebSocket 연결을 위한 설정
        ws: true, // WebSocket을 사용하도록 설정
      },
    },
  },
});