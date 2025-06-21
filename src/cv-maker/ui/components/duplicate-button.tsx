import React from "react"
import { UseAppContext } from "../hooks"

export function DuplicateButton() {

  const context = UseAppContext()

  const save = () => {
    // const name = window.prompt("Enter name of your resume", "simple");
    // if (!name) return;
    // localStorage.setItem(name, JSON.stringify(state.resumeObject));
    // state.availableResumes.push({ id: name, name });
    // state.currentResume = name;
    // selectResume();
    // prepareEditor();
    // const editor = context.editor.bindEditor()
    // console.log(editor.getSupportedActions())
    const code = context.editor.model.model.setValue(
      JSON.stringify(context.store.exampleResume, null, 2)
    )
    console.log('code', code)
  }

  return (
    <button
      className="btn bg-sky-500 hover:bg-sky-700 text-sm"
      onClick={() => save()}
    >Duplicate</button>
  )
}
