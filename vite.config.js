import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
  ],

  //
  // I found it better to manually set ports, otherwise host can't open it
  //
  preview: {
    port: 8082,
    strictPort: true,
  },
  server: {
    port: 8082,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8082",

    //
    // Solution above won't work because of browser's CORS
    //
    proxy: {
      //
      // That's why i create proxy that:
      // - listen browser's request on `http://localhost:8082/api`
      // - transfer it to '..backend.../api/v1`
      // - inside docker compose network it will be resolved OK
      //
      '/api': {
        target: 'http://backend:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/,'/cryptocurrencies/api/v1'),
      }
    }
  },
});