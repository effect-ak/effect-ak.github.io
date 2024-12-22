import type { BotState } from "./types.js";
import { fetchText, getJsCode, setupDts } from "./utils.js";

console.log("loading main");

window.playground.start = () => {

  const container = document.getElementById('container');

  if (!container) {
    return console.error("container not found");
  }

  window.monaco_loader.config({
    paths: {
      vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs'
    }
  });

  return Promise.all([
    window.monaco_loader.init(),
    fetchText("./example/empty.ts")
  ]).then(([monaco, emptyExample]) => {

    window.playground.tsModel =
      monaco.editor.createModel(emptyExample, 'typescript');

    setupDts(monaco);

    window.playground.editor =
      monaco.editor.create(container, {
        model: window.playground.tsModel,
        contextmenu: false,
        minimap: {
          enabled: false
        },
      });

  }).catch(error => console.warn("init error", error));

}

window.playground.loadExample =
  (name) => {
    if (!name) return;
    fetchText(`./example/${name}`)
      .then(_ => window.playground.editor?.setValue(_))
      .catch(error => {
        console.error("Cannot load example", error)
      })
  }

window.playground.runBot =
  (state: BotState) => {

    const token = state.token;

    if (!token) return;

    getJsCode().then(code => {

      if (!code) {
        console.warn("Js Code not defined");
        return;
      }

      window.playground.worker?.postMessage({
        command: 'run-bot',
        token,
        code
      });

      state.status = "active"
    }).catch(error => {
      console.warn("cannot run bot", error)
    })

  }

window.playground.checkToken =
  (state: BotState) => {

    const token = state.token;

    if (!token) return;

    fetch(`https://api.telegram.org/bot${token}/getMe`)
      .then(_ => _.json())
      .then(info => {
        if (info.ok) {
          state.name = info.result.first_name;
          if (window.playground.runBot) {
            console.log("Running bot")
            window.playground.runBot(state);
          }
        } else {
          state.name = "nameless";
        }
      }).catch(error => {
        console.warn("check token error", error)
      });

  }

window.playground.onCodeChange =
  (f) => {
    let timeoutId: number | undefined;
    const debounceDelay = 1000;

    const editor = window.playground.editor;

    if (!editor) {
      console.warn("Cannot attach onDidChangeModel");
      return;
    }

    editor.onDidChangeModelContent(() => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }

      timeoutId = window.setTimeout(() => {
        const model = window.playground.tsModel;
        if (model) {
          const markers = window.monaco.editor.getModelMarkers({ resource: model.uri });
          if (!markers.find(_ => _.severity.valueOf() == 8)) { f() }
        }
      }, debounceDelay);
    });
  }
