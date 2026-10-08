export const en = {
  meta: {
    siteName: "Haq Mahr Finder",
    homeTitle: "Haq Mahr Finder — Haq Mahr Calculator",
    homeDescription:
      "Estimate the value of the Haq Mahr silver-weight reference using a silver rate you enter yourself.",
    historyTitle: "Saved calculations — Haq Mahr Finder",
    historyDescription:
      "Your saved Haq Mahr calculations, stored only in this browser. Reopen, delete, or clear them at any time.",
    guidesTitle: "Guides — Haq Mahr Finder",
    guidesDescription:
      "Short, sourced guides on the minimum Haq Mahr, Tola and gram conversions, checking silver rates, and using the calculator.",
    sourcesTitle: "Silver Rate Sources by Country — Haq Mahr Finder",
    sourcesDescription:
      "Curated links to websites that publish silver prices for Pakistan, India, the USA, the UK, Canada, Saudi Arabia, the UAE and more, with unit and currency notes.",
  },
  a11y: {
    skipToContent: "Skip to main content",
    loading: "Loading…",
  },
  nav: {
    label: "Main",
    calculator: "Calculator",
    history: "History",
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
    links: {
      label: "Site information",
      guides: "Guides",
      about: "About",
      disclaimer: "Disclaimer",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      contact: "Contact",
    },
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
    issuedLabel: "Generated",
    disclaimer:
      "Informational estimate based on a silver rate entered by the user. Not a fatwa, a religious ruling, or legal advice. Verify the current silver rate before relying on this figure.",
  },
  actions: {
    heading: "Save or share",
    download: "Download",
    share: "Share",
    whatsapp: "WhatsApp",
    copy: "Copy",
    newTab: "opens in a new tab",
    downloaded: "Receipt image downloaded.",
    imageFailed: "The receipt image could not be created.",
    copied: "Result copied.",
    copyMenu: "Choose what to copy",
    copyFormatted: "Formatted",
    copyFormattedHint: "Every detail on separate lines",
    copyShort: "Short",
    copyShortHint: "One line: amount and rate",
    copiedShort: "Short result copied.",
    copyFailed: "Could not copy automatically. Please copy the text manually.",
    shareFallback:
      "Sharing is not available on this device, so the result was copied instead.",
    save: "Save to history",
    saved: "Saved in history",
    savedToast: "Saved to history in this browser.",
    saveFailed:
      "This browser is not allowing storage, so the calculation could not be saved.",
  },
  history: {
    heading: "Saved calculations",
    intro:
      "Calculations you save with “Save to history” appear here, newest first.",
    storageTitle: "Stored only in this browser",
    storageNote:
      "History is kept in this browser's local storage on this device. It is not sent to any server and is not synced to other devices. Clearing site data, using a private window, or the browser's own cleanup can remove it.",
    privacyNote:
      "Only the rate, currency, unit, result and date are saved. No names or personal details.",
    limitNote: "Up to {limit} recent calculations are kept.",
    unavailable:
      "This browser is blocking local storage (for example in some private modes), so history cannot be shown or saved here.",
    corrupted:
      "Some saved history could not be read and was skipped. Saving a new calculation will replace the unreadable data.",
    emptyTitle: "No saved calculations yet",
    emptyBody:
      "Enter a silver rate in the calculator, then choose “Save to history”.",
    goToCalculator: "Go to calculator",
    count: "{count} saved",
    savedOn: "Saved {date}",
    olderMethod:
      "Saved with method version {version}. Open it to recalculate with the current method.",
    open: "Open in calculator",
    deleteOne: "Delete",
    deleteLabel: "Delete the calculation saved {date}",
    deleted: "Calculation deleted.",
    undo: "Undo",
    clearAll: "Clear all",
    clearTitle: "Clear all saved calculations?",
    clearBody:
      "This removes every saved calculation from this browser. It cannot be undone.",
    clearConfirm: "Clear all",
    cancel: "Cancel",
    cleared: "History cleared.",
    writeFailed: "The browser did not allow the change to be saved.",
  },
  content: {
    breadcrumbLabel: "Breadcrumb",
    home: "Home",
    updated: "Last updated {date}",
    onThisPage: "On this page",
    sources: "Sources",
    sourcesNote: "Each source was opened and checked on {date}.",
    sourceNotOpened:
      "Provided by the site owner; we could not open this page automatically, so it is not checked by us.",
    newTab: "opens in a new tab",
    reviewTitle: "Review status",
    reviewReligious:
      "This guide only summarises the sources listed here. It has not yet been reviewed by a qualified scholar, so please treat it as general information.",
    religiousBadge: "Religious topic",
    related: "Related guides",
    readGuide: "Read guide",
    guidesHeading: "Guides",
    guidesIntro:
      "Short, sourced guides on Haq Mahr, silver weights and using the calculator.",
    ctaTitle: "Ready to calculate?",
    ctaBody:
      "Enter today's silver rate to see the value of 10 Dirhams of silver.",
    ctaButton: "Open the calculator",
  },
  silverSources: {
    heading: "Silver Rate Sources",
    intro:
      "Websites where you can check the silver price before using the calculator, grouped by country. Each link was opened and checked by us; we do not control these sites.",
    notesTitle: "Before you copy a rate",
    kindsTitle: "Types of source",
    jumpTo: "Jump to a country",
    currency: "Currency",
    units: "Units",
    reviewed: "Link checked {date}",
    newTab: "opens in a new tab",
    guideLink: "How to check a silver rate",
    calculatorLink: "Open the calculator",
    suggest:
      "Know a reliable source for your country? Suggestions are welcome.",
    notes: [
      "Check the unit (tola, 10 grams, gram, kilogram or ounce) and convert it if needed.",
      "Check the purity (for example 999 fine silver) and whether it is a buying or selling price.",
      "Use a rate from the day you need the figure. Prices change during the day.",
      "Listing a site is not an endorsement, and we cannot guarantee its prices.",
    ],
    kinds: {
      localMarket: {
        label: "Local market",
        help: "Rates from the country's own bullion or jewellery market, usually per tola or per 10 grams.",
      },
      benchmark: {
        label: "Official benchmark",
        help: "A reference price set by an industry body.",
      },
      dealer: {
        label: "Bullion dealer",
        help: "A dealer's live international spot price.",
      },
      spotConverter: {
        label: "Spot converter",
        help: "The international spot price converted into local currency. It can differ from local market rates.",
      },
    },
    unitNames: {
      tola: "Tola",
      tenGrams: "10 grams",
      gram: "Gram",
      kg: "Kilogram",
      ounce: "Ounce",
    },
  },
  faq: {
    heading: "Frequently asked questions",
    guidesLink: "Read all guides",
    sourcesLink: "Silver rate sources by country",
    items: [
      {
        question: "Is the result a fatwa?",
        answer:
          "No. It is an informational estimate based on the silver rate you enter. It is not a fatwa, a religious ruling, or legal advice. For a decision about your own marriage, please consult a qualified scholar.",
      },
      {
        question: "Which weight does the calculator use?",
        answer:
          "It uses 10 Dirhams of silver, expressed as 2 Tola 7.5 Masha, which is 30.618 g, with 1 Tola = 11.664 g. Published gram figures for 10 Dirhams vary slightly between sources, and the guides explain this.",
      },
      {
        question: "Does it show today's silver rate?",
        answer:
          "No. You enter the rate yourself, so the result is only as current as that rate. The Silver Rate Sources page lists websites by country where you can check it.",
      },
      {
        question: "Should I enter the rate per Tola or per gram?",
        answer:
          "Use whichever your source gives. Choose Per Tola or Per Gram to match it; both give the same result. If your source uses another unit, such as kilograms or ounces, convert it first.",
      },
      {
        question: "Why is the amount rounded up?",
        answer:
          "The final amount is always rounded up to the smallest unit of the currency (for example 0.01 for PKR), so the estimate never falls below the exact value. The receipt shows the rate and the reference weight it uses.",
      },
      {
        question: "Does it convert between currencies?",
        answer:
          "No. The currency is only a label. Enter the rate in the currency you want the result in.",
      },
      {
        question: "Is my data saved or sent anywhere?",
        answer:
          "Calculations happen in your browser, and the rate you type is not sent to a server. A calculation is kept only if you choose Save to history, and it stays in your own browser.",
      },
      {
        question: "What if my scholar uses a different weight?",
        answer:
          "Scholars and sources give slightly different gram values for one Dirham. If you have been given a different figure, follow your scholar's guidance. The calculator is a convenience, not a replacement.",
      },
    ],
  },
};

export type Dictionary = typeof en;
