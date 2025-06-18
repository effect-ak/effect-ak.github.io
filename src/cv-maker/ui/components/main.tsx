import React from "react"
import { createRoot } from "react-dom/client"
import { Navigation } from "./navigation"
import { EditorTab } from "./editor-tab"
import { ViewTab } from "./view-tab"
import { AppContext } from "../context"
import type { AppState } from "~/cv/core/state"
import { Footer } from "~/common/ui/footer"

export function Page() {
  return (
    <>
      <Navigation/>
      {true && <EditorTab/>}
      {false && <ViewTab/>}
      <Footer/>
    </>
  )
}

export function bindRoot(appContext: AppState) {

  const container = document.getElementById("root")

  if (!container) {
    console.warn("root div container")
    return
  }

  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <AppContext value={appContext}>
        <Page/>
      </AppContext>
    </React.StrictMode>
  )
}
