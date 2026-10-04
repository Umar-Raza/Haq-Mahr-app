import type { ReceiptModel } from "./model";

// Paper colours are theme-independent (design.md §7) and mirror the hmf-light tokens.
const COLORS = {
  page: "#f7f8f5",
  paper: "#ffffff",
  line: "#dce4de",
  primary: "#176b55",
  onPrimary: "#ffffff",
  accent: "#c6a15b",
  text: "#17231f",
  muted: "#65736c",
};

const WIDTH = 600;
const SCALE = 2;
const MARGIN = 24;
const PAD = 32;
const RADIUS = 20;
const HEADER_H = 92;
const CONTENT_W = WIDTH - 2 * (MARGIN + PAD);

type Op =
  | {
      kind: "text";
      text: string;
      y: number;
      font: string;
      color: string;
      align: "start" | "end";
    }
  | { kind: "rule"; y: number; color: string; width: number };

function wrap(
  ctx: CanvasRenderingContext2D,
  text: string,
  font: string,
  maxWidth: number,
): string[] {
  ctx.font = font;
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function renderReceiptPng(
  model: ReceiptModel,
  fontFamily: string,
): Promise<Blob> {
  const font = (weight: number, size: number) =>
    `${weight} ${size}px ${fontFamily}`;

  await Promise.all(
    [400, 600, 700].map((w) =>
      document.fonts.load(font(w, 16), model.title).catch(() => []),
    ),
  );
  await document.fonts.ready;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  const ops: Op[] = [];
  let y = MARGIN + HEADER_H + 34;

  const text = (
    value: string,
    f: string,
    color: string,
    lineHeight: number,
    align: "start" | "end" = "start",
  ) => {
    for (const line of wrap(ctx, value, f, CONTENT_W)) {
      ops.push({ kind: "text", text: line, y, font: f, color, align });
      y += lineHeight;
    }
  };

  text(model.amountLabel, font(400, 15), COLORS.muted, 26);
  let amountSize = 36;
  ctx.font = font(700, amountSize);
  while (amountSize > 20 && ctx.measureText(model.amount).width > CONTENT_W) {
    amountSize -= 2;
    ctx.font = font(700, amountSize);
  }
  y += amountSize - 18;
  text(model.amount, font(700, amountSize), COLORS.primary, amountSize + 8);

  y += 6;
  ops.push({ kind: "rule", y, color: COLORS.line, width: 1 });
  y += 30;

  for (const row of model.rows) {
    text(row.label, font(400, 13), COLORS.muted, 20);
    text(row.value, font(600, 16), COLORS.text, 24);
    y += 12;
  }

  ops.push({ kind: "rule", y, color: COLORS.line, width: 1 });
  y += 26;
  text(model.disclaimer, font(400, 13), COLORS.muted, 20);
  const height = y + PAD - 10 + MARGIN;

  canvas.width = WIDTH * SCALE;
  canvas.height = Math.ceil(height * SCALE);
  ctx.scale(SCALE, SCALE);
  ctx.direction = model.dir;
  ctx.textBaseline = "alphabetic";

  const left = MARGIN + PAD;
  const right = WIDTH - MARGIN - PAD;
  const startX = model.dir === "rtl" ? right : left;
  const endX = model.dir === "rtl" ? left : right;

  ctx.fillStyle = COLORS.page;
  ctx.fillRect(0, 0, WIDTH, height);

  const paperW = WIDTH - 2 * MARGIN;
  const paperH = height - 2 * MARGIN;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(MARGIN, MARGIN, paperW, paperH, RADIUS);
  ctx.fillStyle = COLORS.paper;
  ctx.fill();
  ctx.clip();
  ctx.fillStyle = COLORS.primary;
  ctx.fillRect(MARGIN, MARGIN, paperW, HEADER_H);
  ctx.restore();

  ctx.strokeStyle = COLORS.line;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(MARGIN + 0.5, MARGIN + 0.5, paperW - 1, paperH - 1, RADIUS);
  ctx.stroke();

  ctx.textAlign = "start";
  ctx.fillStyle = COLORS.onPrimary;
  ctx.font = font(600, 14);
  ctx.fillText(model.brand, startX, MARGIN + 34);
  ctx.font = font(700, 22);
  ctx.fillText(model.title, startX, MARGIN + 66);

  ctx.fillStyle = COLORS.accent;
  const accentW = 56;
  ctx.fillRect(
    model.dir === "rtl" ? right - accentW : left,
    MARGIN + HEADER_H,
    accentW,
    3,
  );

  for (const op of ops) {
    if (op.kind === "rule") {
      ctx.fillStyle = op.color;
      ctx.fillRect(left, op.y, right - left, op.width);
      continue;
    }
    ctx.font = op.font;
    ctx.fillStyle = op.color;
    ctx.textAlign = op.align;
    ctx.fillText(op.text, op.align === "start" ? startX : endX, op.y);
  }

  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))),
      "image/png",
    ),
  );
}
