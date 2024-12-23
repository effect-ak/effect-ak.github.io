// src/tg-bot-playground/bot-launcher/load.ts
async function loadWorker() {
  const version = await fetch("./metadata.json", { cache: "no-cache" }).then((_) => _.json()).then((_) => _["web-worker.js"]);
  if (!version) {
    console.warn("Cannot get version from metadata");
    return;
  }
  ;
  const worker = new Worker(`./scripts/worker/web-worker.js?v=${version}`, { type: "module" });
  console.log("web worker has been loaded");
  return worker;
}

// src/tg-bot-playground/bot-launcher/run.ts
var makeRunnableBot = (tsTextModel, worker) => (state) => tsTextModel.getJsCode().then((code) => {
  if (!state.bot.token || state.bot.token.length < 10) return;
  if (!code.serialized) {
    console.warn("Serizalized js code not defined");
    return;
  }
  worker.postMessage({
    command: "run-bot",
    token: state.bot.token,
    code: code.serialized
  });
  state.bot.status = "active";
}).catch((error) => {
  console.warn("cannot run bot", error);
});
var checkTokenAndRun = (state, runnableBot) => {
  const token = state.bot.token;
  if (!token) return;
  fetch(`https://api.telegram.org/bot${token}/getMe`).then((_) => _.json()).then((info) => {
    if (info.ok) {
      state.bot.name = info.result.first_name;
      console.log("Running bot");
      runnableBot(state);
    } else {
      state.bot.name = "nameless";
    }
  }).catch((error) => {
    console.warn("check token error", error);
  });
};

// src/tg-bot-playground/bot-launcher/_main.ts
var makeBotLauncher = async (tsTextModel) => {
  const worker = await loadWorker();
  if (!worker) return;
  const runnableBot = makeRunnableBot(tsTextModel, worker);
  return {
    worker,
    runBot: (state) => runnableBot(state),
    checkTokenAndRun: (state) => checkTokenAndRun(state, runnableBot)
  };
};

// src/tg-bot-playground/utils.ts
var fetchText = (path) => fetch(path).then((_) => _.text());
var getMonacoLoader = () => {
  if (!("monaco_loader" in window) || typeof window.monaco_loader != "object" || window.monaco_loader == null) {
    console.warn("monaco loader is not available");
    return;
  }
  return window.monaco_loader;
};
function getAlpine() {
  if (!("Alpine" in window) || typeof window.Alpine != "object" || window.Alpine == null) {
    console.warn("Alpine is not available");
    return;
  }
  return window.Alpine;
}

// src/tg-bot-playground/editor/setup.ts
var setupDts = async (monaco) => {
  const dts = await fetchText("https://cdn.jsdelivr.net/npm/@effect-ak/tg-bot-client@0.2.2/dist/index.d.ts");
  monaco.languages.typescript.typescriptDefaults.setExtraLibs([
    {
      content: dts,
      filePath: "node_modules/@effect-ak/tg-bot-client/index.d.ts"
    }
  ]);
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    typeRoots: [
      "node_modules"
    ],
    strict: true
  });
};

// src/tg-bot-playground/editor/ts-text-model.ts
var makeTsTextModel = async (monaco) => {
  const emptyExample = await fetchText("./example/empty.ts");
  const tsModel = monaco.editor.createModel(emptyExample, "typescript");
  let cachedWorkerPromise = null;
  const getTsCode = async () => {
    if (!cachedWorkerPromise) {
      cachedWorkerPromise = (async () => {
        const tsWorker = await monaco.languages.typescript.getTypeScriptWorker();
        return tsWorker(tsModel.uri);
      })();
    }
    return cachedWorkerPromise.then((_) => _.getEmitOutput(tsModel.uri.toString()));
  };
  return {
    tsModel,
    getJsCode: async () => {
      const output = await getTsCode();
      const code = output.outputFiles[0].text;
      const defaultExport = await getDefaultExport(code);
      return {
        defaultExport,
        serialized: serialize(defaultExport?.default)
      };
    }
  };
};
async function getDefaultExport(code) {
  try {
    const encodedCode = encodeURIComponent(code);
    const module = await import(`data:text/javascript,${encodedCode}`);
    const result = module.default;
    return { default: result };
  } catch (e) {
    console.warn("get default error", e);
    return void 0;
  }
}
var serialize = (input) => {
  if (typeof input != "object" || !input) {
    return void 0;
  }
  const result = [];
  for (const [key, value] of Object.entries(input)) {
    if (typeof value != "function") {
      continue;
    }
    result.push([key, value.toString()]);
  }
  return JSON.stringify(Object.fromEntries(result));
};

// src/tg-bot-playground/editor/init.ts
var initEditor = async (loader) => {
  const container = document.getElementById("container");
  if (!container) {
    console.warn("container not found");
    return;
  }
  loader.config({
    paths: {
      vs: "https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs"
    }
  });
  const monaco = await loader.init();
  const tsTextModel = await makeTsTextModel(monaco);
  const editor = monaco.editor.create(container, {
    model: tsTextModel.tsModel,
    contextmenu: false,
    minimap: {
      enabled: false
    }
  });
  return {
    tsTextModel,
    editor,
    monaco
  };
};

// src/tg-bot-playground/editor/_editor.ts
var makeEditor = async (state) => {
  const loader = getMonacoLoader();
  if (!loader) return;
  const editor = await initEditor(loader);
  if (!editor) return;
  await setupDts(editor.monaco);
  return {
    tsTextModel: editor.tsTextModel,
    loadExample: () => {
      if (!state.selectedExample) return;
      fetchText(`./example/${state.selectedExample}`).then((_) => editor.tsTextModel.tsModel.setValue(_));
    },
    onCodeChange: (f) => {
      let timeoutId;
      const debounceDelay = 1e3;
      editor.tsTextModel.tsModel.onDidChangeContent(() => {
        if (timeoutId !== void 0) {
          clearTimeout(timeoutId);
        }
        timeoutId = window.setTimeout(() => {
          const markers = editor.monaco.editor.getModelMarkers({
            resource: editor.tsTextModel.tsModel.uri
          });
          const hasError = markers.find((_) => _.severity.valueOf() == 8) != null;
          if (!hasError) {
            f();
          } else {
            console.debug("Code contains errors");
          }
        }, debounceDelay);
      });
    }
  };
};

// src/tg-bot-playground/_main.ts
var makeGlobalState = (alpine) => {
  const state = alpine.reactive({
    bot: {
      name: "nameless",
      status: "idle",
      token: ""
    },
    selectedExample: "empty.ts",
    botUpdates: []
  });
  return state;
};
document.addEventListener("alpine:init", async () => {
  const Alpine = getAlpine();
  if (!Alpine) return;
  Alpine.data("state", () => ({
    bot: {
      a: 1
    }
  }));
  const state = makeGlobalState(Alpine);
  Alpine.store("state", state);
  const editor = await makeEditor(state);
  if (!editor) return;
  const botLauncher = await makeBotLauncher(editor.tsTextModel);
  if (!botLauncher) return;
  editor.onCodeChange(() => {
    botLauncher.runBot(state);
  });
  document.addEventListener("check-token", () => {
    botLauncher.checkTokenAndRun(state);
  });
  document.addEventListener("change-example", () => {
    editor.loadExample();
  });
  botLauncher.worker.onmessage = (event) => {
    const data = event.data;
    console.log("got message from worker", data);
    if (!data) return;
    if (data.botState) {
      Object.assign(state.bot, data.botState);
    }
    state.botUpdates.push(data);
  };
});
export {
  makeGlobalState
};
