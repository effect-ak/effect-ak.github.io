import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react';

export default defineConfig({
  devToolbar: {
    enabled: false
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  integrations: [
    react()
  ]
});