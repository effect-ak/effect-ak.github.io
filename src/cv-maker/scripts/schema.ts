import { JSONSchema } from "effect"
import { writeFileSync } from "fs"
import { ResumeObject } from "../core/schema"

const s = 
  JSONSchema.make(ResumeObject);

const url = new URL("../static/resume-schema.json", import.meta.url)

writeFileSync(url, JSON.stringify(s, undefined, 2))
