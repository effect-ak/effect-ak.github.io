import type { UserConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

const configs: Record<string, UserConfig> = {
  "tg-bot-playground": {
    root: "src/tg-bot-playground",
    publicDir: "static",
    base: "./",
    plugins: [
      tailwindcss(),
      tsconfigPaths()
    ],
    build: {
      emptyOutDir: true,
      outDir: "../../docs/telegram-bot-playground",
      minify: true
    }
  },
  "cv-maker": {
    root: "src/cv-maker",
    publicDir: "static",
    base: "./",
    plugins: [
      tailwindcss(),
      tsconfigPaths()
    ],
    build: {
      emptyOutDir: true,
      outDir: "../../docs/cv-maker",
      minify: true
    }
  }
}

const project = process.env["PROJECT"];

if (!project) console.error("Project environment is undefined");

const config = configs[project!];

if (!config) console.error("Project is unknown");

console.log("resolved config =>", config);

export default config;
