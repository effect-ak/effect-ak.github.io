import React from "react"
import { DuplicateButton } from "./duplicate-button";
import { DeleteButton } from "./delete-button";
import { SelectSection } from "./select-section";
import { UseAppContext } from "../hooks";

export function EditorTab() {

  const context = UseAppContext()

  React.useEffect(() => {
    const editorInstance = context.editor.bindEditor()
    editorInstance.layout({ height: 100, width: 10 })
    return () => {
      console.log('editor umnounting')
      editorInstance.dispose()
    }
  }, [ context ])

  return (
    <>
      <div
        className="flex gap-2 pb-2 items-end"
      >
        <DuplicateButton />
        <DeleteButton />
        <SelectSection />
      </div>
      <div
        className="w-full h-screen"
        id="code-editor"
      ></div>
    </>
  )

}

