import { describe, expect, it } from "vitest";
import { DARK_THEME, LIGHT_THEME, resolveTheme } from "./theme";

describe("resolveTheme", () => {
  it("uses a valid stored preference over the OS preference", () => {
    expect(resolveTheme(LIGHT_THEME, true)).toBe(LIGHT_THEME);
    expect(resolveTheme(DARK_THEME, false)).toBe(DARK_THEME);
  });

  it("falls back to the OS preference when nothing valid is stored", () => {
    expect(resolveTheme(null, true)).toBe(DARK_THEME);
    expect(resolveTheme(null, false)).toBe(LIGHT_THEME);
    expect(resolveTheme("garbage", true)).toBe(DARK_THEME);
  });
});
