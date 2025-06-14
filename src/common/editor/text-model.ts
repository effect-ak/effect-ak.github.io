import type { Monaco } from "#/common/types";
import type { editor, languages } from "monaco-editor";

export type TsTextModel = Awaited<ReturnType<typeof makeTsTextModel>>

export const makeTsTextModel =
  (monaco: Monaco) => {

    const tsModel =
      monaco.editor.createModel('', "typescript")

    console.log("created model", tsModel.uri)
    let tsWorker: languages.typescript.TypeScriptWorker 

    const getTsCode = async () => {
      if (!tsWorker) {
        const getWorker = await monaco.languages.typescript.getTypeScriptWorker();
        tsWorker = await getWorker(tsModel.uri)
      }
      const code = await tsWorker.getEmitOutput(tsModel.uri.toString());
      return code
    }

    return {
      tsModel,
      getJsCode: async () => {
        console.log('get js code')
        const output = await getTsCode()
        if (hasMajorError(monaco, tsModel, new Set([ 8 ]))) {
          console.warn('code error')
          return
        }
        const code = output.outputFiles[0].text;
        return code;
      }
    } as const

  }

export const makeJsonTextModel = async (
  monaco: Monaco,
) => {

    const model =
      monaco.editor.createModel('{}', 'json');

    console.log('created json model', model.uri)

    return {
      model
    } as const

  }

export const hasMajorError = (
  monaco: Monaco,
  textModel: editor.ITextModel,
  majorCodes: Set<number>
) => {
  const markers = 
    monaco.editor.getModelMarkers({ 
      resource: textModel.uri 
    });
  const error = markers.find(_ => majorCodes.has(_.severity.valueOf()));
  if (error) {
    console.log("editor code error", error);
    return true;
  }
  return false;
}
