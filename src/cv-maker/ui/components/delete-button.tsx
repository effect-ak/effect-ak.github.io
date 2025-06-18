import React from "react"

export function DeleteButton() {

  const deleteResume = () => {
    // localStorage.removeItem(state.currentResume);
    // loadStoredResume();
    // const nextResume = state.availableResumes.at(-1);
    // if (nextResume) {
    //   state.currentResume = nextResume.id;
    // }
    // selectResume();
  }

  return (
    <button
      className="btn bg-[#DC382D] hover:bg-[#B93224]"
      onClick={() => { }}
      // hidden={true}
      x-show="availableResumes.length > 1"
    >Delete</button>
  )
}
