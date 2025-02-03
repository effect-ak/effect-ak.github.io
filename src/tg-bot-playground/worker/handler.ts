import { runTgChatBot, BotInstance } from "@effect-ak/tg-bot-client";
import { isRunBot, type BotState } from "../types";
import { loadJsModule } from "./utils";

export const makeWorkerHandler = (
  notifyParent: (_: Record<string, unknown> & { messageId: number }) => void
) => {

  let messageId = 0;

  let botInstance = undefined as BotInstance | undefined;

  const sendEvent = (
    input: Record<string, unknown>
  ) =>
    notifyParent({
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

      const handlers = await loadJsModule(command.code);

      console.log("worker got run-bot command", handlers);

      if (botInstance) {
        console.log("reloading...")
        await botInstance.reload({
          type: "single",
          ...handlers.default
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
          mode: {
            type: "single",
            ...handlers.default
          }
        });

      botInstance.fiber()?.addObserver((exit) => {
        sendEvent({
          success: "Bot's fiber has been shutdown",
          exit,
          botState: {
            status: "stopped"
          } as BotState
        })
      })

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
