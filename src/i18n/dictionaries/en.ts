export const en = {
  meta: {
    siteName: "Haq Mahr Finder",
    homeTitle: "Haq Mahr Finder — Haq Mahr Calculator",
    homeDescription: "Work out the Haq Mahr from the silver rate you enter.",
    historyTitle: "Saved calculations — Haq Mahr Finder",
    historyDescription:
      "Your saved Haq Mahr calculations, kept only in this browser. Open, delete or clear them whenever you like.",
    guidesTitle: "Guides — Haq Mahr Finder",
    guidesDescription:
      "Short guides, with sources, on the minimum Haq Mahr, converting Tola and grams, checking silver rates and using the calculator.",
    sourcesTitle: "Silver Rate Sources by Country — Haq Mahr Finder",
    sourcesDescription:
      "Links to websites that publish silver prices for Pakistan, India, the USA, the UK, Canada, Saudi Arabia, the UAE and more, with notes on units and currency.",
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
      "Results are for information only. They are not a fatwa, a religious ruling or legal advice.",
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
    intro: "Find the Shar'i Haq Mahr from the silver rate you enter.",
  },
  calculator: {
    formHeading: "Enter the silver rate",
    rateLabel: "Silver rate",
    rateHelpTola: "Today's price for 1 Tola of silver, as given by your source.",
    rateHelpGram: "Today's price for 1 gram of silver, as given by your source.",
    basisLabel: "Rate is",
    basisTola: "Per Tola",
    basisGram: "Per Gram",
    currencyLabel: "Currency",
    currencyCommon: "Common currencies",
    currencyAll: "All currencies",
    currencySearch: "Search by code or name",
    currencyNoResults: "No currency found.",
    currencyHelp:
      "The currency is just a label. Amounts are never converted.",
    unitLabel: "Show weight in",
    unitTola: "Tola",
    unitMasha: "Masha",
    unitGram: "Gram",
    howToHeading: "How to use",
    howToSteps: [
      "Get today's silver rate from a source you trust.",
      "Choose Per Tola or Per Gram, then enter the rate.",
      "Pick the currency of the rate.",
      "Download, share or copy the receipt.",
    ],
    reset: "Clear",
    resultHeading: "Result",
    emptyResult: "Enter a silver rate to see the Haq Mahr.",
    errors: {
      empty: "Enter the silver rate.",
      invalidFormat:
        "Enter a number such as 2450 or 2,450.50. Use a dot for decimals.",
      negative: "The rate can't be negative.",
      zero: "The rate must be more than zero.",
      tooManyDecimals: "Use no more than 4 digits after the decimal point.",
      tooLarge: "That rate is too high. The maximum is 1,000,000,000.",
      unsupportedBasis: "Choose Per Tola or Per Gram.",
      unsupportedCurrency: "Choose a currency from the list.",
    },
  },
  receipt: {
    title: "Haq Mahr",
    amountLabel: "Amount",
    rateLabel: "Silver rate",
    ratePerTola: "{rate} per Tola",
    ratePerGram: "{rate} per gram",
    weightLabel: "Reference weight",
    weightTola: "{value} Tola",
    weightMasha: "{value} Masha",
    weightGram: "{value} g",
    issuedLabel: "Date",
    disclaimer:
      "Calculated from the silver rate you entered, for information only. This is not a fatwa, a religious ruling or legal advice. Please check the current silver rate before you rely on it.",
  },
  actions: {
    heading: "Save or share",
    download: "Download",
    share: "Share",
    whatsapp: "WhatsApp",
    copy: "Copy",
    newTab: "opens in a new tab",
    downloaded: "Receipt image downloaded.",
    imageFailed: "Couldn't create the receipt image.",
    copied: "Result copied.",
    copyMenu: "What would you like to copy?",
    copyFormatted: "Formatted",
    copyFormattedHint: "Each detail on its own line",
    copyShort: "Short",
    copyShortHint: "One line: amount and rate",
    copiedShort: "Short version copied.",
    copyFailed: "Couldn't copy automatically. Please copy the text yourself.",
    shareFallback:
      "Sharing isn't available on this device, so the result was copied instead.",
    save: "Save to history",
    saved: "Saved in history",
    savedToast: "Saved to history in this browser.",
    saveFailed:
      "This browser isn't allowing storage, so the calculation wasn't saved.",
  },
  history: {
    heading: "Saved calculations",
    intro:
      "Calculations you save with “Save to history” show up here, newest first.",
    storageTitle: "Kept only in this browser",
    storageNote:
      "History is kept in this browser's local storage on this device. It isn't sent to any server and doesn't sync to your other devices. It can be lost if you clear site data, use a private window, or the browser deletes it on its own.",
    privacyNote:
      "Only the rate, currency, unit, result and date are saved. No names or personal details.",
    limitNote: "Up to {limit} recent calculations are kept.",
    unavailable:
      "This browser is blocking local storage (some private modes do this), so history can't be shown or saved here.",
    corrupted:
      "Part of your saved history couldn't be read, so it was skipped. Saving a new calculation will replace it.",
    emptyTitle: "No saved calculations yet",
    emptyBody:
      "Enter a silver rate in the calculator, then choose “Save to history”.",
    goToCalculator: "Go to calculator",
    count: "{count} saved",
    savedOn: "Saved {date}",
    olderMethod:
      "Saved with an older method (version {version}). Open it to recalculate with the current one.",
    open: "Open in calculator",
    deleteOne: "Delete",
    deleteLabel: "Delete the calculation saved {date}",
    deleted: "Calculation deleted.",
    undo: "Undo",
    clearAll: "Clear all",
    clearTitle: "Clear all saved calculations?",
    clearBody:
      "This removes every saved calculation from this browser. You can't undo it.",
    clearConfirm: "Clear all",
    cancel: "Cancel",
    cleared: "History cleared.",
    writeFailed: "The browser didn't let us save that change.",
  },
  content: {
    breadcrumbLabel: "Breadcrumb",
    home: "Home",
    updated: "Last updated {date}",
    onThisPage: "On this page",
    sources: "Sources",
    sourcesNote: "We opened and checked each source on {date}.",
    sourceNotOpened:
      "This link was added by the site owner. We couldn't open the page ourselves, so we haven't checked it.",
    newTab: "opens in a new tab",
    reviewTitle: "Review status",
    reviewReligious:
      "This guide only summarises the sources listed here. A qualified scholar hasn't reviewed it yet, so please treat it as general information.",
    religiousBadge: "Religious topic",
    related: "Related guides",
    readGuide: "Read guide",
    guidesHeading: "Guides",
    guidesIntro:
      "Short guides, with sources, on Haq Mahr, silver weights and using the calculator.",
    ctaTitle: "Work out your Haq Mahr",
    ctaBody: "Enter today's silver rate to see what 10 Dirhams of silver comes to.",
    ctaButton: "Open the calculator",
  },
  silverSources: {
    heading: "Silver Rate Sources",
    intro:
      "Check the silver price on one of these websites before you use the calculator. They're grouped by country, and we opened and checked every link ourselves. We don't run any of these sites.",
    notesTitle: "Before you copy a rate",
    kindsTitle: "Types of source",
    jumpTo: "Jump to a country",
    currency: "Currency",
    units: "Units",
    reviewed: "Link checked {date}",
    newTab: "opens in a new tab",
    guideLink: "How to check a silver rate",
    calculatorLink: "Open the calculator",
    suggest: "Know a reliable source for your country? Let us know.",
    notes: [
      "Check the unit (tola, 10 grams, gram, kilogram or ounce) and convert it if you need to.",
      "Check the purity (for example 999 fine silver) and whether it's a buying or selling price.",
      "Use the rate for the day you're calculating. Prices change during the day.",
      "A site being listed here isn't an endorsement, and we can't guarantee its prices.",
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
        help: "The international spot price in your local currency. It can differ from local market rates.",
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
          "No. It's a calculation based on the silver rate you enter, for information only. It isn't a fatwa, a religious ruling or legal advice. For a decision about your own nikah, please ask a qualified scholar.",
      },
      {
        question: "Which weight does the calculator use?",
        answer:
          "10 Dirhams of silver, which is 2 Tola 7.5 Masha, or 30.618 g (taking 1 Tola as 11.664 g). Different sources give slightly different gram figures for 10 Dirhams; the guides explain why.",
      },
      {
        question: "Does it show today's silver rate?",
        answer:
          "No. You enter the rate yourself, so the result is only as up to date as that rate. The Silver Rate Sources page lists websites in each country where you can check it.",
      },
      {
        question: "Should I enter the rate per Tola or per gram?",
        answer:
          "Whichever your source gives. Choose Per Tola or Per Gram to match; both give the same result. If your source uses another unit, such as kilograms or ounces, convert it first.",
      },
      {
        question: "Why is the amount rounded up?",
        answer:
          "The final amount is always rounded up to the currency's smallest unit (for example 0.01 for PKR), so it never comes out below the exact value. The receipt shows the rate and the reference weight used.",
      },
      {
        question: "Does it convert between currencies?",
        answer:
          "No. The currency is just a label. Enter the rate in the currency you want the result in.",
      },
      {
        question: "Is my data saved or sent anywhere?",
        answer:
          "The calculation happens in your browser, and the rate you type isn't sent to any server. A calculation is only kept if you choose “Save to history”, and even then it stays in your own browser.",
      },
      {
        question: "What if my scholar uses a different weight?",
        answer:
          "Scholars and sources give slightly different gram values for one Dirham. If you've been given a different figure, follow your scholar. The calculator is there to help, not to replace their guidance.",
      },
    ],
  },
};

export type Dictionary = typeof en;
