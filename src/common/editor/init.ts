import type { editor } from "monaco-editor";
import type { Monaco } from "#/common/types";
import { getMonacoLoader } from "../utils";

export const initMonaco = () => {
  const loader = getMonacoLoader();

  if (!loader) return;

  loader.config({
    paths: {
      vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs'
    }
  });

  return loader.init();

}

export const createAndBindEditor = async (
  monaco: Monaco,
  textModel: editor.ITextModel
) => {

  const container = document.getElementById("code-editor");

  if (!container) {
    console.warn("code-editor node not found");
    return;
  }

  const editor =
    monaco.editor.create(container, {
      model: textModel,
      contextmenu: false,
      minimap: {
        enabled: false,
      }
    });

  return editor;

}
