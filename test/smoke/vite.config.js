import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// `@isc-hei/design` resolves to the checkout above through the file: dependency
// in package.json. dedupe keeps a single Vue, exactly as the real sites do.
export default defineConfig({
  plugins: [vue()],
  resolve: { dedupe: ['vue', 'canvas-confetti'] },
  build: { outDir: 'dist' },
})
