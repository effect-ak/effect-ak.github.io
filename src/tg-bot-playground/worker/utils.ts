const parseJson = (input: string) => {
  try {
    return { parsed: JSON.parse(input) }
  } catch { return undefined }
}

export const deserialize = (input: string) => {

  const result = [] as [string, unknown][];

  const fields = parseJson(input);

  if (typeof fields?.parsed != "object") return;

  for (const [k, v] of Object.entries(fields.parsed)) {
    try {
      const f = new Function(`return ${v}`)();
      result.push([k, f]);
    } catch (e) {
      console.warn("deserialize field error", { k, v, e });
    }

  }

  return Object.fromEntries(result);
}
