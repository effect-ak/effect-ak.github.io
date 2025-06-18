import type { PackageExports } from "~/common/monaco/instance";

export const CLIENT_VERSION = "0.6.2";
export const CLIENT_PACKAGE_NAME = "@effect-ak/tg-bot-client";
const JS_EXTENSION = "mjs";
export const CDN_SERVER_URL = "https://cdn.jsdelivr.net/npm";
// export const CDN_SERVER_URL = "http://localhost:8080";
export const CDN_PATH_PREFIX = `${CLIENT_PACKAGE_NAME}@${CLIENT_VERSION}/dist`;
// export const CDN_PATH_PREFIX = `node_modules/@effect-ak/tg-bot-client/dist`;
export const CDN_PACKAGE_EXPORTS: PackageExports = [
  {
    entryName: "index",
    packageName: CLIENT_PACKAGE_NAME,
    dts_url: `${CDN_SERVER_URL}/${CDN_PATH_PREFIX}/index.d.ts`,
    js_url: `${CDN_SERVER_URL}/${CDN_PATH_PREFIX}/index.${JS_EXTENSION}`
  },
  {
    entryName: "bot",
    packageName: CLIENT_PACKAGE_NAME,
    dts_url: `${CDN_SERVER_URL}/${CDN_PATH_PREFIX}/bot.d.ts`,
    js_url: `${CDN_SERVER_URL}/${CDN_PATH_PREFIX}/bot-bundle.${JS_EXTENSION}`
  },
  {
    entryName: "config-BFdBOrJI",
    packageName: CLIENT_PACKAGE_NAME,
    dts_url: `${CDN_SERVER_URL}/${CDN_PATH_PREFIX}/config-BFdBOrJI.d.ts`,
  },
]
