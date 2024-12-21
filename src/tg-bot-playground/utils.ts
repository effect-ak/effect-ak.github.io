export async function getDefaultExport<D>(code: string) {
  try {
    const encodedCode = encodeURIComponent(code);
    const module = await import(`data:text/javascript,${encodedCode}`);
    const result = module.default;
    return { default: result as D };
  } catch (e) {
    console.warn("get default error", e);
    return undefined;
  }

}

export const getJsCode = async () => {

  const tsModelUri = window.playground.tsModel?.uri;

  if (!tsModelUri) {
    console.warn("tsModel uri not defined")
    return;
  }

  const worker = await window.monaco.languages.typescript.getTypeScriptWorker();

  const modelWorker = await worker(tsModelUri);

  const output = await modelWorker.getEmitOutput(tsModelUri.toString());
  const code = output.outputFiles[0].text;
  const result = await getDefaultExport(code);

  return serialize(result?.default);

}

export const fetchText = (path: string) =>
  fetch(path).then(_ => _.text())

export const setupDts = async (
  monaco: import("@monaco-editor/loader").Monaco
) => {

  const dts = await fetchText("declarations.d.ts");

  monaco.languages.typescript.typescriptDefaults.setExtraLibs([
    {
      content: dts,
      filePath: "node_modules/@effect-ak/tg-bot-client/index.d.ts",
    }
  ]);

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    typeRoots: [
      "node_modules"
    ],
    strict: true
  });

}

export const serialize = (input: unknown) => {
  if (typeof input != "object" || !input) {
    return undefined;
  }
  const result = [] as [string, string][];

  for (const [key, value] of Object.entries(input)) {
    if (typeof value != "function") {
      continue;
    }
    result.push([ key, value.toString() ])
  }

  return JSON.stringify(Object.fromEntries(result));
}

const parseJson = (input: string) => {
  try {
    return { parsed: JSON.parse(input) }
  } catch { return undefined }
}

export const deserialize = (input: string) => {

  const result = [] as [string, unknown][];

  const fields = parseJson(input);

  if (typeof fields?.parsed != "object") return undefined;

  for (const [k, v] of Object.entries(fields.parsed)) {
    try {
      const f = new Function(`return ${v}`)();
      result.push([k, f]);
    } catch (e) {
      console.warn("deserialize field error", { k, v, e });
    }

  }

  return Object.fromEntries(result);
}