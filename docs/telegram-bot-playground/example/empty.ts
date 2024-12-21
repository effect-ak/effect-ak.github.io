import type { BotMessageHandlers } from "@effect-ak/tg-bot-client"

export default {
  on_message: (msg) => {

    return {
      type: "message",
      text: "hey :)"
    }
  },
} as BotMessageHandlers
