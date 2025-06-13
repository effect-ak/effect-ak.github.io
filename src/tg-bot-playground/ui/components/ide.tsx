import React from 'react'
import { UseLogs, UsePlaygroundContext } from '../hooks';
import { ConnectBot } from './bot';

export function IDE() {

  const { eventBus } = UsePlaygroundContext()
  const [activeTab, setActiveTab] = React.useState("run")
  const { logs } = UseLogs()
  const modes = ["code", "run"] as const

  function changeTab(mode: "code" | "run") {
    setActiveTab(mode)
    eventBus.unsafeOffer({
      type: 'new-active-tab',
      tabName: mode
    })
  }

  return (
    <div className="flex gap-2.5 h-full">
      <div className="w-20">
        {modes.map(mode =>
          <button
            key={mode}
            className={`transition block mb-2 px-4 py-2 rounded ${activeTab === mode ? "bg-gray-200" : "hover:bg-gray-200"}`}
            onClick={() => changeTab(mode)}
          >
            {mode}
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col min-h-0">
        <div className={activeTab === 'code' ? '' : 'hidden'}>
          <CodeEditor />
        </div>
        <div className={`h-full w-full ${activeTab === 'run' ? '' : 'hidden'}`}>
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
                  className="bg-gray-200 m-2.5 rounded p-2 text-sm whitespace-pre-wrap text-black"
                >
                  {JSON.stringify(update, null, 2)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CodeEditor() {

  const context = UsePlaygroundContext()

  React.useEffect(() => {
    const editor = context.editor.bindEditor()
    return () => editor?.dispose()
  }, [context]);

  return <div id="code-editor" className="w-full h-[600px] border border-gray-400"></div>;
}
