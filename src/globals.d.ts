interface Window {
  monaco: typeof import("monaco-editor")
  monaco_loader: typeof import("@monaco-editor/loader").default
  playground: {
    worker?: Worker
    tsModel?: import("monaco-editor").editor.ITextModel
    start?: typeof import("./tg-bot-playground/main.js").startPlayground
    editor?: import("monaco-editor").editor.IStandaloneCodeEditor
    loadExample?: (name: string) => void
    runBot?: (_: BotState) => void
    checkToken?: (_: BotState) => void
  }
}