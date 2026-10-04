import type { GuideContent } from "./types";
import type { Localized } from "../types";

export const tolaMashaGram: Localized<GuideContent> = {
  en: {
    title: "Tola, Masha and Gram: converting silver weights",
    description:
      "How Tola, Masha and grams relate, the values Haq Mahr Finder uses (1 Tola = 12 Masha = 11.664 g), and how to convert a silver rate between them.",
    summary:
      "1 Tola = 12 Masha = 11.664 g. Learn the conversions and how to turn a per-gram rate into a per-Tola rate.",
    intro:
      "Silver rates in South Asia are often quoted per Tola, while most of the world quotes per gram, per kilogram or per troy ounce. This guide explains how the units relate so you can enter the right rate.",
    sections: [
      {
        id: "the-units",
        heading: "The units",
        blocks: [
          {
            type: "ul",
            items: [
              "Tola: a traditional South Asian unit of weight for gold and silver. 1 Tola = 12 Masha.",
              "Masha: one twelfth of a Tola.",
              "Gram: the metric unit used by most international rates.",
            ],
          },
          {
            type: "p",
            text: "The modern standard Tola is defined as 180 grains, which is 11.6638038 g. Haq Mahr Finder uses 11.664 g, the value behind the widely cited figure of 30.618 g for 10 Dirhams. The difference between the two is less than 0.001 g per Tola.",
          },
        ],
      },
      {
        id: "conversion-table",
        heading: "Conversion table",
        blocks: [
          {
            type: "table",
            caption: "Tola, Masha and gram values used by Haq Mahr Finder",
            head: ["Weight", "Masha", "Grams"],
            rows: [
              ["1 Tola", "12", "11.664"],
              ["1 Masha", "1", "0.972"],
              ["2 Tola 7.5 Masha (10 Dirhams)", "31.5", "30.618"],
            ],
          },
          {
            type: "p",
            text: "2 Tola 7.5 Masha can also be written as 2.625 Tola, because 7.5 Masha is 7.5 ÷ 12 = 0.625 Tola.",
          },
        ],
      },
      {
        id: "converting-rates",
        heading: "Converting a silver rate",
        blocks: [
          {
            type: "ul",
            items: [
              "Per gram → per Tola: multiply by 11.664. For example, 300 per gram × 11.664 = 3,499.20 per Tola.",
              "Per Tola → per gram: divide by 11.664.",
              "Per 10 grams → per gram: divide by 10.",
              "Per kilogram → per gram: divide by 1,000.",
              "Per troy ounce → per gram: divide by 31.1034768 (1 troy ounce = 31.1034768 g).",
            ],
          },
          {
            type: "note",
            tone: "info",
            text: "You do not need to convert between Tola and gram yourself: choose Per Tola or Per Gram in the calculator and both give the same result. Only convert when your source uses another unit, such as kilograms or troy ounces.",
          },
          { type: "link", text: "Open the calculator", path: "" },
        ],
      },
    ],
  },
  ur: {
    title: "تولہ، ماشہ اور گرام: چاندی کے وزن کی تبدیلی",
    description:
      "تولہ، ماشہ اور گرام کا باہمی تعلق، حق مہر فائنڈر میں استعمال ہونے والی قدریں (1 تولہ = 12 ماشہ = 11.664 گرام)، اور چاندی کا ریٹ ایک اکائی سے دوسری میں بدلنے کا طریقہ۔",
    summary:
      "1 تولہ = 12 ماشہ = 11.664 گرام۔ تبدیلی کے طریقے اور فی گرام ریٹ کو فی تولہ ریٹ میں بدلنا سیکھیں۔",
    intro:
      "جنوبی ایشیا میں چاندی کا ریٹ اکثر فی تولہ بتایا جاتا ہے، جبکہ دنیا کے زیادہ تر حصوں میں فی گرام، فی کلوگرام یا فی ٹرائے اونس۔ یہ رہنمائی ان اکائیوں کا تعلق واضح کرتی ہے تاکہ آپ درست ریٹ درج کر سکیں۔",
    sections: [
      {
        id: "the-units",
        heading: "اکائیاں",
        blocks: [
          {
            type: "ul",
            items: [
              "تولہ: سونے اور چاندی کے لیے جنوبی ایشیا کی روایتی اکائی۔ 1 تولہ = 12 ماشہ۔",
              "ماشہ: تولے کا بارہواں حصہ۔",
              "گرام: میٹرک اکائی جو زیادہ تر بین الاقوامی ریٹس میں استعمال ہوتی ہے۔",
            ],
          },
          {
            type: "p",
            text: "جدید معیاری تولہ 180 گرین یعنی 11.6638038 گرام کے برابر ہے۔ حق مہر فائنڈر 11.664 گرام استعمال کرتا ہے، جو 10 درہم کے لیے عام طور پر بیان کی جانے والی مقدار 30.618 گرام کی بنیاد ہے۔ دونوں میں فی تولہ فرق 0.001 گرام سے بھی کم ہے۔",
          },
        ],
      },
      {
        id: "conversion-table",
        heading: "تبدیلی کا جدول",
        blocks: [
          {
            type: "table",
            caption:
              "حق مہر فائنڈر میں استعمال ہونے والی تولہ، ماشہ اور گرام کی قدریں",
            head: ["وزن", "ماشہ", "گرام"],
            rows: [
              ["1 تولہ", "12", "11.664"],
              ["1 ماشہ", "1", "0.972"],
              ["2 تولہ 7.5 ماشہ (10 درہم)", "31.5", "30.618"],
            ],
          },
          {
            type: "p",
            text: "2 تولہ 7.5 ماشہ کو 2.625 تولہ بھی لکھا جا سکتا ہے، کیونکہ 7.5 ماشہ = 7.5 ÷ 12 = 0.625 تولہ۔",
          },
        ],
      },
      {
        id: "converting-rates",
        heading: "چاندی کا ریٹ بدلنا",
        blocks: [
          {
            type: "ul",
            items: [
              "فی گرام سے فی تولہ: 11.664 سے ضرب دیں۔ مثلاً 300 فی گرام × 11.664 = 3,499.20 فی تولہ۔",
              "فی تولہ سے فی گرام: 11.664 سے تقسیم کریں۔",
              "فی 10 گرام سے فی گرام: 10 سے تقسیم کریں۔",
              "فی کلوگرام سے فی گرام: 1,000 سے تقسیم کریں۔",
              "فی ٹرائے اونس سے فی گرام: 31.1034768 سے تقسیم کریں (1 ٹرائے اونس = 31.1034768 گرام)۔",
            ],
          },
          {
            type: "note",
            tone: "info",
            text: "تولہ اور گرام کے درمیان آپ کو خود تبدیلی کی ضرورت نہیں: کیلکولیٹر میں فی تولہ یا فی گرام منتخب کریں، دونوں کا نتیجہ ایک ہی آتا ہے۔ تبدیلی صرف تب کریں جب آپ کا ذریعہ کوئی اور اکائی استعمال کرے، جیسے کلوگرام یا ٹرائے اونس۔",
          },
          { type: "link", text: "کیلکولیٹر کھولیں", path: "" },
        ],
      },
    ],
  },
  ar: {
    title: "التولة والماشة والغرام: تحويل أوزان الفضة",
    description:
      "العلاقة بين التولة والماشة والغرام، والقيم التي تستخدمها حاسبة حق المهر (1 تولة = 12 ماشة = 11.664 غرامًا)، وكيفية تحويل سعر الفضة بينها.",
    summary:
      "1 تولة = 12 ماشة = 11.664 غرامًا. تعرّف على التحويلات وكيف تحوّل سعر الغرام إلى سعر التولة.",
    intro:
      "يُذكر سعر الفضة في جنوب آسيا غالبًا للتولة، بينما يُذكر في معظم أنحاء العالم للغرام أو الكيلوغرام أو الأونصة التروية. يشرح هذا الدليل العلاقة بين هذه الوحدات لتُدخل السعر الصحيح.",
    sections: [
      {
        id: "the-units",
        heading: "الوحدات",
        blocks: [
          {
            type: "ul",
            items: [
              "التولة: وحدة وزن تقليدية في جنوب آسيا للذهب والفضة. 1 تولة = 12 ماشة.",
              "الماشة: جزء من اثني عشر من التولة.",
              "الغرام: الوحدة المترية المستخدمة في معظم الأسعار الدولية.",
            ],
          },
          {
            type: "p",
            text: "تُعرَّف التولة القياسية الحديثة بأنها 180 حبة (grain)، أي 11.6638038 غرامًا. تستخدم حاسبة حق المهر 11.664 غرامًا، وهي القيمة التي يقوم عليها الرقم الشائع 30.618 غرامًا لـ10 دراهم. والفرق بينهما أقل من 0.001 غرام لكل تولة.",
          },
        ],
      },
      {
        id: "conversion-table",
        heading: "جدول التحويل",
        blocks: [
          {
            type: "table",
            caption: "قيم التولة والماشة والغرام المستخدمة في حاسبة حق المهر",
            head: ["الوزن", "ماشة", "غرام"],
            rows: [
              ["1 تولة", "12", "11.664"],
              ["1 ماشة", "1", "0.972"],
              ["2 تولة و7.5 ماشة (10 دراهم)", "31.5", "30.618"],
            ],
          },
          {
            type: "p",
            text: "يمكن كتابة 2 تولة و7.5 ماشة على أنها 2.625 تولة، لأن 7.5 ماشة = 7.5 ÷ 12 = 0.625 تولة.",
          },
        ],
      },
      {
        id: "converting-rates",
        heading: "تحويل سعر الفضة",
        blocks: [
          {
            type: "ul",
            items: [
              "من سعر الغرام إلى سعر التولة: اضرب في 11.664. مثلًا 300 للغرام × 11.664 = 3,499.20 للتولة.",
              "من سعر التولة إلى سعر الغرام: اقسم على 11.664.",
              "من سعر 10 غرامات إلى سعر الغرام: اقسم على 10.",
              "من سعر الكيلوغرام إلى سعر الغرام: اقسم على 1,000.",
              "من سعر الأونصة التروية إلى سعر الغرام: اقسم على 31.1034768 (1 أونصة تروية = 31.1034768 غرامًا).",
            ],
          },
          {
            type: "note",
            tone: "info",
            text: "لا تحتاج إلى التحويل بين التولة والغرام بنفسك: اختر «لكل تولة» أو «لكل غرام» في الحاسبة وستحصل على النتيجة نفسها. حوّل فقط إذا كان مصدرك يستخدم وحدة أخرى مثل الكيلوغرام أو الأونصة التروية.",
          },
          { type: "link", text: "افتح الحاسبة", path: "" },
        ],
      },
    ],
  },
};
