import React from "react"

export function ViewTab() {

  const a = 1
  React.useEffect(() => {

  })

  return (
    <div
      className="self-center sm:w-3/4"
      x-show="mode == 'view'"
    >
      <div
        x-html="resumeHtml"
      ></div>
    </div>
  )

}