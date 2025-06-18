import { BotResponse, defineBot } from "@effect-ak/tg-bot-client/bot"

export default defineBot({
  on_message: (msg) => {
    if (msg.text?.includes("+")) {
      const numbers = msg.text.split("+");
      let result = 0;
      for (const num of numbers) {
        result += parseInt(num);
      }
      return BotResponse.make({
        type: "document",
        caption: "sum result",
        document: {
          file_content: new TextEncoder().encode(`your sum is ${result}`),
          file_name: "hello.txt"
        }
      })
    }

    if (msg.text) { //reply on any text message
      return BotResponse.make({
        type: "message",
        text: "hey 🙃, send me a message in the format '3+3+3' and I will return you the sum of it in a text file"
      })
    }

    return BotResponse.ignore;

  },
})
