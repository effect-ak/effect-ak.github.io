import { Effect, Layer } from "effect"
import { fetchText } from "~/common/utils"
import { BotStateProvider } from "./bot/state"
import { EditorProvider } from "~/common/monaco/editor"
import { EditorModel } from "~/common/monaco/model"
import { TypescriptSettings } from "~/common/monaco/instance"
import { CDN_PACKAGE_EXPORTS } from "~/tg/const"

export class TgBotEditorProvider
  extends Effect.Service<TgBotEditorProvider>()("TgBotEditorProvider", {
    scoped:
      Effect.gen(function* (_) {

        const editor = yield* EditorProvider
        const model = yield* EditorModel

        const emptyExample = yield* fetchText("/bots/empty.ts")
        const botState = yield* BotStateProvider

        model.model.setValue(emptyExample)
        botState.currentCode = emptyExample

        const changeExample = async (exampleName: string) => {
          console.log('setting code')
          const code = await fetchText(`/bots/${exampleName}`).pipe(Effect.runPromise)
          model.model.setValue(code)
          botState.currentCode = emptyExample
        }

        yield* Effect.addFinalizer((exit) => {
          console.log('editor finalizer', exit)
          return Effect.void
        })

        return {
          getCode: model.getCode,
          bindEditor: editor.bindEditor,
          changeExample,
        } as const

      }),
      dependencies: [
        EditorProvider.Default.pipe(
          Layer.provideMerge(EditorModel.typescript),
          Layer.provide(Layer.succeed(TypescriptSettings, { packages: CDN_PACKAGE_EXPORTS })),
        )
      ]
  }) { }
