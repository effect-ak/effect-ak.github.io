export type RunBot = {
  command: "run-bot"
  token: string
  code: string
}

export const isRunBot = 
  (input: unknown): input is RunBot =>
    typeof input == "object" && input != null && "command" in input && "token" in input && "code" in input;
