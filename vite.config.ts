import type { UserConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default {
  root: "src",
  publicDir: "static",
  base: "./",
  plugins: [
    tailwindcss(),
    tsconfigPaths()
  ],
  build: {
    emptyOutDir: true,
    outDir: "../docs",
    minify: true,
    rollupOptions: {
      input: [
        './src/tg-bot-playground/index.html',
        './src/cv-maker/index.html'
      ]
    }
  }
} satisfies UserConfig
