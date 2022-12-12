import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  let base = command === 'serve' ? '/' : '/anitrax-web/'
  return {
    base,
    plugins: [svelte()]
  }
})
