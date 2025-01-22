import { Monaco } from "#/common/types";
import { fetchText } from "#/common/utils";
import type { languages } from "monaco-editor";

export type TsTextModel = Awaited<ReturnType<typeof makeTsTextModel>>

export const makeTsTextModel =
  async (monaco: Monaco) => {

    const emptyExample = await fetchText("./example/empty.ts");

    const tsModel =
      monaco.editor.createModel(emptyExample, 'typescript');

    let cachedWorkerPromise: Promise<languages.typescript.TypeScriptWorker> | null = null;

    const getTsCode = async () => {
      if (!cachedWorkerPromise) {
        cachedWorkerPromise = (async () => {
          const tsWorker = await monaco.languages.typescript.getTypeScriptWorker();
          return tsWorker(tsModel.uri);
        })();
      }
      return cachedWorkerPromise.then(_ => _.getEmitOutput(tsModel.uri.toString()));
    }

    return {
      tsModel,
      getJsCode: async () => {
        const output = await getTsCode();
        const code = output.outputFiles[0].text;
        const defaultExport = await getDefaultExport(code);
        return {
          defaultExport,
          serialized: serialize(defaultExport?.default)
        } as const;
      }
    } as const

  }

async function getDefaultExport<D>(code: string) {
  try {
    const encodedCode = encodeURIComponent(code);
    const module = await import(/* @vite-ignore */`data:text/javascript,${encodedCode}`);
    const result = module.default;
    return { default: result as D };
  } catch (e) {
    console.warn("get default error", e);
    return undefined;
  }

}

const serialize = (input: unknown) => {
  if (typeof input != "object" || !input) {
    return undefined;
  }
  const result = [] as [string, string][];

  for (const [key, value] of Object.entries(input)) {
    if (typeof value != "function") {
      continue;
    }
    result.push([key, value.toString()])
  }

  return JSON.stringify(Object.fromEntries(result));
}
