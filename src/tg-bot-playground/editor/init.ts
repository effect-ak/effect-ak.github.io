import type { MonacoLoader } from "#tg-bot-playground/types.js";
import { makeTsTextModel } from "./ts-text-model.js";

export const initEditor = async (
  loader: MonacoLoader
) => {

  const container = document.getElementById('container');

  if (!container) {
    console.warn("container not found");
    return;
  }

  loader.config({
    paths: {
      vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs'
    }
  });

  const monaco = await loader.init();

  const tsTextModel = await makeTsTextModel(monaco);

  const editor =
    monaco.editor.create(container, {
      model: tsTextModel.tsModel,
      contextmenu: false,
      minimap: {
        enabled: false
      },
    });

  return {
    tsTextModel, editor, monaco
  } as const;

}
