import { Effect, Schema } from "effect"
import { FromWorkerEvent } from "~/tg/core/events";
import type { RunBot } from "~/tg/worker/types";
import { PlaygroundBusProvider } from "~/tg/core/bus";
import { BotStateProvider } from "./state";

export class BotWorkerProvider
  extends Effect.Service<BotWorkerProvider>()("BotWorkerProvider", {
    scoped:
      Effect.gen(function* (_) {

        console.log('worker up')
        const worker = new Worker(new URL('../../worker/web-worker.ts', import.meta.url), { type: "module" })

        const eventBus = yield* PlaygroundBusProvider
        const botState = yield* BotStateProvider

        yield* Effect.addFinalizer((exit) => {
          worker.terminate()
          console.log("terminating worker", exit)
          return Effect.void
        })

        worker.addEventListener("message", (event) => {
          console.log('message from worker', event.data)
          const update = Schema.validateEither(FromWorkerEvent)(event.data)
          if (update._tag == "Right") eventBus.unsafeOffer(update.right)
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


