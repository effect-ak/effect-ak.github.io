import React from "react"
import { SelectResume } from "./select-resume"
import { SwitchMode } from "./switch-mode"
import { UseAppState } from "../hooks"

export function Navigation() {

  return (
    <div 
      className="no-print pb-2 flex gap-2 justify-center items-baseline"
    >
      <SelectResume/>
      <SwitchMode/>
      <PrintPdfButton/>
    </div>
  )

}

function PrintPdfButton() {

  const { currentMode } = UseAppState()

  return (
    <button
      onClick={() => window.print()}
      hidden={currentMode != "view"}
      className="no-print hover:cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
    >
      Print
    </button>
  )

}
