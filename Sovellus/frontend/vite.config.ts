import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 5173,
    open: true,
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]", // CSS-moduulit
    },
  },
})
