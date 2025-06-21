import React from "react"
import { Effect, Schema as S } from "effect";
import { ResumeObject } from "~/cv/core/schema";
import { UseAppContext } from "../hooks";
import { ResumeStackoverflow } from "./theme/stackoverflow";

export function ViewTab() {

  const { editor } = UseAppContext()

  const [ currentResumeObject, setResumeObject ] = React.useState<ResumeObject>()

  React.useEffect(() => {
    editor.model.getCode().pipe(
      Effect.andThen(code => S.decodeUnknown(S.parseJson(ResumeObject))(code)),
      Effect.andThen(setResumeObject),
      Effect.runPromise,
    )
  }, [ editor ])

  return (
    <>
      { currentResumeObject && <ResumeStackoverflow resume={currentResumeObject} /> }
    </>
  )

}
