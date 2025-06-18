
import React from 'react'
import GitHubButton from 'react-github-btn'
import { createRoot } from 'react-dom/client';
import { Footer } from "~/common/ui/footer"
import { PlaygroundContext } from '~/tg/ui/context';
import { IDE } from './ide';
import { SelectExample } from './select-example';

function StarBtn() {
  return <GitHubButton
    href="https://github.com/effect-ak/tg-bot-client"
    data-color-scheme="no-preference: light; light: light; dark: dark;"
    data-icon="octicon-star" data-size="large" data-show-count="true"
    aria-label="Star effect-ak/tg-bot-client on GitHub"
  >Star</GitHubButton>
}

function Playground() {

  return <>
    <div className="flex mb-6 gap-2">
      <span className="text-xl font-bold text-start text-gray-800">
        Build and test Telegram bots in your browser
      </span>
      <StarBtn />
    </div>
    <SelectExample />
    <IDE />
    <Footer />
  </>

}

export function bindPlayground(context: PlaygroundContext) {

  const container = document.getElementById("playground")

  if (!container) {
    console.warn("root div container")
    return
  }

  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <PlaygroundContext value={context}>
        <Playground />
      </PlaygroundContext>
    </React.StrictMode>
  )
}
