// @vitest-environment edge-runtime

import { describe, expect, it } from "vitest";

import { serialize, deserialize, getDefaultExport } from "#tg-bot-playground/utils.js"
import assert from "assert";

describe("utils", () => {

  it("serialize and deserialize", () => {

    const obj = {
      a: (arg: number) => { return arg }
    };

    const ser = serialize(obj);

    assert(ser);

    const actual = deserialize(ser) as typeof obj;
    expect(actual.a(123)).toEqual(123)

  });

  it("get default", async () => {

    const obj = `
      const a = 3 + 7;

      export default {
        b: a
      }
    `;

    const actual = await getDefaultExport<any>(obj);

    expect(actual?.default.b).toEqual(10)

  })

})