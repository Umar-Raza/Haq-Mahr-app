export const en = {
  meta: {
    siteName: "Haq Mahr Finder",
    homeTitle: "Haq Mahr Finder — Haq Mahr Calculator",
    homeDescription:
      "Estimate the value of the Haq Mahr silver-weight reference using a silver rate you enter yourself.",
  },
  a11y: {
    skipToContent: "Skip to main content",
    loading: "Loading…",
  },
  nav: {
    label: "Main",
    calculator: "Calculator",
    guides: "Guides",
    silverRateSources: "Silver Rate Sources",
    about: "About",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  theme: {
    darkMode: "Dark mode",
  },
  footer: {
    disclaimer:
      "Results are informational estimates only. They are not a fatwa, a religious ruling, or legal advice.",
    rights: "Haq Mahr Finder",
  },
  methodology: {
    heading: "How the calculation works",
    referenceLabel: "Reference weight",
    reference:
      "10 Dirhams of silver, expressed as 2 Tola 7.5 Masha: {masha} Masha = {tola} Tola = {grams} g.",
    formulaLabel: "Formula",
    formulaTola: "Rate per Tola × {tola}",
    formulaGram: "Rate per Gram × {gramsExact}",
    units:
      "1 Tola = 12 Masha = {gramsPerTola} g (the tola value used for the 30.618 g reference).",
    roundingLabel: "Rounding",
    rounding:
      "The rate is used exactly as you enter it. Only the final amount is rounded, half away from zero, to the smallest unit of the selected currency (for example 2 decimals for PKR and 3 for KWD). No currency conversion is performed.",
    differencesLabel: "Differences between sources",
    differences:
      "This calculator uses 30.618 g, the figure cited in a Hanafi fatwa. Scholars give slightly different gram values for one Dirham, so other published figures exist; for example, another fatwa gives a range of about 29.7–31 g. If you need a figure for your own situation, please consult a qualified scholar.",
    sourcesLabel: "Sources (reviewed {date})",
    newTab: "opens in a new tab",
    disclaimer:
      "This is an informational estimate, not a fatwa, a religious ruling, or legal advice.",
  },
  home: {
    heading: "Haq Mahr Finder",
    intro:
      "An informational Haq Mahr calculator is being built. It will use a silver rate that you enter manually.",
  },
};

export type Dictionary = typeof en;
