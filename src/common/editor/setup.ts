import type { Monaco } from "@monaco-editor/loader";
import { fetchText } from "#/common/utils";

export type PackageExports = {
  entryName: string
  dts_url: string
  js_url?: string
  packageName: string
}[]

export const setupDts = async (
  monaco: Monaco,
  packageExports: PackageExports
) => {

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    typeRoots: [
      "node_modules"
    ],
    strict: true,
    skipLibCheck: true,
  });

  for (const { dts_url, entryName, packageName } of packageExports) {
    const content = await fetchText(dts_url);
    const filePath = `node_modules/${packageName}/${entryName}.d.ts`;

    monaco.languages.typescript.typescriptDefaults.addExtraLib(content, filePath);
  }

  const compilerOptions = monaco.languages.typescript.typescriptDefaults.getCompilerOptions();

  console.log({ compilerOptions });

}
