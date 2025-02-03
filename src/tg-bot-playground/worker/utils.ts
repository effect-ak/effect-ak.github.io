import { CDN_PACKAGE_MAIN } from "../const";

const imports = {
  "@effect-ak/tg-bot-client": CDN_PACKAGE_MAIN
}

export const replaceImports =
  (code: string) => {
    let prepared = code;

    for (const [name, cdn] of Object.entries(imports)) {
      const fullCdn = `https://cdn.jsdelivr.net/npm/${cdn}`;
      prepared = prepared.replaceAll(name, fullCdn);
    }

    return prepared;
  }

export function loadJsModule(code: string): Promise<any> {
  const prepared = replaceImports(code);
  console.log("loading js code", {
    code, prepared
  })
  const blob = new Blob([ prepared ], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);

  return import(/* @vite-ignore */url).finally(() => URL.revokeObjectURL(url))
}