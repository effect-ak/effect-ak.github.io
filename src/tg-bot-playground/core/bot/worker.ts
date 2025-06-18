import { Effect, Schema } from "effect"
import { FromWorkerEvent, isLogEvent } from "~/tg/core/events";
import { PlaygroundBusProvider } from "~/tg/core/bus";
import type { RunBot } from "./types";
import { BotStateProvider } from "./state";

export class BotWorkerProvider
  extends Effect.Service<BotWorkerProvider>()("BotWorkerProvider", {
    scoped:
      Effect.gen(function* (_) {

        yield* Effect.logInfo('worker up')
        const worker = new Worker(new URL('./web-worker.ts', import.meta.url), { type: "module" })

        const botState = yield* BotStateProvider

        yield* Effect.addFinalizer((exit) => {
          worker.terminate()
          console.log("terminating worker", exit)
          return Effect.void
        })

        worker.addEventListener("message", (event) => {
          console.log('message from worker', event.data)
          const update = Schema.validateEither(FromWorkerEvent)(event.data)
          if (update._tag != "Right" || !isLogEvent(update.right)) {
            console.log('ignoring web worker event', event)
            return
          }
          botState.events.push(update.right)
        })

        return {
          runBot() {
            worker.postMessage({
              command: 'run-bot',
              code: botState.currentCode,
              token: botState.token
            } satisfies RunBot)
          }
        } as const
      }),
      dependencies: [
        PlaygroundBusProvider.Default
      ]
  }, ) { }


