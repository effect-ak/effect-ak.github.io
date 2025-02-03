import type { MonacoLoader, Alpine } from "./types";

export const fetchText = (path: string) =>
  fetch(path).then(_ => _.text());

export const getMonacoLoader = () => {
    if (!("monaco_loader" in window) || typeof window.monaco_loader != "object" || window.monaco_loader == null) {
      console.warn("monaco loader is not available");
      return;
    }

    return window.monaco_loader as MonacoLoader;

}

export function getAlpine() {

  if (!("Alpine" in window) || typeof window.Alpine != "object" || window.Alpine == null) {
    console.warn("Alpine is not available");
    return;
  }

  return window.Alpine as Alpine;

}
