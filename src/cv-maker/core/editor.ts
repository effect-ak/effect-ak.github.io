import { Effect, Layer } from "effect"
import { EditorProvider } from "~/common/monaco/editor"
import { MonacoInstanceProvider } from "~/common/monaco/instance"
import { EditorModel } from "~/common/monaco/model"
import RESUME_SCHEMA from "~/cv/resume-schema.json"

export class ResumeEditorProvider
  extends Effect.Service<ResumeEditorProvider>()("ResumeEditorProvider", {
    effect:
      Effect.gen(function* () {

        const editor = yield* EditorProvider
        const model = yield* EditorModel

        const monaco = yield* MonacoInstanceProvider
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
          validate: true,
          allowComments: true,
          trailingCommas: "ignore"
        })

        const changeResumeSection = () => {

        }

        return {
          getCode: model.getCode,
          bindEditor: editor.bindEditor,
          changeResumeSection
        } as const

      }),
    dependencies: [
      EditorProvider.Default.pipe(
        Layer.provideMerge(EditorModel.json)
      ),
      MonacoInstanceProvider.Default
    ]
  }) { }

function setupJsonSchema(ref: string) {
  return Effect.gen(function* () {
    const monaco = yield* MonacoInstanceProvider
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: true,
      trailingCommas: "ignore",
      schemas: [
        {
          uri: "resume.json",
          fileMatch: ["*"],
          schema: {
            ...RESUME_SCHEMA,
            $ref: ref
          }
        }
      ]
    })
  })

}

// function prepareEditor() {
//   if (state.editorSection == "all") {
//     delete state.resumeObject.$schema
//     editor.textModel.model.setValue(JSON.stringify(state.resumeObject, undefined, 2));
//     setupJsonSchema("#/$defs/ResumeObject");
//   } else {
//     const section = state.resumeObject[state.editorSection] ?? {};
//     editor.textModel.model.setValue(JSON.stringify(section, undefined, 2))
//     setupJsonSchema(`#/$defs/ResumeObject/properties/${state.editorSection}`);
//   }
//   editor.editor.setScrollTop(0);
//   editor.editor.setScrollLeft(0);
//   if (state.editorSection == "all") {
//     editor.editor.updateOptions({
//       minimap: {
//         enabled: true,
//       }
//     })
//   } else {
//     editor.editor.updateOptions({
//       minimap: {
//         enabled: false
//       }
//     })
//   }
// }
