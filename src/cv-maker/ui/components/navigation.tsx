import React from "react"
import { SelectResume } from "./select-resume"
import { SwitchMode } from "./switch-mode"

export function Navigation() {

  return (
    <div 
      className="no-print pb-2 flex gap-2 justify-center items-baseline md:w-3/4"
    >
      <SelectResume/>
      <SwitchMode/>
      <PrintPdfButton/>
    </div>
  )

}

function PrintPdfButton() {

  return (
    <button
      onClick={() => window.print()}
      x-show="mode == 'view'"
      className="no-print hover:cursor-pointer fixed top-8 right-20 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg"
    >
      Print
    </button>
  )

}