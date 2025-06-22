import { Context, Effect } from "effect";
import { editor } from "monaco-editor";
import { MonacoInstanceProvider } from "./instance";
import { EditorModel } from "./model";

export class EditorDefaults extends Context.Reference<EditorDefaults>()(
  "EditorDefaults",
  {
    defaultValue() {
      return {
        container: "code-editor",
        options: {
          contextmenu: false,
          minimap: {
            enabled: false,
          },
          automaticLayout: true,
        },
        model: {},
      } as {
        container: string;
        options: editor.IStandaloneDiffEditorConstructionOptions;
      };
    },
  }
) { }

export class EditorProvider extends Effect.Service<EditorProvider>()(
  "EditorProvider",
  {
    scoped: Effect.gen(function* () {
      const monaco = yield* MonacoInstanceProvider
      const defaults = yield* EditorDefaults
      const { model, majorCodes } = yield* EditorModel

      let editorInstance: editor.IStandaloneCodeEditor | undefined

      yield* Effect.addFinalizer(() => {
        console.log("effect editor dispose")
        editorInstance?.dispose()
        return Effect.void
      })

      const bindEditor = () => {
        if (editorInstance) {
          console.log('editor is already bound')
          return editorInstance;
        }

        const container = document.getElementById(defaults.container);

        if (!container) {
          throw Error(`HTML container for monaco editor not found, expected '${defaults.container}'`)
        }

        editorInstance = monaco.editor.create(container, {
          model,
          ...defaults.options,
        })

        editorInstance.onDidDispose(() => {
          console.log('unmounting cleanup')
          editorInstance = undefined
        })

        return editorInstance
      }

      const hasMajorError = () => {
        const markers =
          monaco.editor.getModelMarkers({
            resource: model.uri
          })
        const error = markers.find(_ => majorCodes.has(_.severity.valueOf()));
        if (error) {
          console.log("editor code error", error);
          return true;
        }
        return false;
      }

      return {
        bindEditor,
        hasMajorError
      } as const
    }),
    dependencies: [
      MonacoInstanceProvider.Default
    ]
  }
) { }
