import React from "react"
import { Navigation } from "./navigation"
import { EditorTab } from "./editor-tab"
import { ViewTab } from "./view-tab"
import { Footer } from "~/common/ui/footer"
import { createRoot } from "react-dom/client"
import { AppContext, AppState } from "../context"
import { Effect } from "effect"

export function Page(props: {
  appContext: AppContext
}) {

  const [currentMode, changeMode] = React.useState('editor' as 'view' | 'editor')

  const [availableResumes, setAvailableResumes] = React.useState<{ id: string, name: string }[]>([])

  React.useEffect(() => {
    props.appContext.store
      .loadStoredResume()
      .pipe(Effect.runPromise)
      .then(setAvailableResumes)
  }, [])

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
        <Footer />
      </AppState>
    </AppContext>

  )
}

export function bindMainPage(appContext: AppContext, container: HTMLElement) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Page appContext={appContext}></Page>
    </React.StrictMode>
  )
}
