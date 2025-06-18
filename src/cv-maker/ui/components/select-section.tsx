import React from "react"
import { RESUME_SECTIONS } from "~/cv/const"

export function SelectSection() {

  const [ selected, changeSelected ] = React.useState("all")

  const changeSection = (
    name: string
  ) => {
    changeSelected(name)
  }

  return (
    <>
      <label 
        className="font-light text-sm ml-auto" id="resumeSection"
      >Current section:</label>
      <select
        id="resumeSection"
        className="self-end select"
        value={selected}
        onChange={e => changeSection(e.target.value)}
      >
        {RESUME_SECTIONS.map((section, id) => (
          <option 
            value={section.id}
            key={id}
          >{section.name}</option>
        ))}
    </select>

    </>
  )

}

