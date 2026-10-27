import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { validateClientEnv } from './config/validateEnv.js'

export default defineConfig(({ command, mode }) => {
  validateClientEnv(loadEnv(mode, process.cwd(), 'VITE_'), { requireConfigured: command === 'build' })
  return {
    plugins: [react(), tailwindcss()],
  }
})
