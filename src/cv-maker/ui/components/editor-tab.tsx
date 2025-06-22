import React from "react"
import { UseAppContext } from "../hooks"

export function EditorTab() {

  const context = UseAppContext()

  React.useEffect(() => {
    const editorInstance = context.editor.bindEditor()
    editorInstance.layout({ height: 100, width: 10 })
    const editor = context.editor.bindEditor()
    editor.getAction('editor.foldLevel3')?.run()
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
      </div>
      <div
        className="w-full h-screen"
        id="code-editor"
      ></div>
    </>
  )

}

function DeleteButton() {

  const context = UseAppContext()

  const deleteResume = () => {
    const result = window.confirm("Delete this resume?")
    if (!result) return
    localStorage.removeItem(context.store.currentResumeName)
  }

  return (
    <button
      hidden={context.store.availableResumes.length == 1}
      className="btn bg-[#DC382D] hover:bg-[#B93224]"
      onClick={() => deleteResume()}
    >Delete</button>
  )
}

function DuplicateButton() {

  const context = UseAppContext()

  const save = () => {
    const name = window.prompt("Enter name of your resume", "");
    if (!name) return;
    context.store.duplicateResume(name)
  }

  return (
    <button
      className="btn bg-sky-500 hover:bg-sky-700 text-sm"
      onClick={() => save()}
    >Duplicate</button>
  )
}
