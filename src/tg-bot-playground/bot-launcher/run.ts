import { makeTgBotClient } from "@effect-ak/tg-bot-client";
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
  async (state: GlobalState, runnableBot: RunnableBot) => {

    const token = state.bot.token;

    if (!token) {
      state.bot.isReachable = false;
      return
    };

    const client =
      makeTgBotClient({
        bot_token: token
      });

    await client.execute("get_me", {})
      .then(info => {
        state.bot.name = info.first_name;
        state.bot.isReachable = true;
        console.log("Running bot")
        return runnableBot(state);
      }).catch(error => {
        state.botUpdates.push(error);
        state.bot.name = "nameless";
        state.bot.isReachable = false;
      });

    const webhook =
      await client.execute("get_webhook_info", {});

    if (webhook.url) {
      state.botUpdates.push("Cannot work with webhooks, delete it first");
      state.bot.isReachable = false;
    }

  }
