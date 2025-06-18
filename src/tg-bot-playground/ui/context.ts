import React from "react";
import { Context, Effect, Exit, Layer, Logger, ManagedRuntime, pipe, Scope } from "effect";

import type { PlaygroundEvent } from "~/tg/core/events";
import { BotState, BotStateProvider } from "~/tg/core/bot/state";
import { TgBotEditorProvider } from "~/tg/core/editor";
import { PlaygroundBusProvider } from "~/tg/core/bus";
import { BotWorkerProvider } from "~/tg/core/bot/worker";

export type PlaygroundContext = {
  editor: TgBotEditorProvider
  eventBus: PlaygroundBusProvider
  botWorker: BotWorkerProvider
  botState: BotState
  subscribe: (listener: (event: PlaygroundEvent) => void) => () => void
}

export const PlaygroundContext = React.createContext<PlaygroundContext | null>(null)

const live = Layer.mergeAll(
  TgBotEditorProvider.Default,
  PlaygroundBusProvider.Default,
  BotWorkerProvider.Default,
).pipe(
  Layer.provide(Logger.pretty)
)

const PlaygroundRuntime = ManagedRuntime.make(live)

export const makeContext = async () => {
  const runtime = await PlaygroundRuntime.runtimeEffect.pipe(Effect.runPromise);

  const editor = Context.get(runtime.context, TgBotEditorProvider);
  const eventBus = Context.get(runtime.context, PlaygroundBusProvider);
  const botState = Context.get(runtime.context, BotStateProvider);
  const botWorker = Context.get(runtime.context, BotWorkerProvider);

  return {
    botWorker,
    eventBus,
    botState,
    editor,
    subscribe(listener) {
      console.log('subscribing...')
      const eff =
        Effect.gen(function* () {
          const scope = yield* Scope.make()
          const subscription = yield* pipe(
            eventBus.subscribe,
            Effect.provideService(Scope.Scope, scope),
          )

          const fiber = yield* pipe(
            subscription.take,
            Effect.andThen(listener),
            Effect.forever,
            Effect.forkIn(scope)
          )

          const close = () =>
            pipe(
              Scope.close(scope, Exit.void),
              Effect.runPromiseExit
            ).then(
              (res) => console.log("cleaning up scope", res)
            )

          return { subscription, fiber, close }
        })

      const { close } = Effect.runSync(eff);

      return () => {
        console.log('closing scope...')
        close()
      }
    },
  } satisfies PlaygroundContext
}
