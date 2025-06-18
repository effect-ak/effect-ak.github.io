// import { Schema as S } from "effect"

// import { ResumeObject } from "~/cv/core/schema";
// import { Resume } from "~/cv/ui/components/theme/stackoverflow"

// export const resumeObjectToHTML =
//   (resume: ResumeObject) => {
//     try {
//       return renderToString(Resume(S.decodeSync(ResumeObject)(resume)))
//     } catch (e) {
//       console.log("render error", e);
//       return ""
//     }
//   }


// export function debounce<T extends (...args: unknown[]) => void>(
//   func: T, wait: number
// ) {
//   let timeout: ReturnType<typeof setTimeout>;
//   return (...args: Parameters<T>) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       func(...args);
//     }, wait);
//   };
// }
