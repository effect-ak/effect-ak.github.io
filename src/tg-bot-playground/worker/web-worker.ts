import { makeWorkerHandler } from "./handler.js";

const handler =
  makeWorkerHandler(
    _ => self.postMessage(_)
  );

self.onmessage =
  (msg: MessageEvent) =>
    handler(msg.data)
