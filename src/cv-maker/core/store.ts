import { ResumeObject } from "~/cv/core/schema"
import { Effect, Schema as S } from "effect"
import { fetchText, getUrlParam, parseJson } from "~/common/utils"
import { EditorModel } from "~/common/monaco/model"

export class StoreProvider
  extends Effect.Service<StoreProvider>()("StoreProvider", {
    effect:
      Effect.gen(function* () {

        const exampleResume = yield* loadExampleResume()
        const availableResumes = yield* getAvailableResume()
        const currentResumeName = getUrlParam('resume') ?? 'example'
        const editorModel = yield* EditorModel

        const selectResume = (name: string) => {
          const resume = window.localStorage.getItem(name)
          if (!resume) return
          editorModel.model.setValue(resume)
        }

        const duplicateResume = (name: string) => {
          const result = editorModel.model.getValue()
          localStorage.setItem(name, result)
          availableResumes.push({ id: name, name });
        }

        const saveCurrentResume = () => {
          const result = editorModel.model.getValue()
          localStorage.setItem(currentResumeName, result)
        }

        return {
          availableResumes,
          exampleResume,
          currentResumeName,
          selectResume,
          saveCurrentResume,
          duplicateResume
        } as const
      }),
    dependencies: []
  }) { }

const getAvailableResume =
  Effect.fn("get available resume")(function* () {
    const all: { id: string, name: string }[] = [];

    if (Object.keys(window.localStorage).length == 0) {
      const resume = yield* loadExampleResume()
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

const loadExampleResume =
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
