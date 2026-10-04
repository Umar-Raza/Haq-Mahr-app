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
      "The rate is used exactly as you enter it. The final amount is always rounded up to the smallest unit of the selected currency (for example 2 decimals for PKR and 3 for KWD), so the estimate never falls below the exact value. No currency conversion is performed.",
    differencesLabel: "Differences between sources",
    differences:
      "This calculator uses 30.618 g, the figure cited in a Hanafi fatwa. Scholars give slightly different gram values for one Dirham, so other published figures exist; for example, another fatwa gives a range of about 29.7–31 g. If you need a figure for your own situation, please consult a qualified scholar.",
    sourcesLabel: "Sources (reviewed {date})",
    newTab: "opens in a new tab",
    disclaimer:
      "This is an informational estimate, not a fatwa, a religious ruling, or legal advice.",
  },
  home: {
    heading: "Haq Mahr calculator",
    intro:
      "Estimate the value of 10 Dirhams of silver (2 Tola 7.5 Masha = 30.618 g) using a silver rate you enter yourself.",
  },
  calculator: {
    formHeading: "Enter the silver rate",
    rateLabel: "Silver rate",
    rateHelpTola:
      "The current price of 1 Tola of silver, as shown by your source.",
    rateHelpGram:
      "The current price of 1 gram of silver, as shown by your source.",
    basisLabel: "Rate basis",
    basisTola: "Per Tola",
    basisGram: "Per Gram",
    currencyLabel: "Currency",
    currencyCommon: "Common currencies",
    currencyAll: "All currencies",
    currencySearch: "Search by code or name",
    currencyNoResults: "No matching currency.",
    currencyHelp:
      "Used as a label only. Amounts are never converted between currencies.",
    unitLabel: "Show reference weight in",
    unitTola: "Tola",
    unitMasha: "Masha",
    unitGram: "Gram",
    howToHeading: "How to use",
    howToSteps: [
      "Find today's silver rate from a trusted source.",
      "Choose Per Tola or Per Gram, then enter the rate.",
      "Pick the currency the rate is in.",
      "Download, share, or copy the receipt.",
    ],
    reset: "Clear",
    resultHeading: "Result",
    emptyResult: "Enter a silver rate to see the estimate.",
    errors: {
      empty: "Enter the silver rate.",
      invalidFormat:
        "Enter a number such as 2450 or 2,450.50. Use a dot for decimals.",
      negative: "The rate cannot be negative.",
      zero: "The rate must be greater than zero.",
      tooManyDecimals: "Use at most 4 decimal places.",
      tooLarge: "The rate is too large. The maximum is 1,000,000,000.",
      unsupportedBasis: "Choose a rate basis.",
      unsupportedCurrency: "Choose a currency from the list.",
    },
  },
  receipt: {
    title: "Haq Mahr estimate",
    amountLabel: "Estimated value",
    rateLabel: "Silver rate",
    ratePerTola: "{rate} per Tola",
    ratePerGram: "{rate} per gram",
    weightLabel: "Reference weight",
    weightTola: "{value} Tola",
    weightMasha: "{value} Masha",
    weightGram: "{value} g",
    calculationLabel: "Calculation",
    methodLabel: "Method",
    method: "10 Dirhams = 2 Tola 7.5 Masha = 30.618 g · v{version}",
    issuedLabel: "Generated",
    disclaimer:
      "Informational estimate based on a silver rate entered by the user. Not a fatwa, a religious ruling, or legal advice. Verify the current silver rate before relying on this figure.",
  },
  actions: {
    heading: "Save or share",
    download: "Download PNG",
    share: "Share",
    whatsapp: "WhatsApp",
    copy: "Copy result",
    newTab: "opens in a new tab",
    downloaded: "Receipt image downloaded.",
    imageFailed: "The receipt image could not be created.",
    copied: "Result copied.",
    copyFailed: "Could not copy automatically. Please copy the text manually.",
    shareFallback:
      "Sharing is not available on this device, so the result was copied instead.",
  },
};

export type Dictionary = typeof en;
