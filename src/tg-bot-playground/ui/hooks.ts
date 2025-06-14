import React from "react";
import { Effect } from "effect";
import { setupBotToken } from "~/tg/core/bot/token";
import { PlaygroundBusProvider } from "~/tg/core/bus";
import { PlaygroundContext } from "./context";

export function UseBotState() {

  const context = UsePlaygroundContext()
  const [botState, updateBotState] = React.useState(context.botState)

  return {
    botState,
    setToken: async (token: string) => {
      const isValidToken =
        await setupBotToken(token).pipe(
          Effect.provideService(PlaygroundBusProvider, context.eventBus),
          Effect.runPromise
        )
      updateBotState({
        ...context.botState
      })
      if (isValidToken) {
        context.botWorker.runBot()
      }
    }
  } as const
}

export function UsePlaygroundContext() {
  const context = React.useContext(PlaygroundContext)
  if (!context) throw Error('Playground context is undefined')
  return context
}
