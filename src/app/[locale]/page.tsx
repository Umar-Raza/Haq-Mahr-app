import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Calculator } from "@/components/calculator/calculator";
import { Methodology } from "@/components/calculator/methodology";
import { ReopenableCalculator } from "@/components/calculator/reopenable-calculator";
import { Container } from "@/components/layout/container";
import { isLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  commonCurrencies,
  currencies,
  type Currency,
} from "@/lib/calc/currencies";
import {
  normalizeSearch,
  type CurrencyGroup,
  type CurrencyOption,
} from "@/lib/currency-search";

// A pre-selected label only; nothing is converted. User decision: Pakistan (PKR) in every locale.
const DEFAULT_CURRENCY: Currency = "PKR";

// Built on the server so option text never differs between server and client ICU data.
function currencyGroups(
  locale: Locale,
  t: Dictionary["calculator"],
): CurrencyGroup[] {
  const localNames = new Intl.DisplayNames([locale], { type: "currency" });
  const englishNames = new Intl.DisplayNames(["en"], { type: "currency" });
  const nameOf = (names: Intl.DisplayNames, code: Currency) => {
    const name = names.of(code);
    return name && name !== code ? name : null;
  };
  const option = (code: Currency): CurrencyOption => {
    const english = nameOf(englishNames, code);
    const name = nameOf(localNames, code) ?? english ?? code;
    return {
      code,
      name,
      search: normalizeSearch(`${code} ${name} ${english ?? ""}`),
    };
  };
  const common = new Set<Currency>(commonCurrencies);
  const collator = new Intl.Collator(locale);
  const rest = currencies
    .filter((code) => !common.has(code))
    .map(option)
    .sort((a, b) => collator.compare(a.name, b.name));
  return [
    { label: t.currencyCommon, options: commonCurrencies.map(option) },
    { label: t.currencyAll, options: rest },
  ];
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const calculatorProps = {
    locale,
    currencyGroups: currencyGroups(locale, dict.calculator),
    defaultCurrency: DEFAULT_CURRENCY,
    texts: {
      siteName: dict.meta.siteName,
      calculator: dict.calculator,
      receipt: dict.receipt,
      actions: dict.actions,
    },
  };

  return (
    <Container className="flex flex-col gap-8 py-10 sm:py-14">
      <div className="print:hidden">
        <h1 className="text-3xl font-semibold text-base-content">
          {dict.home.heading}
        </h1>
        <p className="mt-3 max-w-2xl text-muted">{dict.home.intro}</p>
      </div>
      <Suspense fallback={<Calculator {...calculatorProps} />}>
        <ReopenableCalculator {...calculatorProps} />
      </Suspense>
      <div className="max-w-3xl print:hidden">
        <Methodology locale={locale} dict={dict.methodology} />
      </div>
    </Container>
  );
}
