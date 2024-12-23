import { fetchText, getMonacoLoader } from "#tg-bot-playground/utils.js";
import { setupDts } from "./setup.js";
import { initEditor } from "./init.js";
import type { GlobalState } from "#tg-bot-playground/main.js";

export const makeEditor = async (
  state: GlobalState
) => {

  const loader = getMonacoLoader();

  if (!loader) return;

  const editor = await initEditor(loader);

  if (!editor) return;

  await setupDts(editor.monaco);

  return {
    tsTextModel: editor.tsTextModel,
    loadExample: () => {
      if (!state.selectedExample) return;
      fetchText(`./example/${state.selectedExample}`)
        .then(_ => editor.tsTextModel.tsModel.setValue(_))
    },
    onCodeChange: (
      f: () => void
    ) => {
      let timeoutId: number | undefined;
      const debounceDelay = 1000;

      editor.tsTextModel.tsModel.onDidChangeContent(() => {
        if (timeoutId !== undefined) {
          clearTimeout(timeoutId);
        }

        timeoutId = window.setTimeout(() => {
            const markers = editor.monaco.editor.getModelMarkers({ 
              resource: editor.tsTextModel.tsModel.uri 
            });
            const hasError = markers.find(_ => _.severity.valueOf() == 8) != null;
            if (!hasError) { f() } else {
              console.debug("Code contains errors")
            }
        }, debounceDelay);
      });
    }
  } as const;

}
