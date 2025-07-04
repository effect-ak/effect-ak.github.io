import { Context, Brand } from "effect";
import type { PlaygroundEvent } from "../events";

export type BotState = Brand.Branded<{
  status: string
  token: string
  name: string
  isReachable: boolean
  isAutoReload: boolean
  currentCode: string
  events: PlaygroundEvent[]
}, "BotState">

export const BotState = Brand.nominal<BotState>()

export class BotStateProvider
  extends Context.Reference<BotStateProvider>()("BotStateProvider", {
    defaultValue: () =>
      BotState({
        name: 'nameless',
        status: 'idle',
        token: '',
        isAutoReload: false,
        isReachable: false,
        currentCode: '',
        events: []
      })
  }) { }
