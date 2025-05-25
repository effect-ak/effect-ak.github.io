import { runTgChatBot, BotInstance } from "@effect-ak/tg-bot-client/bot";
import { isRunBot, type BotState } from "../types";
import { loadBotHandlers } from "./utils";

export const makeWorkerHandler = (
  notifyParent: (_: Record<string, unknown> & { messageId: number }) => void
) => {

  let messageId = 0;

  let botInstance: BotInstance | undefined;

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

      const handlers = await loadBotHandlers(command.code);

      if (!handlers) {
        sendEvent({
          error: "handlers doesn't return default",
          command
        });
        return;
      }

      console.log("worker got run-bot command");

      if (botInstance) {
        console.log("reloading...")
        await botInstance.reload({
          type: "single",
          ...handlers
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
          bot_token: command.token,
          poll: {
            on_error: "continue"
          },
          mode: {
            type: "single",
            ...handlers
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
