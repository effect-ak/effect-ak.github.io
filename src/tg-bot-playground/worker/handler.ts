import { runTgChatBot, BotInstance } from "@effect-ak/tg-bot-client";
import { isRunBot, type BotState } from "../types";
import { deserialize } from "./utils";

export const makeWorkerHandler = (
  notifyParent: (_: Record<string, unknown> & { messageId: number }) => void
) => {

  let messageId = 0;

  let botInstance = undefined as BotInstance | undefined;

  const sendEvent = (
    input: Record<string, unknown>
  ) => notifyParent({
    ...input,
    messageId: messageId++
  });

  return async (command: unknown) => {

    if (!isRunBot(command)) {
      sendEvent({
        error: "not a run bot command",
        command
      });
      return;
    }
  
    if (command.command == "run-bot") {
  
      const handlers = deserialize(command.code);
  
      if (botInstance) {
        console.log("reloading...")
        await botInstance.reload({
          ...handlers,
        });
        sendEvent({
          botState: {
            status: "reloaded"
          } as BotState
        })
        return;
      }
  
      botInstance = 
        await runTgChatBot({
          type: "config",
          bot_token: command.token,
          ...handlers,
          onExit: (exit) =>
            sendEvent({
              success: "Bot's fiber has been shutdown",
              exit,
              botState: {
                status: "stopped"
              } as BotState
            })
        });
  
      sendEvent({
        success: "Bot's fiber has been created",
        botState: {
          status: "active"
        } as BotState
      });
  
      return;
    }
  
    sendEvent({
      error: "Unknown command"
    })
  }

}
