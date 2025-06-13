import { Effect, PubSub } from "effect"
import type { PlaygroundEvent } from "./events";

const createPubSub =
  Effect.fn("create pub sub")(function* <E>() {
    const pubsub = yield* PubSub.unbounded<E>()
    yield* Effect.addFinalizer(() => PubSub.shutdown(pubsub))
    return pubsub
  })

export class PlaygroundBusProvider
  extends Effect.Service<PlaygroundBusProvider>()("PlaygroundBusProvider", {
    scoped: createPubSub<PlaygroundEvent>()
  }) { }
