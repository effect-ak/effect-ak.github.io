import React from "react"
import { UseAppState } from "../hooks";

export function SelectResume() {

  const { currentResume, availableResumes } = UseAppState()

  return (
    <>
      <label className="font-light text-sm" htmlFor="resumeSelect">
        Current resume:
      </label>
      <select
        id="resumeSelect"
        className="self-start select"
        value={currentResume}
        onChange={(e) => {}}
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

// function selectResume() {
//   const resumeJson = localStorage.getItem(state.currentResume);
//   if (!resumeJson) {
//     console.warn("No resume to load");
//     return
//   }
//   const resume = parseJSON(resumeJson, true);
//   if (!resume) {
//     console.warn("Invalid json of resume");
//     return;
//   };
//   state.resumeObject = resume;
//   state.resumeHtml = resumeObjectToHTML(resume);
//   setUrlParam("resume", state.currentResume);
// }
