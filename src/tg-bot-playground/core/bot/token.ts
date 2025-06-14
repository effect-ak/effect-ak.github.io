import { Effect, pipe } from "effect";
import { executeTgBotMethod, TgBotApiToken } from "@effect-ak/tg-bot-client";
import { BotStateProvider } from "./state";
import { PlaygroundBusProvider } from "~/tg/core/bus";

export const setupBotToken =
  Effect.fn("setup bot token")(function* (
    token: string
  ) {

    console.log('setup bot token')

    const botState = yield* BotStateProvider
    const eventBus = yield* PlaygroundBusProvider

    const responses = yield* pipe(
      Effect.all({
        me: executeTgBotMethod("get_me", {}),
        webhook: executeTgBotMethod("get_webhook_info", {})
      }, { concurrency: "unbounded" }),
      Effect.catchAll((error) =>
        eventBus.offer({
          type: 'error-encounter',
          error: error.toString()
        }).pipe(
          Effect.andThen(Effect.void)
        )
      ),
      Effect.tap(Effect.sleep("1 second"))
    )

    if (!responses) return false

    if (responses.webhook.url) {
      eventBus.unsafeOffer({
        type: "error-encounter",
        error: "Cannot work with webhooks, delete it first"
      });
      return false
    }

    botState.name = responses.me.username ?? responses.me.first_name
    botState.isReachable = true
    botState.token = token

    eventBus.unsafeOffer({
      type: 'bot-is-connected'
    })

    return true

  }, (eff, token) => eff.pipe(Effect.provideService(TgBotApiToken, token)))
