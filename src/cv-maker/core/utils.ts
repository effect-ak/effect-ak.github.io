import React from "react";
import { Schema as S } from "effect"
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { ResumeObject } from "#/cv-maker/core/schema";
import { Resume } from "#/cv-maker/core/template"

function renderToString(cmpn: React.JSX.Element) {
  const div = document.createElement('div');
  const root = createRoot(div);
  flushSync(() => {
    root.render(cmpn);
  });
  return div.innerHTML
}

export const resumeObjectToHTML =
  (resume: ResumeObject) => {
    try {
      return renderToString(Resume(S.decodeSync(ResumeObject)(resume)))
    } catch (e) {
      console.log("render error", e);
      return ""
    }
  }


export const getExampleResume = async () => {
  const resume = await fetch("./john-doe.jsonc").then(_ => _.text()).then(_ => parseJSON(_, true));

  delete resume["$schema"];

  const input = S.decodeUnknownSync(ResumeObject)(resume);
  return input;
}

export const parseJSON = (input: string | undefined, sanity = false) => {
  if (!input) return;
  try {
    if (sanity) {
      return JSON.parse(removeTrailingCommas(removeJsonComments(input)));
    } else {
      return JSON.parse(input);
    }

  } catch (error) { }
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T, wait: number
) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
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

const trailingCommasRegex = /,\s*([\]}])/g;
function removeTrailingCommas(input: string): string {
  return input.replace(trailingCommasRegex, '$1');
}
