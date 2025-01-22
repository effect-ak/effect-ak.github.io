import { makeWorkerHandler } from "./handler";

const handler =
  makeWorkerHandler(
    _ => self.postMessage(_)
  );

self.onmessage =
  (msg: MessageEvent) =>
    handler(msg.data)
