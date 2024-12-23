export type MonacoLoader = typeof import("@monaco-editor/loader").default;
export type TextModel = import("monaco-editor").editor.ITextModel;
export type Monaco = typeof import("monaco-editor");
export type Alpine = typeof import("alpinejs");

export type BotState = {
  status: string
  token: string
  name: string
}

export type RunBot = {
  command: "run-bot"
  token: string
  code: string
}

export const isRunBot = 
  (input: unknown): input is RunBot =>
    typeof input == "object" && input != null && "command" in input && "token" in input && "code" in input;