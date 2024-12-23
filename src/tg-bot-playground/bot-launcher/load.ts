export async function loadWorker() {
  const version: string = await (
    fetch("./metadata.json", { cache: "no-cache" }).then(_ => _.json()).then(_ => _["web-worker.js"])
  );

  if (!version) {
    console.warn("Cannot get version from metadata");
    return;
  };

  const worker = new Worker(`./scripts/worker/web-worker.js?v=${version}`, { type: "module" });
  console.log("web worker has been loaded");
  return worker;
}