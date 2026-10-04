// Checks that every Silver Rate Sources link still responds.
// Usage: npm run check:links
// 403/429/503 often mean bot protection rather than a broken page: open those in a browser.
import { readFileSync } from "node:fs";

const source = readFileSync(
  new URL("../src/content/silver-sources.ts", import.meta.url),
  "utf8",
);
const urls = new Set(
  [...source.matchAll(/url: `?"?(https:\/\/[^"`]+)/g)].map((m) => m[1]),
);
for (const m of source.matchAll(/goldpricez\("([^"]+)"/g)) {
  urls.add(`https://goldpricez.com/silver-rates/${m[1]}`);
}
urls.delete("https://goldpricez.com/silver-rates/${path}");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
let broken = 0;
for (const url of urls) {
  let status;
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA },
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
    });
    status = res.status;
  } catch (error) {
    status = `error: ${error.message}`;
  }
  const blocked = [403, 429, 503].includes(status);
  const ok = status === 200;
  if (!ok && !blocked) broken++;
  console.log(
    `${ok ? "OK     " : blocked ? "CHECK  " : "BROKEN "} ${status}  ${url}`,
  );
}
console.log(
  `\n${urls.size} links, ${broken} broken. "CHECK" = blocked for scripts; verify in a browser.`,
);
process.exitCode = broken > 0 ? 1 : 0;
