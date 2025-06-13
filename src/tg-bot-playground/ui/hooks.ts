import React from "react";
import { Effect } from "effect";
import { setupBotToken } from "~/tg/core/bot/token";
import { PlaygroundBusProvider } from "~/tg/core/bus";
import { PlaygroundContext } from "./context";

export function UseLogs() {
  const context = UsePlaygroundContext()
  const [logs, setLogs] = React.useState([] as unknown[]);

  React.useEffect(() =>
    context.subscribe(event => setLogs(prevLogs => [...prevLogs, event])),
    [context]
  )

  return {
    logs, setLogs
  } as const
}

export function UseBotState() {

  const context = UsePlaygroundContext()
  const [botState, updateBotState] = React.useState(context.botState)

  return {
    botState,
    setToken: async (token: string) => {
      const isReady =
        await setupBotToken(token).pipe(
          Effect.provideService(PlaygroundBusProvider, context.eventBus),
          Effect.runPromise
        )
      updateBotState({
        ...context.botState
      })
      if (isReady) {
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
