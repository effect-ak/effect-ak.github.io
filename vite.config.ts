import type { UserConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const configs: Record<string, UserConfig> = {
  "tg-bot-playground": {
    root: "src/tg-bot-playground",
    publicDir: "static",
    base: "./",
    plugins: [
      tsconfigPaths()
    ],
    build: {
      emptyOutDir: true,
      outDir: "../../docs/tg-bot-playground",
      minify: false
    }
  }
}

const project = process.env["PROJECT"];

if (!project) console.error("Project environment is undefined");

const config = configs[project!];

if (!config) console.error("Project is unknown");

console.log("resolved config =>", config);

export default config;
