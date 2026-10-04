// Regenerates src/lib/calc/iso4217.ts from the official ISO 4217 List One (SIX Group).
// Usage: npm run gen:currencies
import { writeFileSync } from "node:fs";

const SOURCE =
  "https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xml";
const OUT = "src/lib/calc/iso4217.ts";

const response = await fetch(SOURCE);
if (!response.ok) throw new Error(`Download failed: ${response.status}`);
const xml = await response.text();
const published = /Pblshd="([^"]+)"/.exec(xml)?.[1];

const units = new Map();
for (const entry of xml.matchAll(/<CcyNtry>([\s\S]*?)<\/CcyNtry>/g)) {
  const body = entry[1];
  const code = /<Ccy>([A-Z]{3})<\/Ccy>/.exec(body)?.[1];
  const minor = /<CcyMnrUnts>([^<]+)<\/CcyMnrUnts>/.exec(body)?.[1];
  // Skip fund codes and entries without numeric minor units (metals, SDR, test codes).
  if (!code || /IsFund="true"/.test(body) || !/^\d+$/.test(minor ?? "")) {
    continue;
  }
  const n = Number(minor);
  if (units.has(code) && units.get(code) !== n) {
    throw new Error(`Conflicting minor units for ${code}`);
  }
  units.set(code, n);
}

const codes = [...units.keys()].sort();
writeFileSync(
  OUT,
  `// Generated from the ISO 4217 List One (SIX Group, published ${published}).
// Active currencies only: fund codes and entries without numeric minor units (metals, SDR, test codes) are excluded.
// Source: ${SOURCE}
export const ISO_4217_PUBLISHED = "${published}";

export const iso4217MinorUnits = {
${codes.map((c) => `  ${c}: ${units.get(c)},`).join("\n")}
} as const;
`,
);
console.log(
  `Wrote ${codes.length} currencies (published ${published}) to ${OUT}`,
);
