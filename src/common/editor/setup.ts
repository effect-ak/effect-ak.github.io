import type { Monaco } from "@monaco-editor/loader";
import { fetchText } from "#/common/utils";
import { CDN_PACKAGE_DTS } from "#/tg-bot-playground/const";

export const setupDts = async (
  monaco: Monaco
) => {

  const dts = await fetchText(`https://cdn.jsdelivr.net/npm/${CDN_PACKAGE_DTS}`);

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
