import type { GlobalState } from "#tg-bot-playground/main.js";
import type { TsTextModel } from "#tg-bot-playground/editor/ts-text-model.js";
import { loadWorker } from "./load.js";
import { checkTokenAndRun, makeRunnableBot } from "./run.js";

export const makeBotLauncher = async (
  tsTextModel: TsTextModel
) => {
  const worker = await loadWorker();

  if (!worker) return;

  const runnableBot =
    makeRunnableBot(tsTextModel, worker);

  return {
    worker,
    runBot: (state: GlobalState) => runnableBot(state),
    checkTokenAndRun: (state: GlobalState) => checkTokenAndRun(state, runnableBot),
  } as const;

}
