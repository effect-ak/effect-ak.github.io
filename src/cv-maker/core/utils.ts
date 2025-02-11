import { Schema as S } from "effect"
import { render } from 'preact-render-to-string';
import { ResumeObject } from "#/cv-maker/core/schema";
import { Resume } from "#/cv-maker/core/template"

export const resumeObjectToHTML = 
  (resume: ResumeObject) => {
    try {
      return render(Resume(resume))
    } catch (e) {
      console.log("render error", e);
      return ""
    }
  }
    

export const getResumeObject = async () => {
  const resume = await fetch("/john-doe.json").then(_ => _.json());
  console.log({ resume })
  const input = S.decodeUnknownSync(ResumeObject)(resume);
  return input;
}

export const parseJSON = (input: string | undefined) => {
  if (!input) return;
  try {
    return JSON.parse(input);
  } catch (error) {}
}
