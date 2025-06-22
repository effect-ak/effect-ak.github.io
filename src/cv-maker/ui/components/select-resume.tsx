import React from "react"
import { UseAppContext, UseAppState } from "../hooks";

export function SelectResume() {

  const { currentResume, availableResumes } = UseAppState()
  const { store } = UseAppContext()

  return (
    <>
      <label className="font-light text-sm" htmlFor="resumeSelect">
        Current resume:
      </label>
      <select
        id="resumeSelect"
        className="self-start select"
        value={currentResume}
        onChange={(e) => {
          store.selectResume(e.target.value)
        }}
      >
        {availableResumes.map(resume => (
          <option value={resume.id} key={resume.id}>
            {resume.name}
          </option>
        ))}
      </select>
    </>
  );
}
