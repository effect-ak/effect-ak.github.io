import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';

export const fetchText = (path: string) =>
  fetch(path).then(_ => _.text());

export function renderToString(cmpn: React.JSX.Element) {
  const div = document.createElement('div');
  const root = createRoot(div);
  flushSync(() => {
    root.render(cmpn);
  });
  return div.innerHTML
}

export const parseJSON = <A>(
  input: string | undefined, sanity = false
) => {
  if (!input) return;
  try {
    if (sanity) {
      return JSON.parse(removeTrailingCommas(removeJsonComments(input))) as A;
    } else {
      return JSON.parse(input) as A;
    }

  } catch (error) {
    return
  }
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

const trailingCommasRegex = /,\s*([\]}])/g;
function removeTrailingCommas(input: string): string {
  return input.replace(trailingCommasRegex, '$1');
}

const commentsRegex = /("(?:\\.|[^"\\])*")|(?:\/\*(?:[\s\S]*?)\*\/)|(\/\/.*)/g

export function removeJsonComments(input: string): string {
  return input.replace(
    commentsRegex,
    (_match, quotedString) => {
      if (quotedString !== undefined) {
        return quotedString;
      }
      return "";
    }
  );
}
