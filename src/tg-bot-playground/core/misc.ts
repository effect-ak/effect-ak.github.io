import { Effect, pipe, Queue, String } from "effect"
import { FileSystem } from "@effect/platform"
import { NodeFileSystem } from "@effect/platform-node"
import type { OpenAPIV3_1 } from "openapi-types"

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

export const getAllMethodNames =
  Effect.fn("get all method names")(function* () {
    const fs = yield* FileSystem.FileSystem
    const allStr = yield* fs.readFileString("tmp/methods.json")
    return yield* Effect.try(() => JSON.parse(allStr) as string[])
  }, (e) => e.pipe(Effect.provide(NodeFileSystem.layer)))

export const getOneMethod =
  Effect.fn("get one method")(function* (
    name: string
  ) {
    const fs = yield* FileSystem.FileSystem
    const json = yield* fs.readFileString(`tmp/methods/${name}.json`)
    return yield* Effect.try(() => JSON.parse(json) as {
      name: string,
      originName: string,
      description: string,
      input: OpenAPIV3_1.SchemaObject | null
    })
  }, (e) => e.pipe(Effect.provide(NodeFileSystem.layer)))
