// import { writeFileSync } from "node:fs";
// import { render } from 'preact-render-to-string';
// import { Resume } from "#/core/template"
// import prettier from "prettier"
// import kondaurovResumeObject from "../static/kondaurov-resume.json"

// export const renderResume = async (): Promise<string> => {
//   const html = render(Resume(kondaurovResumeObject as any));
//   return prettier.format(html, { parser: "html" });
// }

// const html = await renderResume();

// writeFileSync("./resume.html", html);
