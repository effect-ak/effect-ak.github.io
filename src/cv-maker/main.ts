import Alpine from "alpinejs";
import { getResumeObject, parseJSON, resumeObjectToHTML } from "./core/utils";
import type resumeSchema from "./static/resume-schema.json"
import { makeJsonEditor } from "#/common/editor/make";
import { hasMajorError } from "#/common/editor/text-model";

declare global {
  interface Window {
    Alpine: typeof Alpine;
  }
}

window.Alpine = Alpine;

setup();

Alpine.data("sections", () => ({
  sections: [{
    id: "all",
    label: "All",
  }, {
    id: "me",
    label: "Me",
  }, {
    id: "employmentHistory",
    label: "My Employment",
  }, {
    id: "technologies",
    label: "Tecnologies"
  }]
}));

Alpine.start();

async function setup() {

  const state: {
    resumeObject: any
    resumeHtml: string
    editorSection: Exclude<keyof typeof resumeSchema.$defs.ResumeObject.properties | "all", "$schema">
    mode: string
    editorHasError: boolean
  } =
    Alpine.reactive({
      resumeObject: {},
      resumeHtml: "<h1>My Resume</h1>",
      editorSection: "me",
      mode: "editor",
      editorHasError: false
    });

  Alpine.store("state", state);

  const editor = await makeJsonEditor();

  const resumeSchemaObject = await fetch("./resume-schema.json").then(_ => _.json());
  
  if (!editor) {
    console.warn("can not load editor");
    return;
  };

  const setupJsonSchema =
    (ref: string) =>
      editor.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
          {
            uri: "resume.json",
            fileMatch: ["*"],
            schema: {
              ...resumeSchemaObject,
              $ref: ref
            }
          }
        ]
      })

  const prepareEditor = () => {
    if (state.editorSection == "all") {
      delete state.resumeObject.$schema
      editor.textModel.model.setValue(JSON.stringify(state.resumeObject, undefined, 2));
      setupJsonSchema("#/$defs/ResumeObject");
    } else {
      editor.textModel.model.setValue(JSON.stringify(state.resumeObject[state.editorSection], undefined, 2))
      setupJsonSchema(`#/$defs/ResumeObject/properties/${state.editorSection}`);
    }
  }

  editor.textModel.model.onDidChangeContent(() => {
    const parsed = parseJSON(editor.textModel.model.getValue());
    console.log("parsed", parsed);
    if (!parsed) return;
    if (state.editorSection == "all") {
      state.resumeObject = parsed;
    } else {
      state.resumeObject[state.editorSection] = parsed;
    }
    state.resumeHtml = resumeObjectToHTML(state.resumeObject);
  })

  document.addEventListener("section-changed", () => {
    prepareEditor();
  });

  const resume = await getResumeObject();

  editor.monaco.editor.onDidChangeMarkers(() => {
    const hasErrors = hasMajorError(editor.monaco, editor.textModel.model, new Set([4, 8]));
    console.log("markers changed", { hasErrors });
    state.editorHasError = hasErrors;
    if (!hasErrors) {
      state.resumeHtml = resumeObjectToHTML(state.resumeObject);
    }
  })

  state.resumeObject = resume;
  state.resumeHtml = resumeObjectToHTML(resume);

  prepareEditor();

}
