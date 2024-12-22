// src/tg-bot-playground/init.ts
window.playground = {};
var version = await fetch("./metadata.json", { cache: "no-cache" }).then((_) => _.json()).then((_) => _["web-worker.js"]);
if (version) {
  const worker = new Worker(`./scripts/web-worker.js?v=${version}`, { type: "module" });
  worker.addEventListener("message", (msg) => {
    console.log("From worker", msg.data);
  });
  window.playground.worker = worker;
} else {
  console.warn("web worker not initiated");
}
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
