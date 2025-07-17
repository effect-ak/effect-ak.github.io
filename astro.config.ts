import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import icon from "astro-icon"

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
    react(), icon()
  ],
  outDir: "docs",
  output: "static"
})