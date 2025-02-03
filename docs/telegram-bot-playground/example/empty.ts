import { BotResponse, defineBot } from "@effect-ak/tg-bot-client"

export default defineBot({
  on_message: (msg) => {

    if (msg.text) {
      return BotResponse.make({
        type: "message",
        text: "hey 😀"
      })
    }

    return BotResponse.ignore;

  },
})
