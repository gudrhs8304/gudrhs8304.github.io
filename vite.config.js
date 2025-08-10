import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    base: '/',
  // root domain user-site(gudrhs8304.github.io)이면 base는 기본값('/')이면 됩니다.
  // 다른 repo로 배포하는 경우 base를 '/repo-name/'으로 바꾸세요.
})
