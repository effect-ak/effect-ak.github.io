
import React from 'react'
import { createRoot } from 'react-dom/client';
import { PlaygroundContext } from '~/tg/ui/context';
import { IDE } from './ide';
import { SelectExample } from './select-example';

function Playground() {

  return <>
    <SelectExample />
    <IDE />
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
