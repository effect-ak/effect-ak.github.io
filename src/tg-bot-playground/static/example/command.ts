import { BotResponse, defineBot } from "@effect-ak/tg-bot-client"

export default defineBot({
  on_message: (msg) => {

    const commandEntity = msg.entities?.find(_ => _.type == "bot_command");
    const command = msg.text?.slice(commandEntity?.offset, commandEntity?.length);

    console.log("command", command);

    if (command == "/bye") {
      return BotResponse.make({
        type: "message",
        text: "See you later!"
      });
    }

    if (command == "/echo") {
      return BotResponse.make({
        type: "message",
        text: `<pre language="json">${JSON.stringify(msg, undefined, 2)}</pre>`,
        parse_mode: "HTML"
      })
    }

    if (msg.text) { // reply with "hey" on any text message
      return BotResponse.make({
        type: "message",
        text: "hey 😇"
      })
    }

    return BotResponse.ignore

  },
})
