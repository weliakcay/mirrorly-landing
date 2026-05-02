import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Mirrorly Landing — bagimsiz Vite projesi.
// App (mirrorly-app-main/) port 5173 kullaniyor; landing 5174'e baglanir,
// ikisi ayni anda calisirken cakismaz.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
