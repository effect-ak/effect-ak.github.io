import React from 'react'
import { isLogEvent } from '~/tg/core/events';
import { ConnectBot } from "./bot";
import { UsePlaygroundContext } from '../hooks';

export function RunTab() {

  const context = UsePlaygroundContext()
  const [logs, setLogs] = React.useState(context.botState.events);

  React.useEffect(() => {
    context.editor.getJsCode().then(
      code => {
        context.botState.currentCode = code
        if (context.botState.isReachable) {
          context.botWorker.runBot()
        }
      }
    )
    const unsubscribe =
      context.subscribe(event => {
        if (!isLogEvent(event)) return
        setLogs(prevLogs => [...prevLogs, event])
        context.botState.events.push(event)
      })
    return () => {
      console.log('leaving run tab')
      unsubscribe()
    }
  }, [context])

  return (
    <div id="run" className="flex flex-col h-full">
      <div className="flex mb-2 text-sm gap-2">
        <ConnectBot />
      </div>
      <div
        className="flex flex-1 flex-col items-start justify-start overflow-y-auto hide-scrollbar border border-gray-400 bg-indigo-50"
      >
        {logs.map((update, idx) => (
          <div
            key={idx}
            className="w-full px-4 py-2 text-sm whitespace-pre-wrap text-black border-b-black border-b border-dotted"
          >
            {JSON.stringify(update)}
          </div>
        ))}
      </div>
    </div>
  )
}
