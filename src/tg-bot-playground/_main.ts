import { makeBotLauncher } from "#tg-bot-playground/bot-launcher/_main.js";
import { makeEditor } from "#tg-bot-playground/editor/_editor.js";
import { getAlpine } from "#tg-bot-playground/utils.js";
import type { Alpine, BotState } from "./types.js";

export type GlobalState = ReturnType<typeof makeGlobalState>;

export const makeGlobalState = (
  alpine: Alpine
) => {

  const state =
    alpine.reactive({
      bot: {
        name: 'nameless',
        status: 'idle',
        token: ''
      } as BotState,
      selectedExample: "empty.ts",
      botUpdates: [] as unknown[],
    } as const)

  return state

}

document.addEventListener('alpine:init', async () => {
  const Alpine = getAlpine();

  if (!Alpine) return;

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
    botLauncher.checkTokenAndRun(state)
  });

  document.addEventListener("change-example", () => {
    editor.loadExample()
  });
  
  botLauncher.worker.onmessage = (event: MessageEvent) => {
    const data = event.data
    console.log('got message from worker', data);
    if (!data) return;
    if (data.botState) {
      Object.assign(state.bot, data.botState)
    }
    state.botUpdates.push(data);
    // console.log('Scrolling', $refs.updates.scrollHeight);
    // $nextTick(() => { $refs.updates.scrollTop = $refs.updates.scrollHeight })
  }

})

