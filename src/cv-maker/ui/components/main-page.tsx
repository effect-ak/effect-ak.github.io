import React from "react"
import { Navigation } from "./navigation"
import { EditorTab } from "./editor-tab"
import { ViewTab } from "./view-tab"
import { createRoot } from "react-dom/client"
import { AppContext, AppState } from "../context"

export function Page(props: {
  appContext: AppContext
}) {

  const [ currentMode, changeMode ] = React.useState('editor' as 'view' | 'editor')

  const [ availableResumes ] = React.useState(
    props.appContext.store.availableResumes
  )

  const state: AppState = {
    currentMode,
    changeMode: (mode) => {
      changeMode(mode as any)
    },
    availableResumes,
    currentResume: ''
  }

  return (
    <AppContext value={props.appContext}>
      <AppState value={state}>
        <Navigation />
        {currentMode == "editor" && <EditorTab />}
        {currentMode == "view" && <ViewTab />}
      </AppState>
    </AppContext>

  )
}

export function bindMainPage(appContext: AppContext) {

  const container = document.getElementById("root")

  if (!container) {
    console.warn("root div container")
    return
  }

  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <Page appContext={appContext}></Page>
    </React.StrictMode>
  )
}
