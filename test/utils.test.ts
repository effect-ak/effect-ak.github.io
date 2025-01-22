import { describe, expect, it } from "vitest";

import { deserialize } from "#/tg-bot-playground/worker/utils"

describe("utils", () => {

  it("is func", () => {

    expect(deserialize).toBeDefined();

  })
})