import type { GlobalState } from "#/tg-bot-playground/main";
import type { TsTextModel } from "#/common/editor/ts-text-model";
import { checkTokenAndRun, makeRunnableBot } from "./run";

export const makeBotLauncher = async (
  tsTextModel: TsTextModel
) => {

  const worker = new Worker(new URL('../worker/web-worker.ts', import.meta.url), { type: "module" })

  if (!worker) return;

  const runnableBot =
    makeRunnableBot(tsTextModel, worker);

  return {
    worker,
    runBot: (state: GlobalState) => runnableBot(state),
    checkTokenAndRun: (state: GlobalState) => checkTokenAndRun(state, runnableBot),
  } as const;

}
