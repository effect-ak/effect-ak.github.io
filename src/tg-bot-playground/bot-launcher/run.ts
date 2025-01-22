import type { GlobalState } from "#/tg-bot-playground/main";
import type { TsTextModel } from "#/common/editor/ts-text-model";

export type RunnableBot = (ReturnType<typeof makeRunnableBot>)
export const makeRunnableBot =
  (tsTextModel: TsTextModel, worker: Worker) =>
    (state: GlobalState) =>
      tsTextModel.getJsCode().then(code => {

        if (!state.bot.token || state.bot.token.length < 10) return;

        if (!code.serialized) {
          console.warn("Serizalized js code not defined");
          return;
        }

        console.log("code", code.serialized)

        worker.postMessage({
          command: 'run-bot',
          token: state.bot.token,
          code: code.serialized
        });

        state.bot.status = "active"
      }).catch(error => {
        console.warn("cannot run bot", error)
      })

export const checkTokenAndRun =
  (state: GlobalState, runnableBot: RunnableBot) => {

    const token = state.bot.token;

    if (!token) {
      state.bot.isReachable = false;
      return
    };

    fetch(`https://api.telegram.org/bot${token}/getMe`)
      .then(_ => _.json())
      .then(info => {
        if (info.ok) {
          state.bot.name = info.result.first_name;
          state.bot.isReachable = true;
          console.log("Running bot")
          runnableBot(state);
        } else {
          state.bot.name = "nameless";
          state.bot.isReachable = false;
        }
      }).catch(error => {
        console.warn("check token error", error);
        state.bot.isReachable = false;
      });

  }
