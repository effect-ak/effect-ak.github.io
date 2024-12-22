// src/tg-bot-playground/init.ts
var worker = new Worker("./scripts/web-worker.js", { type: "module" });
worker.addEventListener("message", (msg) => {
  console.log("From worker", msg.data);
});
window.playground = {};
window.playground.worker = worker;
setFavicon("\u{1F916}");
function setFavicon(emoji) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.font = "64px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);
  }
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = canvas.toDataURL("image/png");
  const existingIcons = document.querySelectorAll('link[rel="icon"]');
  existingIcons.forEach((icon) => icon.parentNode?.removeChild(icon));
  document.head.appendChild(link);
}
