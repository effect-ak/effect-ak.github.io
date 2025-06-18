import React from "react"
import { Context, Effect, Layer, Logger, ManagedRuntime } from "effect"
import { getUrlParam } from "~/common/utils"
import type { AppState } from "~/cv/core/state"
import { ResumeEditorProvider } from "~/cv/core/editor"

export const AppContext =
  React.createContext<AppState | null>(null)

const live =
  Layer.mergeAll(
    ResumeEditorProvider.Default,
  ).pipe(
    Layer.provide(Logger.pretty)
  )

const AppRuntime = ManagedRuntime.make(live)

export async function makeAppContext() {

  const runtime = await AppRuntime.runtimeEffect.pipe(Effect.runPromise);
  
  const editor = Context.get(runtime.context, ResumeEditorProvider);

  return {
    currentResume: getUrlParam("resume") ?? "example",
    availableResumes: [],
    editor,
    currentMode: 'editor'
  } satisfies AppState

}
