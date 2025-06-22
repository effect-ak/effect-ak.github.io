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
      <PrintPdfButton/>
      <SwitchMode/>
    </div>
  )

}

function PrintPdfButton() {

  const { currentMode } = UseAppState()

  return (
    <button
      onClick={() => window.print()}
      hidden={currentMode != "view"}
      className="no-print hover:cursor-pointer bg-blue-400 hover:bg-blue-500 text-white py-1.5 px-2.5 rounded-full"
    >
      <i className="fa fa-file-pdf text-lg" aria-hidden="true"> </i>
      Print
    </button>
  )

}
