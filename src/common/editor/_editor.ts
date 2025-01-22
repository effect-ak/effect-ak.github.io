import { getMonacoLoader } from "#/common/utils";
import { setupDts } from "./setup";
import { initEditor } from "./init";

export const makeEditor = async () => {

  const loader = getMonacoLoader();

  if (!loader) return;

  const editor = await initEditor(loader);

  if (!editor) return;

  await setupDts(editor.monaco);

  return {
    tsTextModel: editor.tsTextModel,
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
