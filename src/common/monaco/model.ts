import { Cause, Context, Effect, Layer } from "effect"
import type { editor, languages } from "monaco-editor"

import { MonacoInstanceProvider } from "./instance"
import { parseJson } from "../utils"

export class EditorModel
  extends Context.Tag("EditorModel")<EditorModel, {
    language: "typescript" | "json"
    model: editor.ITextModel
    majorCodes: Set<number>
    getCode: () => Effect.Effect<string, Cause.UnknownException | Cause.NoSuchElementException>
  }>() {

  static typescript =
    Layer.effect(
      EditorModel,
      Effect.gen(function* () {
        const monaco = yield* MonacoInstanceProvider

        const model =
          monaco.editor.createModel("", "typescript")

        yield* Effect.logInfo("created typescript model", model.uri)

        let tsWorker: languages.typescript.TypeScriptWorker

        const getEmittedCode = async () => {
          if (!tsWorker) {
            const getWorker = await monaco.languages.typescript.getTypeScriptWorker();
            tsWorker = await getWorker(model.uri)
          }
          const code = await tsWorker.getEmitOutput(model.uri.toString());
          return code
        }

        return {
          language: "typescript",
          model,
          majorCodes: new Set([ 8 ]),
          getCode() {
            return Effect.tryPromise(() => getEmittedCode()).pipe(
              Effect.andThen(output => Effect.fromNullable(output.outputFiles[0].text))
            )
          }
        } as const
      })
    ).pipe(
      Layer.provide(MonacoInstanceProvider.Default)
    )

  static json =
    Layer.effect(
      EditorModel,
      Effect.gen(function* () {
        const monaco = yield* MonacoInstanceProvider

        const model =
          monaco.editor.createModel('{}', 'json');

        yield* Effect.logInfo('created json model', model.uri)

        return {
          language: "json",
          model,
          majorCodes: new Set([ 4, 8 ]),
          getCode() {
            return parseJson(model.getValue()).pipe(
              Effect.andThen(JSON.stringify),
            )
          }
        } as const
      })
    ).pipe(
      Layer.provide(MonacoInstanceProvider.Default)
    )
}
