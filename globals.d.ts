// globals.d.ts
import { BotResponse as _BotResponse, defineBot as _defineBot } from "@effect-ak/tg-bot-client/bot";

declare global {
  const defineBot: typeof _defineBot;
  const BotResponse: typeof _BotResponse;
}