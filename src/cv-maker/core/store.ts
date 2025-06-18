import { ResumeObject } from "~/cv/core/schema"
import { Effect, Schema as S } from "effect"
import { fetchText, parseJSON } from "~/common/utils"
import type { AppState } from "./state";

export class StoreProvider
  extends Effect.Service<StoreProvider>()("StoreProvider", {
    effect:
      Effect.succeed({}),
    dependencies: []
  }) { }

async function loadStoredResume() {

  const all: AppState['availableResumes'] = [];

  if (Object.keys(localStorage).length == 0) {
    const resume = await getExampleResume()
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

}

async function getExampleResume() {
  const resume = await fetchText("./john-doe.jsonc").then(_ => parseJSON(_, true))

  if (resume == null || typeof resume != "object") return

  if ("$schema" in resume) {
    delete resume["$schema"]
  }

  const input = S.decodeUnknownSync(ResumeObject)(resume)
  return input
}

// function saveResume() {
//   const parsed = parseJSON(editor.textModel.model.getValue(), true);
//   if (!parsed) {
//     console.log("invalid json"); return;
//   };
//   if (state.editorSection == "all") {
//     state.resumeObject = parsed;
//   } else {
//     state.resumeObject[state.editorSection] = parsed;
//   }
//   localStorage.setItem(state.currentResume, JSON.stringify(state.resumeObject));
//   state.resumeHtml = resumeObjectToHTML(state.resumeObject);
// }