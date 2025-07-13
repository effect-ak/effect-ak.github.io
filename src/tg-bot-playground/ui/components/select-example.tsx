import React from 'react'
import { UsePlaygroundContext } from '../hooks';

export function SelectExample() {
  const [ selectedExample, setExample ] = React.useState("empty.ts")
  const context = UsePlaygroundContext()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newExample = event.target.value
    setExample(newExample)
    context.editor.changeExample(newExample)
  }

  return (
    <div className="flex items-start gap-2.5 mb-4">
      <label className="flex items-center gap-2">
        Select example
        <select
          className="px-2 py-1 border border-gray-300 rounded bg-white"
          value={selectedExample}
          onChange={handleChange}
        >
          <option value="empty.ts">Simple Bot</option>
          <option value="command.ts">Command Bot</option>
          <option value="file.ts">File Bot</option>
        </select>
      </label>
    </div >
  )
}