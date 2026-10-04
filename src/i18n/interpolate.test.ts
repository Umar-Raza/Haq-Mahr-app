import { describe, expect, it } from "vitest";
import { interpolate } from "./interpolate";

describe("interpolate", () => {
  it("replaces known placeholders and leaves unknown ones", () => {
    expect(interpolate("{a} × {b} = {c}", { a: "2", b: "3" })).toBe(
      "2 × 3 = {c}",
    );
  });
});
