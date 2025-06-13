import React from "react";
import { UseBotState } from '~/tg/ui/hooks';
import { Button } from "./misc";

export function ConnectBot() {
  const { setToken, botState } = UseBotState()
  const [connecting, setConnecting] = React.useState(false)
  if (botState.token && botState.name) {
    const url = `tg://resolve?domain=${botState.name}`
    return (
      <>
        <span className="text-green-700">Connected:</span>
        <a className="hover:text-blue-700" href={url}>@{botState.name}</a>
      </>
    )
  }
  const setupToken = async () => {
    const token = prompt("Enter your Telegram bot token (from BotFather) to connect the bot")
    if (!token) return
    setConnecting(true)
    await setToken(token)
    setConnecting(false)
  }
  return <div className="flex gap-2">
    {!connecting && (
      <span className="text-lg text-red-600">Not connected</span>
    )}
    {connecting && (
      <span className="text-lg">
        Connecting... <i className="fas fa-cog fa-spin"></i>
      </span>
    )}
    {!connecting && (
      <Button icon="plug" click={setupToken} />
    )}
  </div>
}