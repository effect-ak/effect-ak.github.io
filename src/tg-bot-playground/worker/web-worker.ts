import { runTgChatBot, type BotInstance } from "@effect-ak/tg-bot-client/bot";
import { isRunBot, type RunBot } from "./types";
import { loadBotHandlers } from "./utils";

const handler = makeHandler()

self.onmessage =
  (msg: MessageEvent) =>
    handler(msg.data)

function makeHandler() {
  let messageId = 0
  let botInstance: BotInstance

  console.log("creating worker")

  const sendEvent = (
    input: Record<string, unknown>
  ) =>
    self.postMessage({
      type: "from-worker",
      data: input,
      messageId: messageId++
    })

  const runBot = async (command: RunBot) => {
    const handlers = await loadBotHandlers(command.code);

    if (!handlers) {
      sendEvent({
        error: "handlers doesn't return default",
        command
      })
      return
    }

    console.log("worker got run-bot command");

    if (botInstance) {
      console.log("reloading...")
      await botInstance.reload({
        type: "single",
        ...handlers
      })
      sendEvent({
        newBotState: "reloaded"
      })
      return
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
        newBotState: "stopped"
      })
    })

    sendEvent({
      success: "Bot's fiber has been created",
      newBotState: "active"
    })

    return
  }

  return async (command: unknown) => {

    if (!isRunBot(command)) {
      sendEvent({
        error: "not a run bot command",
        command
      });
      return
    }

    await runBot(command)
    return

  }

}
