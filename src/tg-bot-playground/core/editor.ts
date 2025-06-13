import { Effect } from "effect"
import { makeTsEditor } from "#/common/editor/make";
import { CDN_PACKAGE_EXPORTS } from "../const";
import { fetchText } from "#/common/utils";
import { BotStateProvider } from "./bot/state";
import { PlaygroundBusProvider } from "./bus";

export class EditorProvider
  extends Effect.Service<EditorProvider>()("EditorProvider", {
    scoped:
      Effect.gen(function* (_) {

        const editor = yield* _(
          Effect.tryPromise(() => makeTsEditor(CDN_PACKAGE_EXPORTS)),
          Effect.filterOrFail(_ => _ != null)
        )

        const emptyExample = yield* Effect.tryPromise(() => fetchText("./example/empty.ts"))
        const eventBus = yield* PlaygroundBusProvider
        const botState = yield* BotStateProvider

        editor.tsTextModel.tsModel.setValue(emptyExample)
        botState.currentCode = emptyExample

        const onCodeChange =
          editor.onCodeChange(async () => {
            botState.currentCode = emptyExample
          })

        const changeExample = async (exampleName: string) => {
          console.log('setting code')
          const code = await fetchText(`./example/${exampleName}`)
          editor.tsTextModel.tsModel.setValue(code)
          botState.currentCode = emptyExample
        }

        yield* Effect.addFinalizer((exit) => {
          console.log('editor finalizer', exit)
          onCodeChange.dispose()
          return Effect.void
        })

        return {
          getJsCode: editor.tsTextModel.getJsCode,
          bindEditor: editor.bindEditor,
          changeExample
        } as const

      }),
      dependencies: [
        PlaygroundBusProvider.Default,
      ]
  }) { }