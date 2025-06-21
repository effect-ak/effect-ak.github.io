import { ResumeObject } from "~/cv/core/schema"
import { Effect, Schema as S } from "effect"
import { fetchText, parseJson } from "~/common/utils"
import { EditorModel } from "~/common/monaco/model";

export class StoreProvider
  extends Effect.Service<StoreProvider>()("StoreProvider", {
    effect:
      Effect.gen(function* () {
        return {
          loadStoredResume,
          exampleResume: yield* getExampleResume()
        } as const
      }),
    dependencies: []
  }) { }

const loadStoredResume =
  Effect.fn("load stored resume")(function* () {
    const all: { id: string, name: string }[] = [];

    if (Object.keys(window.localStorage).length == 0) {
      const resume = yield* getExampleResume()
      if (resume) {
        localStorage.setItem("example", JSON.stringify(resume, undefined, 2))
      }
    }

    for (const key of Object.keys(localStorage)) {
      const value = localStorage.getItem(key)
      if (!value) continue
      all.push({
        id: key,
        name: key
      })
    }

    return all
  })

const getExampleResume =
  Effect.fn("get example resume")(function* () {
    const resume =
      yield* fetchText("/resume/john-doe.jsonc").pipe(
        Effect.andThen(raw => parseJson(raw))
      )

    if (!resume || typeof resume != 'object') return

    if ("$schema" in resume) {
      delete resume["$schema"]
    }

    const input = yield* S.decodeUnknown(ResumeObject)(resume)
    return input
  })

const saveCurrentResume =
  Effect.fn('save resume')(function* () {
    const { getCode, model } = yield* EditorModel
    const parsed = yield* getCode()
    localStorage.setItem("", model.getValue());
  })
