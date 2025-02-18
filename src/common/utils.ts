import type { MonacoLoader } from "./types";

export const fetchText = (path: string) =>
  fetch(path).then(_ => _.text());

export const getMonacoLoader = () => {
  if (!("monaco_loader" in window) || typeof window.monaco_loader != "object" || window.monaco_loader == null) {
    console.warn("monaco loader is not available");
    return;
  }

  return window.monaco_loader as MonacoLoader;

}
