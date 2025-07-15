import { readFile, writeFile, copyFile, mkdir } from "fs/promises"
import YAML from "js-yaml"
import type { OpenAPIV3_1,  } from "openapi-types"
import { JSONSchema, String } from "effect"
import { writeFileSync } from "fs"
import { ResumeObject } from "~/cv/core/schema"

await createTelegramTypes()
// await copyTgApi()
// await createResumeJsonSchema()

async function createTelegramTypes() {
  const file = await readFile("../tg-bot-client/openapi/openapi.yaml")

  const structure = YAML.load(file.toString('utf8')) as OpenAPIV3_1.Document
  const makeKebabName = (name: string) => String.snakeToKebab(String.camelToSnake(name))
  await mkdir('./tmp/methods', { recursive: true })
  const names = Object.keys(structure.paths ?? {}).map(path => makeKebabName(path.slice(1)))
  await writeFile('./tmp/methods.json', JSON.stringify(names, undefined, 2))
  for (const p of Object.entries(structure.paths ?? {})) {
    const method = p[1]?.post
    if (!method) {
      console.warn('method is undefined', method)
      continue
    }
    const originName = p[0].slice(1)
    const kebabName = makeKebabName(originName)
    const requestBody = method.requestBody as OpenAPIV3_1.RequestBodyObject
    const input = requestBody.content['application/json'].schema

    await writeFile(`./tmp/methods/${kebabName}.json`, JSON.stringify({
      name: kebabName,
      originName,
      description: method.description,
      input: input ?? null,
    }, undefined, 2))
  }

}

async function copyTgApi() {
  await copyFile("../tg-bot-client/openapi/api.json", `./tmp/tg-api.json`)
}

async function createResumeJsonSchema() {
  const s =
    JSONSchema.make(ResumeObject);

  const url = new URL("public/resume-schema.json", import.meta.url)

  writeFileSync(url, JSON.stringify(s, undefined, 2))
}
