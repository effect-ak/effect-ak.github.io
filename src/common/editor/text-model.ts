import { Monaco } from "#/common/types";
import { fetchText } from "#/common/utils";
import { editor, languages } from "monaco-editor";

export type TsTextModel = Awaited<ReturnType<typeof makeTsTextModel>>

export const makeTsTextModel =
  async (monaco: Monaco) => {

    const emptyExample = await fetchText("./example/empty.ts");

    const tsModel =
      monaco.editor.createModel(emptyExample, 'typescript');

    let tsWorker: languages.typescript.TypeScriptWorker | null = null;

    const getTsCode = async () => {
      if (!tsWorker) {
        tsWorker = await monaco.languages.typescript.getTypeScriptWorker().then(_ => _(tsModel.uri));
      }
      return tsWorker!.getEmitOutput(tsModel.uri.toString());
    }

    return {
      tsModel,
      getJsCode: async () => {
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
      monaco.editor.createModel('', 'json');

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
