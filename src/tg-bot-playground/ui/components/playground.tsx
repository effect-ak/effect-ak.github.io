
import React from 'react'
import { createRoot } from 'react-dom/client';
import { Footer } from "./footer"
import { PlaygroundContext } from '../context';
import { IDE } from './ide';
import { SelectExample } from './select-example';

function Playground() {

  return <>
    <h2 className="text-xl font-bold text-start text-gray-800 mb-6">Build and test Telegram bots in your browser 🤖</h2>
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
