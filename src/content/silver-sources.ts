import type { Currency } from "@/lib/calc/currencies";
import type { Localized } from "./types";

/**
 * Curated outbound links. Every URL was opened in a browser on `reviewed` and showed a
 * silver price. Re-check periodically (`npm run check:links`) and remove broken or
 * misleading entries. Never add a link that has not been opened and checked.
 */
export const SILVER_SOURCES_REVIEWED_ON = "2026-10-04";

/**
 * localMarket: rates from a country's own bullion/jewellery market.
 * benchmark: an official reference price set by an industry body.
 * dealer: a bullion dealer's live spot price.
 * spotConverter: the international spot price converted to local currency and units.
 */
export const sourceKinds = [
  "localMarket",
  "benchmark",
  "dealer",
  "spotConverter",
] as const;
export type SourceKind = (typeof sourceKinds)[number];

export const rateUnits = ["tola", "tenGrams", "gram", "kg", "ounce"] as const;
export type RateUnit = (typeof rateUnits)[number];

export type SilverSource = {
  name: string;
  url: string;
  kind: SourceKind;
  currency: Currency;
  units: RateUnit[];
  description: Localized<string>;
  reviewed: string;
};

/** ISO 3166-1 alpha-2 region code; names are localized with Intl.DisplayNames. */
export type CountrySources = { region: string; sources: SilverSource[] };

const reviewed = SILVER_SOURCES_REVIEWED_ON;

const goldpricez = (
  path: string,
  currency: Currency,
  units: RateUnit[],
): SilverSource => ({
  name: "GoldPriceZ",
  url: `https://goldpricez.com/silver-rates/${path}`,
  kind: "spotConverter",
  currency,
  units,
  description: {
    en: "Converts the international silver spot price into the local currency, with charts and other units. Not a local market rate.",
    ur: "چاندی کی بین الاقوامی اسپاٹ قیمت کو مقامی کرنسی اور دیگر اکائیوں میں بدل کر دکھاتا ہے، چارٹس کے ساتھ۔ یہ مقامی مارکیٹ کا ریٹ نہیں۔",
    ar: "يحوّل السعر الفوري العالمي للفضة إلى العملة المحلية ووحدات أخرى، مع رسوم بيانية. وليس سعر السوق المحلية.",
  },
  reviewed,
});

