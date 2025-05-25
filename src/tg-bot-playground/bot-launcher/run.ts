import { executeTgBotMethod } from "@effect-ak/tg-bot-client";
import * as Micro from "effect/Micro";
import * as Context from "effect/Context";
import type { GlobalState } from "#/tg-bot-playground/main";
import type { TsTextModel } from "#/common/editor/text-model";
import { TgBotApiToken } from "@effect-ak/tg-bot-client";

export type RunBotInBackground = (state: GlobalState) => Promise<void>
export const makeRunnableBot = (
  tsTextModel: TsTextModel, worker: Worker
) =>
  (state: GlobalState) =>
    tsTextModel.getJsCode().then(code => {

      if (!state.bot.token || state.bot.token.length < 10) return;

      worker.postMessage({
        command: 'run-bot',
        token: state.bot.token,
        code
      });

      state.bot.status = "active"
    }).catch(error => {
      console.warn("cannot run bot", error)
    })

export const checkTokenAndRun =
  async (state: GlobalState, runBot: RunBotInBackground) => {

    const token = state.bot.token;

    if (!token) {
      state.bot.isReachable = false;
      return
    };

    const tokenService = Context.make(TgBotApiToken, token)

    await executeTgBotMethod('get_me', {}).pipe(
      Micro.andThen(info => {
        state.bot.name = info.first_name;
        state.bot.isReachable = true;
        console.log("Running bot")
      }),
      Micro.catchAll(error => {
        state.botUpdates.push(error);
        state.bot.name = "nameless";
        state.bot.isReachable = false;
        return Micro.tryPromise({
          try: () => runBot(state),
          catch: cause => new Error('Cannot run bot', { cause })
        });
      }),
      Micro.tapErrorCause(error => {
        console.warn('check bot and run', error)
        return Micro.void
      }),
      Micro.provideContext(tokenService),
      Micro.runPromiseExit
    )

    const webhook =
      await executeTgBotMethod("get_webhook_info", {}).pipe(
        Micro.provideContext(tokenService),
        Micro.runPromiseExit
      );

    if (webhook._tag == "Success" && webhook.value.url) {
      state.botUpdates.push("Cannot work with webhooks, delete it first");
      state.bot.isReachable = false;
    }

  }

