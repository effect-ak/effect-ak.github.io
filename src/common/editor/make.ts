import { type PackageExports, setupDts } from "./setup";
import { createAndBindEditor, initMonaco } from "./init";
import { hasMajorError, makeJsonTextModel, makeTsTextModel } from "./text-model";

export const makeTsEditor = async (packageExports: PackageExports) => {

  const monaco = await initMonaco()
  if (!monaco) return

  await setupDts(monaco, packageExports)

  const tsTextModel = await makeTsTextModel(monaco)

  let editorInstance: ReturnType<typeof createAndBindEditor>

  return {
    tsTextModel,
    bindEditor() {
      if (editorInstance) {
        console.log('already mounted')
      }
      editorInstance = createAndBindEditor(monaco, tsTextModel.tsModel)
      return editorInstance
    },
    onCodeChange(
      f: () => void
    ) {
      let timeoutId: number | undefined;
      const debounceDelay = 1000;

      return tsTextModel.tsModel.onDidChangeContent(() => {
        if (timeoutId !== undefined) {
          clearTimeout(timeoutId);
        }

        timeoutId = window.setTimeout(() => {
          const hasError = hasMajorError(monaco, tsTextModel.tsModel, new Set([ 8 ]));
          if (!hasError) f();
        }, debounceDelay);
      });
    }
  } as const;

}

export const makeJsonEditor = async () => {

  const monaco = await initMonaco();

  if (!monaco) return;

  const model = await makeJsonTextModel(monaco);

  const editor =
    await createAndBindEditor(monaco, model.model);

  if (!editor) return;

  return {
    editor,
    monaco,
    textModel: model
  } as const;

}