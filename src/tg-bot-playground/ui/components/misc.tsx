import React from 'react'

export function Button(input: {
  icon: string,
  click: () => void
}) {
  return (
    <button
      type="button"
      className="px-3 py-1 border rounded hover:bg-gray-200 active:bg-gray-300"
      onClick={() => input.click()}
    >
      <i className={`fas fa-${input.icon}`}></i>
    </button>
  )
}
