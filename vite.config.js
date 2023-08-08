import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inheritAttrs  from 'vite-plugin-vue-setup-inherit-attrs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), inheritAttrs()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "./src/styles/partials/_mixins.scss" as *;
        @use "./src/styles/partials/_variables.scss" as *;
        @use "./src/styles/styles.scss" as *;
        `
      }
    }
  }
})
