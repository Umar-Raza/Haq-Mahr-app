import type { ReceiptModel } from "./model";

// Paper colours are theme-independent (design.md §7) and mirror the hmf-light tokens.
const COLORS = {
  page: "#f7f8f5",
  paper: "#ffffff",
  line: "#dce4de",
  primary: "#176b55",
  primaryTint: "#eef5f2",
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
const PANEL_PAD = 20;
const NOTCH_R = 11;

type Align = "start" | "end" | "center";

type Op =
  | {
      kind: "text";
      text: string;
      y: number;
      font: string;
      color: string;
      align: Align;
      maxWidth?: number;
    }
  | { kind: "dash"; y: number }
  | { kind: "panel"; y: number; h: number };

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

function dashedLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  x2: number,
  y: number,
  width: number,
  dash: [number, number],
) {
  ctx.save();
  ctx.strokeStyle = COLORS.line;
  ctx.lineWidth = width;
  ctx.setLineDash(dash);
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2, y);
  ctx.stroke();
  ctx.restore();
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
  const left = MARGIN + PAD;
  const right = WIDTH - MARGIN - PAD;

  // Amount panel.
  let y = MARGIN + HEADER_H + 28;
  const panelTop = y;
  y += PANEL_PAD + 14;
  const inner = CONTENT_W - 2 * PANEL_PAD;
  for (const line of wrap(ctx, model.amountLabel, font(400, 15), inner)) {
    ops.push({
      kind: "text",
      text: line,
      y,
      font: font(400, 15),
      color: COLORS.muted,
      align: "start",
      maxWidth: inner,
    });
    y += 22;
  }
  let amountSize = 36;
  ctx.font = font(700, amountSize);
  while (amountSize > 20 && ctx.measureText(model.amount).width > inner) {
    amountSize -= 2;
    ctx.font = font(700, amountSize);
  }
  y += amountSize - 10;
  ops.push({
    kind: "text",
    text: model.amount,
    y,
    font: font(700, amountSize),
    color: COLORS.primary,
    align: "start",
    maxWidth: inner,
  });
  y += PANEL_PAD;
  ops.push({ kind: "panel", y: panelTop, h: y - panelTop });

  // Detail rows: label at the start, value at the end; stacked when they do not fit.
  y += 12;
  const labelFont = font(400, 14);
  const valueFont = font(600, 16);
  model.rows.forEach((row, index) => {
    ctx.font = labelFont;
    const labelW = ctx.measureText(row.label).width;
    ctx.font = valueFont;
    const valueW = ctx.measureText(row.value).width;
    y += 26;
    if (labelW + valueW + 24 <= CONTENT_W) {
      ops.push({
        kind: "text",
        text: row.label,
        y,
        font: labelFont,
        color: COLORS.muted,
        align: "start",
      });
      ops.push({
        kind: "text",
        text: row.value,
        y,
        font: valueFont,
        color: COLORS.text,
        align: "end",
      });
    } else {
      ops.push({
        kind: "text",
        text: row.label,
        y,
        font: labelFont,
        color: COLORS.muted,
        align: "start",
      });
      for (const line of wrap(ctx, row.value, valueFont, CONTENT_W)) {
        y += 24;
        ops.push({
          kind: "text",
          text: line,
          y,
          font: valueFont,
          color: COLORS.text,
          align: "start",
        });
      }
    }
    y += 16;
    if (index < model.rows.length - 1) ops.push({ kind: "dash", y });
  });

  // Disclaimer.
  y += 14;
  for (const line of wrap(ctx, model.disclaimer, font(400, 13), CONTENT_W)) {
    y += 20;
    ops.push({
      kind: "text",
      text: line,
      y,
      font: font(400, 13),
      color: COLORS.muted,
      align: "start",
    });
  }

  // Perforation and footer with the site address.
  const tearY = y + 30;
  const footerY = tearY + 40;
  const height = footerY + 26 + MARGIN;

  canvas.width = WIDTH * SCALE;
  canvas.height = Math.ceil(height * SCALE);
  ctx.scale(SCALE, SCALE);
  ctx.direction = model.dir;
  ctx.textBaseline = "alphabetic";

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

  // Panels are backgrounds: paint them before any text that sits on top.
  const ordered = [
    ...ops.filter((op) => op.kind === "panel"),
    ...ops.filter((op) => op.kind !== "panel"),
  ];
  for (const op of ordered) {
    if (op.kind === "panel") {
      ctx.fillStyle = COLORS.primaryTint;
      ctx.beginPath();
      ctx.roundRect(left, op.y, CONTENT_W, op.h, 14);
      ctx.fill();
      continue;
    }
    if (op.kind === "dash") {
      dashedLine(ctx, left, right, op.y, 1, [4, 4]);
      continue;
    }
    const inPanel = op.maxWidth !== undefined;
    const x =
      op.align === "center"
        ? WIDTH / 2
        : op.align === "start"
          ? startX +
            (inPanel ? (model.dir === "rtl" ? -PANEL_PAD : PANEL_PAD) : 0)
          : endX;
    ctx.font = op.font;
    ctx.fillStyle = op.color;
    ctx.textAlign = op.align;
    ctx.fillText(op.text, x, op.y);
  }

  // Tear line with semicircle notches cut into both edges.
  dashedLine(ctx, left, right, tearY, 2, [6, 5]);
  for (const cx of [MARGIN, WIDTH - MARGIN]) {
    ctx.fillStyle = COLORS.page;
    ctx.beginPath();
    ctx.arc(cx, tearY, NOTCH_R, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = COLORS.line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(
      cx,
      tearY,
      NOTCH_R,
      cx === MARGIN ? -Math.PI / 2 : Math.PI / 2,
      cx === MARGIN ? Math.PI / 2 : (3 * Math.PI) / 2,
    );
    ctx.stroke();
  }

  // Footer: accent diamond + domain, centred. The domain is always LTR.
  ctx.font = font(600, 15);
  ctx.direction = "ltr";
  const domainW = ctx.measureText(model.domain).width;
  const diamond = 8;
  const gap = 10;
  const total = diamond + gap + domainW;
  const x0 = WIDTH / 2 - total / 2;
  ctx.save();
  ctx.translate(x0 + diamond / 2, footerY - 5);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = COLORS.accent;
  ctx.fillRect(-diamond / 2, -diamond / 2, diamond, diamond);
  ctx.restore();
  ctx.fillStyle = COLORS.primary;
  ctx.textAlign = "left";
  ctx.fillText(model.domain, x0 + diamond + gap, footerY);

  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))),
      "image/png",
    ),
  );
}
