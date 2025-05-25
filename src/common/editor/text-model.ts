import { Monaco } from "#/common/types";
import { fetchText } from "#/common/utils";
import { editor, languages, Uri } from "monaco-editor";

export type TsTextModel = Awaited<ReturnType<typeof makeTsTextModel>>

export const makeTsTextModel =
  async (monaco: Monaco) => {

    console.log('make model')
    const emptyExample = await fetchText("./example/empty.ts");

    const tsModel =
      monaco.editor.createModel(emptyExample, "typescript");

    console.log("created model", tsModel.uri)

    let tsWorkerFactory: (uri: Uri) => Promise<languages.typescript.TypeScriptWorker>;

    const getTsCode = async () => {
      if (!tsWorkerFactory) {
        tsWorkerFactory = await monaco.languages.typescript.getTypeScriptWorker();
      }
      const worker = await tsWorkerFactory(tsModel.uri);
      return worker.getEmitOutput(tsModel.uri.toString());
    }

    return {
      tsModel,
      getJsCode: async () => {
        console.log('get js code')
        const output = await getTsCode();
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
