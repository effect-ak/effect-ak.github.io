import Alpine from "alpinejs";
import { makeBotLauncher } from "#/tg-bot-playground/bot-launcher/_main";
import { makeTsEditor } from "#/common/editor/make";
import { fetchText } from "#/common/utils";
import type { BotState } from "./types";

export type GlobalState = ReturnType<typeof makeGlobalState>;

export const makeGlobalState = (
  alpine: Alpine.Alpine
) => {

  const state =
    alpine.reactive({
      bot: {
        name: 'nameless',
        status: 'idle',
        token: '',
        isAutoReload: false,
        isReachable: false
      } as BotState,
      selectedExample: "empty.ts",
      botUpdates: [] as unknown[],
    } as const)

  return state

}

declare global {
  interface Window {
    Alpine: typeof Alpine;
  }
}

window.Alpine = Alpine;

setup();

Alpine.start();

async function setup() {
  const state = makeGlobalState(Alpine);

  Alpine.store("state", state);

  const editor = await makeTsEditor();

  if (!editor) return;

  const botLauncher = await makeBotLauncher(editor.tsTextModel);

  if (!botLauncher) return;

  editor.onCodeChange(async () => {
    if (!state.bot.isReachable || !state.bot.isAutoReload) return;
    botLauncher.runBot(state);
  });

  document.addEventListener("reload-bot", () => {
    botLauncher.runBot(state);
  });

  document.addEventListener("check-token", () => {
    botLauncher.checkTokenAndRun(state)
  });

  document.addEventListener("change-example", () => {
    if (!state.selectedExample) return;
    fetchText(`./example/${state.selectedExample}`)
      .then(_ => editor.tsTextModel.tsModel.setValue(_))
  });
  
  botLauncher.worker.onmessage = (event: MessageEvent) => {
    const data = event.data
    // console.log('got message from worker', data);
    if (!data) return;
    if (data.botState) {
      Object.assign(state.bot, data.botState)
    }
    state.botUpdates.push(data);
    // console.log('Scrolling', $refs.updates.scrollHeight);
    // $nextTick(() => { $refs.updates.scrollTop = $refs.updates.scrollHeight })
  }
}