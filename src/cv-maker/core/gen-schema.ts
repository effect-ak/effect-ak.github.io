import { JSONSchema } from "effect"
import { writeFileSync } from "fs"
import { ResumeObject } from "./schema"

const s = 
  JSONSchema.make(ResumeObject);

const url = new URL("../resume-schema.json", import.meta.url)

writeFileSync(url, JSON.stringify(s, undefined, 2))
