import { describe, expect, it } from "vitest";
import { isActivePath, localizedHref, switchLocalePath } from "./routes";

describe("localizedHref", () => {
  it("prefixes the locale", () => {
    expect(localizedHref("ur", "")).toBe("/ur");
    expect(localizedHref("ar", "/guides")).toBe("/ar/guides");
  });
});

describe("switchLocalePath", () => {
  it("replaces the locale segment and keeps the rest", () => {
    expect(switchLocalePath("/en", "ur")).toBe("/ur");
    expect(switchLocalePath("/en/guides/intro", "ar")).toBe("/ar/guides/intro");
  });

  it("adds a locale when the path has none", () => {
    expect(switchLocalePath("/", "ar")).toBe("/ar");
    expect(switchLocalePath("/guides", "ur")).toBe("/ur/guides");
  });
});

describe("isActivePath", () => {
  it("matches the home route exactly", () => {
    expect(isActivePath("/en", "en", "")).toBe(true);
    expect(isActivePath("/en/guides", "en", "")).toBe(false);
  });

  it("matches nested routes under a section", () => {
    expect(isActivePath("/ur/guides", "ur", "/guides")).toBe(true);
    expect(isActivePath("/ur/guides/intro", "ur", "/guides")).toBe(true);
    expect(isActivePath("/ur/guidesx", "ur", "/guides")).toBe(false);
  });
});
