import type { BotUpdatesHandlers } from "@effect-ak/tg-bot-client/bot";
import { CDN_PACKAGE_EXPORTS } from "../const";

export const replaceImports =
  (code: string) => {
    let prepared = code;

    for (const { js_url, packageName, entryName } of Object.values(CDN_PACKAGE_EXPORTS)) {
      if (!packageName || !js_url || !entryName) continue;
      prepared = prepared.replaceAll(packageName + "/" + entryName, js_url);
    }

    return prepared;
  }

export async function loadBotHandlers(code: string) {
  const preparedCode = replaceImports(code);
  console.log("prepared code", preparedCode);
  const blob = new Blob([ preparedCode ], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  try {
    const handlers = await import(/* @vite-ignore */url);
    if (!handlers.default) return;
    return handlers.default as BotUpdatesHandlers
  } catch (error) {
    console.log("Can't load handlers", error);
    return;
  } finally {
    URL.revokeObjectURL(url)
  }

}
