// src/tg-bot-playground/utils.ts
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
var getJsCode = async () => {
  const tsModelUri = window.playground.tsModel?.uri;
  if (!tsModelUri) {
    console.warn("tsModel uri not defined");
    return;
  }
  const worker = await window.monaco.languages.typescript.getTypeScriptWorker();
  const modelWorker = await worker(tsModelUri);
  const output = await modelWorker.getEmitOutput(tsModelUri.toString());
  const code = output.outputFiles[0].text;
  const result = await getDefaultExport(code);
  return serialize(result?.default);
};
var fetchText = (path) => fetch(path).then((_) => _.text());
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

// src/tg-bot-playground/main.ts
window.playground.start = () => {
  const container = document.getElementById("container");
  if (!container) {
    return console.error("container not found");
  }
  window.monaco_loader.config({
    paths: {
      vs: "https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs"
    }
  });
  Promise.all([
    window.monaco_loader.init(),
    fetchText("./example/empty.ts")
  ]).then(([monaco, emptyExample]) => {
    window.playground.tsModel = monaco.editor.createModel(emptyExample, "typescript");
    setupDts(monaco);
    window.playground.editor = monaco.editor.create(container, {
      model: window.playground.tsModel,
      contextmenu: false,
      minimap: {
        enabled: false
      }
    });
  }).catch((error) => console.warn("init error", error));
};
window.playground.loadExample = (name) => {
  if (!name) return;
  fetchText(`./example/${name}`).then((_) => window.playground.editor?.setValue(_)).catch((error) => {
    console.error("Cannot load example", error);
  });
};
window.playground.runBot = (state) => {
  const token = state.token;
  if (!token) return;
  getJsCode().then((code) => {
    if (!code) {
      console.warn("Js Code not defined");
      return;
    }
    window.playground.worker?.postMessage({
      command: "run-bot",
      token,
      code
    });
    state.status = "active";
  }).catch((error) => {
    console.warn("cannot run bot", error);
  });
};
window.playground.checkToken = (state) => {
  const token = state.token;
  if (!token) return;
  fetch(`https://api.telegram.org/bot${token}/getMe`).then((_) => _.json()).then((info) => {
    if (info.ok) {
      state.name = info.result.first_name;
    } else {
      state.name = "nameless";
    }
  }).catch((error) => {
    console.warn("check token error", error);
  });
};
