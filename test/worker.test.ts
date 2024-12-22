import { describe, expect, it } from "vitest";
import * as Path from "path";
import { Worker } from "worker_threads";

describe("web worker", () => {

  it.skip("create", async () => {

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