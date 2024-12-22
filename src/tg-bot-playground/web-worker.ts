import { runTgChatBot } from "@effect-ak/tg-bot-client"

import { deserialize } from "./utils.js"
import type { BotState } from "./types.js"

console.log("loading worker...");

type RunBot = {
  command: "run-bot"
  token: string
  code: string
}

let logId = 1;

const notifyParent = (input: object) => {
  self.postMessage({
    id: logId++,
    ...input
  });
}

self.onmessage = async (msg: MessageEvent<unknown>) => {

  const command = msg.data as RunBot;

  if (typeof command != "object" || !command.command) {
    notifyParent({
      error: "object command expected"
    });
    return;
  }

  if (command.command == "run-bot") {

    const handlers = deserialize(command.code);
    const fiber = 
      await runTgChatBot({
        type: "config",
        "bot-token": command.token,
        ...handlers
      });

    if (fiber._tag == "Failure") {
      notifyParent({
        error: "Cannot create bot's fiber",
        cause: fiber.cause
      });
      return;
    }

    notifyParent({
      success: "Bot's fiber has been created",
      botState: {
        status: "active"
      } as BotState
    });

    fiber.value.addObserver(exit => {
      notifyParent({
        success: "Bot's fiber has been shutdown",
        exit,
        botState: {
          status: "stopped"
        } as BotState
      })
    });

    return;
  }

  notifyParent({
    error: "Unknown command"
  })

}
