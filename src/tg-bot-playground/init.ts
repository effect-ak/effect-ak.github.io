window.playground = {};

console.log("initiating...")
const version: string = await (
  fetch("./metadata.json", { cache: "no-cache" }).then(_ => _.json()).then(_ => _["web-worker.js"])
);

if (version) {
  const worker = new Worker(`./scripts/web-worker.js?v=${version}`, { type: "module" });
  window.playground.worker = worker;
  console.log("web worker has been loaded");
  document.dispatchEvent(new Event('playgroundInitialized'));
} else {
  console.warn("web worker not initiated")
}

setFavicon("🤖");

function setFavicon(emoji: string): void {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

  if (ctx) {
    ctx.font = '64px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);
  }

  const link: HTMLLinkElement = document.createElement('link');
  link.rel = 'icon';
  link.href = canvas.toDataURL('image/png');
  
  const existingIcons: NodeListOf<HTMLLinkElement> = document.querySelectorAll('link[rel="icon"]');
  existingIcons.forEach(icon => icon.parentNode?.removeChild(icon));

  document.head.appendChild(link);
}
