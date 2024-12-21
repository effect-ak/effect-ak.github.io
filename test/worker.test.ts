import { describe, expect, it } from "vitest";
import * as Path from "path";
import { Worker } from "worker_threads";
import assert from "assert";
import { existsSync } from "fs";

describe("web worker", () => {

  it("create", async () => {

    const path = 
      Path.join(__dirname, "..", "docs", "telegram-bot-playground", "scripts", "web-workers.js");

    // assert(existsSync(path))

    const w = new Worker(path);

    w.postMessage("hey");

    w.on("message", (msg) => {
      console.log("got a message", msg)
    });

    const a = 1;

    expect(w).toBeDefined();

    await new Promise(resolve => setTimeout(() => resolve(1), 2000))

  })

})