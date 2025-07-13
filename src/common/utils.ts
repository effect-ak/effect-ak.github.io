import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { Effect } from 'effect'
import { parse as _parseJson } from "jsonc-parser"

export const HELLO_MESSAGE = "Hey from common!"

export const fetchText =
  Effect.fn("fetch text")((path: string) =>
    Effect.tryPromise(() => fetch(path).then(_ => _.text()))
  )

export const parseJson =
  Effect.fn("parse jsonc")((input: string) =>
    Effect.try(() => _parseJson(input) as unknown)
  )

export function renderToString(cmpn: React.JSX.Element) {
  const div = document.createElement('div');
  const root = createRoot(div);
  flushSync(() => {
    root.render(cmpn);
  });
  return div.innerHTML
}

export function getUrlParam(name: string) {
  const params = new URLSearchParams(location.search);
  return params.get(name);
}

export function setUrlParam(name: string, value: string) {
  const url = new URL(location.href);
  url.searchParams.set(name, value);
  window.history.replaceState(null, '', url);
}


