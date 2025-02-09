import { Monaco } from "#/common/types";
import { fetchText } from "#/common/utils";
import type { languages } from "monaco-editor";

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

// const serialize = (input: unknown) => {
//   if (typeof input != "object" || !input) {
//     return undefined;
//   }
//   const result = [] as [string, string][];

//   for (const [key, value] of Object.entries(input)) {
//     if (typeof value != "function") {
//       continue;
//     }
//     result.push([key, value.toString()])
//   }

//   return JSON.stringify(Object.fromEntries(result));
// }
