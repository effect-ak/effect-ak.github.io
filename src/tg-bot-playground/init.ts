const worker = new Worker('./scripts/web-worker.js', { type: "module" });

worker.addEventListener("message", msg => {
  console.log("From worker", msg.data);
});

window.playground = {};
window.playground.worker = worker;

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
