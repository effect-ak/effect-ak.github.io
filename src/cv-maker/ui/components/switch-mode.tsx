import React from "react"
import { APP_MODES } from "~/cv/const"
import { UseAppState } from "../hooks"

export function SwitchMode() {

  const { currentMode, changeMode } = UseAppState()

  return (
    <div className="mx-auto flex gap-3">
      {APP_MODES.map((mode) => (
        <label
          key={mode.id}
          className={
            "hover:cursor-pointer text-lg " +
            (mode.id === currentMode ? "text-orange-400 border px-3" : "hover:text-orange-300")
          }
        >
          <input
            type="radio"
            className="appearance-none"
            value={mode.id}
            checked={currentMode === mode.id}
            onChange={() => changeMode(mode.id)}
          />{" "}
          {mode.name}
        </label>
      ))}
    </div>
  )
}
