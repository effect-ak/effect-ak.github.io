import { Schema as S } from "effect"

const ErrorEncounter =
  S.Struct({
    type: S.Literal("error-encounter"),
    error: S.String
  })

const BotCodeChanged =
  S.Struct({
    type: S.Literal("bot-code-changed"),
    new_code: S.String
  })

const BotIsConnected =
  S.Struct({
    type: S.Literal("bot-is-connected"),
  })

const NewActiveTab =
  S.Struct({
    type: S.Literal("new-active-tab"),
    tabName: S.Literal("run", "code")
  })

export type FromWorkerEvent = typeof FromWorkerEvent.Type
export const FromWorkerEvent =
  S.Struct({
    type: S.Literal("from-worker"),
    data: S.Record({ key: S.String, value: S.Unknown }),
    message_id: S.Number
  })

export type PlaygroundEvent = typeof PlaygroundEvent.Type
export const PlaygroundEvent =
  S.Union(
    ErrorEncounter,
    BotCodeChanged,
    FromWorkerEvent,
    BotIsConnected,
    NewActiveTab
  )
