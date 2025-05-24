import type { Monaco } from "@monaco-editor/loader";
import { fetchText } from "#/common/utils";

export type PackageExports = {
  entryName?: string
  dts_url: string
  js_url?: string
  packageName?: string
}[]

export const setupDts = async (
  monaco: Monaco,
  packageExports: PackageExports
) => {

  monaco.languages.typescript.typescriptDefaults.setExtraLibs([]);

  packageExports.forEach(async ({ dts_url, packageName, entryName }) => {
    const content = await fetchText(dts_url);
    monaco.languages.typescript.typescriptDefaults.addExtraLib(content, (packageName && entryName) ? `node_modules/${packageName}/${entryName}.d.ts` : undefined);
  });

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    typeRoots: [
      "node_modules"
    ],
    strict: true
  });

}
