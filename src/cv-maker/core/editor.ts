import { Effect } from "effect"
import { EditorProvider } from "~/common/monaco/editor"
import { MonacoInstanceProvider } from "~/common/monaco/instance"
import { EditorModel } from "~/common/monaco/model"

export class ResumeEditorProvider
  extends Effect.Service<ResumeEditorProvider>()("ResumeEditorProvider", {
    effect:
      Effect.gen(function* () {

        const editor = yield* EditorProvider
        const model = yield* EditorModel

        yield* Effect.logInfo("ResumeEditorProvider")

        const monaco = yield* MonacoInstanceProvider
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
          validate: true,
          allowComments: true,
          trailingCommas: "ignore"
        })

        return {
          model,
          bindEditor: editor.bindEditor,
        } as const

      }),
    dependencies: [
      MonacoInstanceProvider.Default
    ]
  }) { }
