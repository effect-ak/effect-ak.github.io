import Alpine from "alpinejs";
import { debounce, getResumeObject, parseJSON, resumeObjectToHTML } from "./core/utils";
import type resumeSchema from "./static/resume-schema.json"
import { makeJsonEditor } from "#/common/editor/make";
import { hasMajorError } from "#/common/editor/text-model";
import * as resumeSchemaObject from "./static/resume-schema.json";

declare global {
  interface Window {
    Alpine: typeof Alpine;
  }
}

window.Alpine = Alpine;

setup();

Alpine.store("modes", () => [
  {
    id: "editor",
    label: "Editor"
  },
  {
    id: "view",
    label: "View"
  }
])

Alpine.store("sections", () => [{
  id: "all",
  label: "All together",
}, {
  id: "me",
  label: "Me",
}, {
  id: "employmentHistory",
  label: "My Employment",
}, {
  id: "technologies",
  label: "Tecnologies"
}]);

const state: {
  resumeObject: any
  resumeHtml: string
  editorSection: Exclude<keyof typeof resumeSchema.$defs.ResumeObject.properties | "all", "$schema">
  mode: string
  editorHasError: boolean
  availableResumes: { id: string, name: string }[]
  currentResume: string
} =
  Alpine.reactive({
    resumeObject: {},
    resumeHtml: "<h1>My Resume</h1>",
    editorSection: "me",
    mode: "view",
    editorHasError: false,
    availableResumes: [],
    currentResume: "example"
  });

Alpine.data("state", () => state);

Alpine.start();

async function loadStoredResume() {

  state.availableResumes = [];

  if (Object.keys(localStorage).length == 0) {
    const resume = await getResumeObject();
    localStorage.setItem("example", JSON.stringify(resume));
  }

  for (const key of Object.keys(localStorage)) {
    const value = localStorage.getItem(key);
    if (!value) continue;
    state.availableResumes.push({
      id: key,
      name: key
    });
  };
  
}

function selectResume() {
  const resumeJson = localStorage.getItem(state.currentResume);
  if (!resumeJson) {
    console.warn("No resume to load");
    return;
  };
  const resume = parseJSON(resumeJson);
  if (!resume) {
    console.warn("Invalid json of resume");
    return;
  };
  state.resumeObject = resume;
  state.resumeHtml = resumeObjectToHTML(resume);
}

async function setup() {

  const editor = await makeJsonEditor();

  await loadStoredResume();

  if (!editor) {
    console.warn("can not load editor");
    return;
  };

  selectResume();

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

  const saveResume = () => {
    const parsed = parseJSON(editor.textModel.model.getValue());
    if (!parsed) return;
    if (state.editorSection == "all") {
      state.resumeObject = parsed;
    } else {
      state.resumeObject[state.editorSection] = parsed;
    }
    localStorage.setItem(state.currentResume, JSON.stringify(state.resumeObject));
    state.resumeHtml = resumeObjectToHTML(state.resumeObject);
  };

  editor.textModel.model.onDidChangeContent(debounce(saveResume, 300));

  document.addEventListener("section-changed", () => {
    prepareEditor();
    editor.editor.setScrollTop(0);
    editor.editor.setScrollLeft(0);
    if (state.editorSection == "all") {
      editor.editor.updateOptions({
        minimap: {
          enabled: true,
        }
      })
    } else {
      editor.editor.updateOptions({
        minimap: {
          enabled: false
        }
      })
    }
  });

  window.addEventListener('init-resume', () => {
    selectResume();
    prepareEditor();
  });

  window.addEventListener('save', () => {
    const name = window.prompt("Enter name of your resume", "simple");
    if (!name) return;
    localStorage.setItem(name, JSON.stringify(state.resumeObject));
    state.availableResumes.push({ id: name, name });
  });

  window.addEventListener('resize', () => {
    editor.editor.layout();
  });

  document.addEventListener("mode-was-changed", () => {
    Alpine.nextTick(() => {
      editor.editor.layout();
    });
  });

  editor.monaco.editor.onDidChangeMarkers(() => {
    const hasErrors = hasMajorError(editor.monaco, editor.textModel.model, new Set([4, 8]));
    console.log("markers changed", { hasErrors });
    state.editorHasError = hasErrors;
    if (!hasErrors) {
      state.resumeHtml = resumeObjectToHTML(state.resumeObject);
    }
  });

  prepareEditor();

}
