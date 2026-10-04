import type { GuideContent } from "./types";
import type { Localized } from "../types";

export const checkingSilverRates: Localized<GuideContent> = {
  en: {
    title: "How to check a silver rate before calculating",
    description:
      "A checklist for reading a silver rate correctly: unit, purity, buying or selling price, date and currency, before entering it in the Haq Mahr calculator.",
    summary:
      "Check the unit, purity, buy or sell price, date and currency of a silver rate so your Haq Mahr estimate is based on the right number.",
    intro:
      "The calculator is only as accurate as the rate you enter. Silver rates are published in many forms, and two numbers that look different can describe the same price. Use this checklist before you type a rate.",
    sections: [
      {
        id: "checklist",
        heading: "Checklist",
        blocks: [
          {
            type: "ol",
            items: [
              "Unit: is the price per Tola, per gram, per 10 grams, per kilogram or per troy ounce? The calculator accepts per Tola or per gram, so convert other units first.",
              "Purity: rates are usually given for a stated fineness, such as 999 (fine silver) or 925 (sterling). Rates for different purities are different.",
              "Buying or selling: dealers often show two prices. Note which one you are using.",
              "Date and time: silver prices change during the day. Use a rate from the day you need the figure.",
              "Currency: enter the rate in the currency it is quoted in. The calculator does not convert currencies.",
              "Jewellery prices: the price of a finished item can include making charges and taxes, so it is not the same as the metal rate.",
            ],
          },
          {
            type: "link",
            text: "See silver rate sources by country",
            path: "/silver-rate-sources",
          },
        ],
      },
      {
        id: "converting",
        heading: "Converting other units",
        blocks: [
          {
            type: "ul",
            items: [
              "Per 10 grams → per gram: divide by 10.",
              "Per kilogram → per gram: divide by 1,000.",
              "Per troy ounce → per gram: divide by 31.1034768.",
            ],
          },
          {
            type: "link",
            text: "More on Tola, Masha and Gram",
            path: "/guides/tola-masha-gram",
          },
        ],
      },
      {
        id: "which-rate",
        heading: "Which rate should I use?",
        blocks: [
          {
            type: "p",
            text: "Which purity, market or price (buying or selling) should be used for Mahr is a question for a qualified scholar or your local practice. This site does not choose one for you. Whatever you choose, the receipt shows the exact rate you entered so others can see the basis of the figure.",
          },
          {
            type: "note",
            tone: "info",
            text: "Haq Mahr Finder does not fetch or verify silver prices. Always confirm the rate with your source before relying on the result.",
          },
          { type: "link", text: "Open the calculator", path: "" },
        ],
      },
    ],
  },
  ur: {
    title: "حساب سے پہلے چاندی کا ریٹ کیسے جانچیں",
    description:
      "چاندی کا ریٹ درست پڑھنے کی فہرست: اکائی، خالص پن، خرید یا فروخت کی قیمت، تاریخ اور کرنسی، حق مہر کیلکولیٹر میں درج کرنے سے پہلے۔",
    summary:
      "چاندی کے ریٹ کی اکائی، خالص پن، خرید یا فروخت کی قیمت، تاریخ اور کرنسی جانچیں تاکہ آپ کا حق مہر کا اندازہ درست عدد پر ہو۔",
    intro:
      "کیلکولیٹر اتنا ہی درست ہے جتنا آپ کا درج کیا ہوا ریٹ۔ چاندی کے ریٹ کئی صورتوں میں شائع ہوتے ہیں، اور دو مختلف نظر آنے والے اعداد ایک ہی قیمت ہو سکتے ہیں۔ ریٹ لکھنے سے پہلے یہ فہرست دیکھ لیں۔",
    sections: [
      {
        id: "checklist",
        heading: "جانچ کی فہرست",
        blocks: [
          {
            type: "ol",
            items: [
              "اکائی: قیمت فی تولہ ہے، فی گرام، فی 10 گرام، فی کلوگرام یا فی ٹرائے اونس؟ کیلکولیٹر فی تولہ یا فی گرام لیتا ہے، اس لیے دوسری اکائیوں کو پہلے بدل لیں۔",
              "خالص پن: ریٹ عموماً کسی خاص خالص پن کے لیے ہوتا ہے، جیسے 999 (خالص چاندی) یا 925 (اسٹرلنگ)۔ مختلف خالص پن کے ریٹ مختلف ہوتے ہیں۔",
              "خرید یا فروخت: ڈیلر اکثر دو قیمتیں دکھاتے ہیں۔ نوٹ کریں کہ آپ کون سی استعمال کر رہے ہیں۔",
              "تاریخ اور وقت: چاندی کی قیمت دن بھر بدلتی ہے۔ اسی دن کا ریٹ استعمال کریں جس دن مقدار درکار ہو۔",
              "کرنسی: ریٹ اسی کرنسی میں درج کریں جس میں بتایا گیا ہے۔ کیلکولیٹر کرنسی تبدیل نہیں کرتا۔",
              "زیورات کی قیمت: تیار زیور کی قیمت میں بنوائی اور ٹیکس شامل ہو سکتے ہیں، اس لیے یہ دھات کے ریٹ جیسی نہیں ہوتی۔",
            ],
          },
          {
            type: "link",
            text: "ملک وار چاندی کے ریٹ کے ذرائع دیکھیں",
            path: "/silver-rate-sources",
          },
        ],
      },
      {
        id: "converting",
        heading: "دوسری اکائیوں کی تبدیلی",
        blocks: [
          {
            type: "ul",
            items: [
              "فی 10 گرام سے فی گرام: 10 سے تقسیم کریں۔",
              "فی کلوگرام سے فی گرام: 1,000 سے تقسیم کریں۔",
              "فی ٹرائے اونس سے فی گرام: 31.1034768 سے تقسیم کریں۔",
            ],
          },
          {
            type: "link",
            text: "تولہ، ماشہ اور گرام کے بارے میں مزید",
            path: "/guides/tola-masha-gram",
          },
        ],
      },
      {
        id: "which-rate",
        heading: "کون سا ریٹ استعمال کریں؟",
        blocks: [
          {
            type: "p",
            text: "مہر کے لیے کون سا خالص پن، کون سی مارکیٹ یا کون سی قیمت (خرید یا فروخت) لی جائے، یہ سوال کسی مستند عالم یا آپ کے مقامی رواج کا ہے۔ یہ سائٹ آپ کے لیے انتخاب نہیں کرتی۔ آپ جو بھی ریٹ لیں، رسید میں بالکل وہی ریٹ دکھایا جاتا ہے تاکہ دوسرے مقدار کی بنیاد دیکھ سکیں۔",
          },
          {
            type: "note",
            tone: "info",
            text: "حق مہر فائنڈر چاندی کی قیمت نہ خود لاتا ہے نہ اس کی تصدیق کرتا ہے۔ نتیجے پر بھروسہ کرنے سے پہلے ریٹ ہمیشہ اپنے ذریعے سے تصدیق کریں۔",
          },
          { type: "link", text: "کیلکولیٹر کھولیں", path: "" },
        ],
      },
    ],
  },
  ar: {
    title: "كيف تتحقق من سعر الفضة قبل الحساب",
    description:
      "قائمة للتحقق من قراءة سعر الفضة بشكل صحيح: الوحدة والعيار وسعر الشراء أو البيع والتاريخ والعملة، قبل إدخاله في حاسبة حق المهر.",
    summary:
      "تحقّق من وحدة سعر الفضة وعياره وسعر الشراء أو البيع وتاريخه وعملته، ليكون تقدير حق المهر مبنيًا على الرقم الصحيح.",
    intro:
      "دقة الحاسبة بقدر دقة السعر الذي تُدخله. تُنشر أسعار الفضة بصيغ كثيرة، وقد يدل رقمان مختلفان في الظاهر على السعر نفسه. راجع هذه القائمة قبل كتابة السعر.",
    sections: [
      {
        id: "checklist",
        heading: "قائمة التحقق",
        blocks: [
          {
            type: "ol",
            items: [
              "الوحدة: هل السعر للتولة أم للغرام أم لكل 10 غرامات أم للكيلوغرام أم للأونصة التروية؟ تقبل الحاسبة السعر للتولة أو للغرام، فحوّل الوحدات الأخرى أولًا.",
              "العيار: تُذكر الأسعار عادةً لعيار محدد، مثل 999 (فضة خالصة) أو 925 (الفضة الإسترلينية). وتختلف الأسعار باختلاف العيار.",
              "الشراء أو البيع: كثيرًا ما يعرض التجار سعرين. لاحظ أيهما تستخدم.",
              "التاريخ والوقت: تتغيّر أسعار الفضة خلال اليوم. استخدم سعر اليوم الذي تحتاج فيه إلى الرقم.",
              "العملة: أدخل السعر بالعملة التي ذُكر بها. لا تحوّل الحاسبة بين العملات.",
              "أسعار المصوغات: قد يشمل سعر القطعة المصنوعة أجرة الصياغة والضرائب، فلا يساوي سعر المعدن.",
            ],
          },
          {
            type: "link",
            text: "اطّلع على مصادر أسعار الفضة حسب الدولة",
            path: "/silver-rate-sources",
          },
        ],
      },
      {
        id: "converting",
        heading: "تحويل الوحدات الأخرى",
        blocks: [
          {
            type: "ul",
            items: [
              "من سعر 10 غرامات إلى سعر الغرام: اقسم على 10.",
              "من سعر الكيلوغرام إلى سعر الغرام: اقسم على 1,000.",
              "من سعر الأونصة التروية إلى سعر الغرام: اقسم على 31.1034768.",
            ],
          },
          {
            type: "link",
            text: "المزيد عن التولة والماشة والغرام",
            path: "/guides/tola-masha-gram",
          },
        ],
      },
      {
        id: "which-rate",
        heading: "أي سعر أستخدم؟",
        blocks: [
          {
            type: "p",
            text: "أيّ عيار أو سوق أو سعر (شراء أو بيع) يُعتمد في المهر مسألةٌ تُسأل عنها عالمًا مؤهلًا أو يُرجع فيها إلى العرف المحلي. لا يختار هذا الموقع عنك. وأيًّا كان اختيارك، يعرض الإيصال السعر الذي أدخلته تمامًا ليرى الآخرون أساس الرقم.",
          },
          {
            type: "note",
            tone: "info",
            text: "لا تجلب حاسبة حق المهر أسعار الفضة ولا تتحقق منها. تأكد دائمًا من السعر لدى مصدرك قبل الاعتماد على النتيجة.",
          },
          { type: "link", text: "افتح الحاسبة", path: "" },
        ],
      },
    ],
  },
};
