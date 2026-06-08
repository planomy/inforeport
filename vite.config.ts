import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages project site: planomy.github.io/inforeport
  base: command === 'serve' ? '/' : '/inforeport/',
  plugins: [react()],
}))
