// src/tg-bot-playground/init.ts
var worker = new Worker("./scripts/web-worker.js", { type: "module" });
worker.addEventListener("message", (msg) => {
  console.log("From worker", msg.data);
});
window.playground = {};
window.playground.worker = worker;
