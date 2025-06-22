import React from "react"
import { Context, Effect, Layer, Logger, ManagedRuntime, Runtime } from "effect"
import { ResumeEditorProvider } from "~/cv/core/editor"
import { StoreProvider } from "~/cv/core/store"
import { EditorProvider } from "~/common/monaco/editor"
import { EditorModel } from "~/common/monaco/model"

export type AppContext = {
  editor: ResumeEditorProvider
  store: StoreProvider
}

export const AppContext =
  React.createContext<AppContext | null>(null)

export type AppState = {
  currentResume: string
  availableResumes: { id: string, name: string }[]
  currentMode: "view" | "editor"
  changeMode: (id: string) => void
}

export const AppState =
  React.createContext<AppState | null>(null)

const live =
  Layer.mergeAll(
    ResumeEditorProvider.Default,
    StoreProvider.Default
  ).pipe(
    Layer.provide(
      EditorProvider.Default.pipe(
        Layer.provideMerge(EditorModel.json)
      )
    ),
    Layer.provide(Logger.pretty)
  )

type AppRuntime = Runtime.Runtime<ResumeEditorProvider | StoreProvider>
const AppRuntime = ManagedRuntime.make(live)

export async function makeAppContext(): Promise<AppContext> {

  const runtime = await AppRuntime.runtimeEffect.pipe(Effect.runPromise)

  const editor = Context.get(runtime.context, ResumeEditorProvider)
  const store = Context.get(runtime.context, StoreProvider)

  return {
    editor, store
  } as const
}
