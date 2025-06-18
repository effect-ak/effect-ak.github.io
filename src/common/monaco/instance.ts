import { Context, Effect } from "effect"
import { fetchText } from "../utils"

export type Monaco = typeof import("monaco-editor");

export class MonacoInstanceProvider
  extends Effect.Service<MonacoInstanceProvider>()("MonacoInstanceProvider", {
    effect:
      Effect.gen(function* () {

        const { default: loader } =
          yield* Effect.tryPromise(
            () => import('@monaco-editor/loader')
          )

        loader.config({
          paths: {
            vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs'
          }
        })

        const monaco = yield* Effect.tryPromise(() => loader.init());

        yield* setupTypescriptOptions(monaco)

        return monaco

      })
  }) { }

export type PackageExports = Context.Tag.Service<TypescriptSettings>['packages']
export class TypescriptSettings
  extends Context.Tag("TypescriptSettings")<TypescriptSettings, {
    packages: {
      entryName: string
      dts_url: string
      js_url?: string
      packageName: string
    }[]
  }>() { }

const setupTypescriptOptions =
  Effect.fn('setup TypeScript options')(function* (
    monaco: Monaco,
  ) {
    const ts = yield* Effect.serviceOption(TypescriptSettings)
    if (ts._tag == "None") {
      return yield* Effect.logInfo("TypeScript configuration not provided")
    }
    yield* Effect.logInfo("setup TypeScript")
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      typeRoots: [
        "node_modules"
      ],
      strict: true,
      skipLibCheck: true,
    });

    for (const { dts_url, entryName, packageName } of ts.value.packages) {
      const content = yield* Effect.tryPromise(() => fetchText(dts_url));
      const filePath = `node_modules/${packageName}/${entryName}.d.ts`;

      monaco.languages.typescript.typescriptDefaults.addExtraLib(content, filePath);
    }

  })
