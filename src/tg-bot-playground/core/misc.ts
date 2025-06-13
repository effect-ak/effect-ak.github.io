import { Effect, pipe, Queue } from "effect";

export const subscribeAndReact =
  Effect.fn("subscribe and react")(<Event, A, E>(
    queue: Queue.Dequeue<Event>,
    action: (event: Event) => Effect.Effect<A, E> 
  ) => {
    return pipe(
      queue.take,
      Effect.tap(event => Effect.logInfo('recieved event', event)),
      Effect.andThen(event => action(event)),
      Effect.tap(Effect.logInfo('forever')),
      Effect.forever,
      Effect.forkScoped
    )
  })