export const silverSources: readonly CountrySources[] = [
  {
    region: "PK",
    sources: [
      {
        name: "UrduPoint",
        url: "https://www.urdupoint.com/business/silver-rates-in-pakistan.html",
        kind: "localMarket",
        currency: "PKR",
        units: ["tola", "tenGrams"],
        description: {
          en: "Daily chandi rate per tola and per 10 grams from the local gold and silver markets, listed by city.",
          ur: "مقامی صرافہ مارکیٹ سے روزانہ چاندی کا ریٹ فی تولہ اور فی 10 گرام، شہر وار۔",
          ar: "سعر الفضة اليومي للتولة ولكل 10 غرامات من أسواق الذهب والفضة المحلية، حسب المدينة.",
        },
        reviewed,
      },
      goldpricez("pakistan", "PKR", ["tola", "gram", "kg", "ounce"]),
    ],
  },
  {
    region: "IN",
    sources: [
      {
        name: "India Bullion and Jewellers Association (IBJA)",
        url: "https://ibjarates.com/",
        kind: "benchmark",
        currency: "INR",
        units: ["kg"],
        description: {
          en: "Opening (AM) and closing (PM) rates for Silver 999 per kilogram, published on working days. Rates exclude GST.",
          ur: "Silver 999 کے فی کلوگرام صبح (AM) اور شام (PM) کے ریٹ، کاروباری دنوں میں شائع ہوتے ہیں۔ ریٹ GST کے بغیر ہیں۔",
          ar: "أسعار الافتتاح (AM) والإغلاق (PM) لفضة 999 للكيلوغرام، تُنشر في أيام العمل. الأسعار دون ضريبة GST.",
        },
        reviewed,
      },
    ],
  },
  {
    region: "US",
    sources: [
      {
        name: "JM Bullion",
        url: "https://www.jmbullion.com/charts/silver-prices/",
        kind: "dealer",
        currency: "USD",
        units: ["ounce", "gram", "kg"],
        description: {
          en: "Live silver spot price per ounce, gram and kilogram in US dollars, with historical charts.",
          ur: "امریکی ڈالر میں چاندی کی لائیو اسپاٹ قیمت فی اونس، فی گرام اور فی کلوگرام، تاریخی چارٹس کے ساتھ۔",
          ar: "السعر الفوري المباشر للفضة للأونصة والغرام والكيلوغرام بالدولار الأمريكي، مع رسوم بيانية تاريخية.",
        },
        reviewed,
      },
      {
        name: "Kitco",
        url: "https://www.kitco.com/price/precious-metals",
        kind: "dealer",
        currency: "USD",
        units: ["ounce"],
        description: {
          en: "Bid and ask spot prices for silver and other precious metals in US dollars per ounce.",
          ur: "چاندی اور دیگر قیمتی دھاتوں کی خرید و فروخت (bid/ask) اسپاٹ قیمتیں، امریکی ڈالر فی اونس میں۔",
          ar: "أسعار العرض والطلب الفورية للفضة والمعادن الثمينة الأخرى بالدولار الأمريكي للأونصة.",
        },
        reviewed,
      },
    ],
  },
  {
    region: "GB",
    sources: [
      {
        name: "LBMA Silver Price",
        url: "https://www.lbma.org.uk/prices-and-data/lbma-silver-price",
        kind: "benchmark",
        currency: "USD",
        units: ["ounce"],
        description: {
          en: "The London silver benchmark, set once a day and administered by ICE Benchmark Administration. The page explains the benchmark and how its prices are published.",
          ur: "لندن کا چاندی کا بینچ مارک، جو روزانہ ایک بار طے ہوتا ہے اور ICE Benchmark Administration کے زیرِ انتظام ہے۔ صفحہ بینچ مارک اور اس کی قیمتوں کی اشاعت کی وضاحت کرتا ہے۔",
          ar: "المؤشر المرجعي لسعر الفضة في لندن، يُحدَّد مرة يوميًا وتديره ICE Benchmark Administration. تشرح الصفحة المؤشر وطريقة نشر أسعاره.",
        },
        reviewed,
      },
      {
        name: "The Royal Mint",
        url: "https://www.royalmint.com/silver-price/",
        kind: "dealer",
        currency: "GBP",
        units: ["ounce"],
        description: {
          en: "Live silver price in pounds per ounce from the UK's official mint, with price charts.",
          ur: "برطانیہ کی سرکاری ٹکسال سے پاؤنڈ فی اونس میں چاندی کی لائیو قیمت، چارٹس کے ساتھ۔",
          ar: "سعر الفضة المباشر بالجنيه الإسترليني للأونصة من دار السك الرسمية في المملكة المتحدة، مع رسوم بيانية.",
        },
        reviewed,
      },
      {
        name: "BullionByPost",
        url: "https://www.bullionbypost.co.uk/silver-price/",
        kind: "dealer",
        currency: "GBP",
        units: ["ounce", "gram", "kg"],
        description: {
          en: "Live silver price charts in pounds, with a choice of weight unit and time period.",
          ur: "پاؤنڈ میں چاندی کی لائیو قیمت کے چارٹس، وزن کی اکائی اور مدت کے انتخاب کے ساتھ۔",
          ar: "رسوم بيانية مباشرة لسعر الفضة بالجنيه الإسترليني، مع اختيار وحدة الوزن والفترة الزمنية.",
        },
        reviewed,
      },
    ],
  },
  {
    region: "CA",
    sources: [
      {
        name: "Kitco (CAD)",
        url: "https://www.kitco.com/price/silver-price-cad",
        kind: "dealer",
        currency: "CAD",
        units: ["ounce", "gram", "kg", "tola"],
        description: {
          en: "Live silver bid and ask in Canadian dollars per ounce, gram, kilogram and tola, from Montreal-based Kitco Metals.",
          ur: "مونٹریال کی کمپنی Kitco Metals سے کینیڈین ڈالر میں چاندی کی لائیو خرید و فروخت قیمت، فی اونس، گرام، کلوگرام اور تولہ۔",
          ar: "أسعار العرض والطلب المباشرة للفضة بالدولار الكندي للأونصة والغرام والكيلوغرام والتولة، من شركة Kitco Metals في مونتريال.",
        },
        reviewed,
      },
    ],
  },
  {
    region: "SA",
    sources: [goldpricez("saudi-arabia/gram", "SAR", ["gram", "kg", "ounce"])],
  },
  {
    region: "AE",
    sources: [
      {
        name: "Khaleej Times",
        url: "https://www.khaleejtimes.com/gold-forex",
        kind: "localMarket",
        currency: "AED",
        units: ["kg"],
        description: {
          en: "Daily UAE market rates, including silver per kilogram with morning, evening and previous-day values. Open the Silver Rate tab on the page.",
          ur: "متحدہ عرب امارات کی مارکیٹ کے روزانہ ریٹ، جن میں چاندی فی کلوگرام صبح، شام اور گزشتہ دن کی قیمت کے ساتھ شامل ہے۔ صفحے پر Silver Rate کا ٹیب کھولیں۔",
          ar: "أسعار سوق الإمارات اليومية، ومنها الفضة للكيلوغرام بقيم الصباح والمساء واليوم السابق. افتح تبويب Silver Rate في الصفحة.",
        },
        reviewed,
      },
      goldpricez("uae/gram", "AED", ["gram", "kg", "ounce"]),
    ],
  },
  {
    region: "QA",
    sources: [goldpricez("qatar/gram", "QAR", ["gram", "kg", "ounce"])],
  },
  {
    region: "KW",
    sources: [goldpricez("kuwait/gram", "KWD", ["gram", "kg", "ounce"])],
  },
  {
    region: "BD",
    sources: [goldpricez("bangladesh", "BDT", ["gram", "kg", "ounce"])],
  },
  {
    region: "MY",
    sources: [goldpricez("malaysia/gram", "MYR", ["gram", "kg", "ounce"])],
  },
  {
    region: "AU",
    sources: [
      {
        name: "The Perth Mint",
        url: "https://www.perthmint.com/invest/information-for-investors/metal-prices/",
        kind: "dealer",
        currency: "AUD",
        units: ["ounce"],
        description: {
          en: "Spot prices for gold, silver and platinum in Australian or US dollars, refreshed every few minutes while markets are open.",
          ur: "سونے، چاندی اور پلاٹینم کی اسپاٹ قیمتیں آسٹریلوی یا امریکی ڈالر میں، جو مارکیٹ کھلی ہونے پر ہر چند منٹ بعد تازہ ہوتی ہیں۔",
          ar: "الأسعار الفورية للذهب والفضة والبلاتين بالدولار الأسترالي أو الأمريكي، تُحدَّث كل بضع دقائق أثناء فتح الأسواق.",
        },
        reviewed,
      },
    ],
  },
];
