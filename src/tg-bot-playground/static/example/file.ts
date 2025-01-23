import type { BotMessageHandlers } from "@effect-ak/tg-bot-client"

export default {
  on_message: (msg) => {
    if (msg.text?.includes("+")) {
      const numbers = msg.text.split("+");
      let result = 0;
      for (const num of numbers) {
        result += parseInt(num);
      }
      return {
        type: "document",
        caption: "sum result",
        document: {
          file_content: new TextEncoder().encode(`your sum is ${result}`),
          file_name: "hello.txt"
        }
      }
    }

    if (msg.text) { //reply on any text message
      return {
        type: "message",
        text: "hey 🙃, send me a message in the format '3+3+3' and I will return you the sum of it in a text file"
      }
    }

  },
} satisfies BotMessageHandlers
