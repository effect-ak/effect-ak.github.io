import type { ResumeEditorProvider } from "./editor"

export type AppState = {
  currentResume: string
  currentMode: string
  availableResumes: { id: string, name: string }[]
  editor: ResumeEditorProvider
}
