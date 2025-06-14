import React from 'react'
import { UsePlaygroundContext } from '../hooks';
import { RunTab } from './run-tab';
import { CodeTab } from './code-tab';

export function IDE() {

  const { eventBus } = UsePlaygroundContext()
  const [activeTab, setActiveTab] = React.useState("code")
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
      <div className="flex flex-1 flex-col w-full h-[600px]">
        {activeTab === 'code' && <CodeTab />}
        {activeTab === 'run' && <RunTab />}
      </div>
    </div>
  )
}
