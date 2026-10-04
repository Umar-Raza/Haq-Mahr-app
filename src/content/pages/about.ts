import type { Localized, PageContent } from "../types";

export const about: Localized<PageContent> = {
  en: {
    title: "About Haq Mahr Finder",
    description:
      "What Haq Mahr Finder is, what it does and does not do, how its calculation is sourced, and the languages it supports.",
    intro:
      "Haq Mahr Finder is an independent project that helps people estimate the value of the minimum Haq Mahr reference, 10 Dirhams of silver, from a silver rate they enter themselves.",
    sections: [
      {
        id: "what-it-does",
        heading: "What the site does",
        blocks: [
          {
            type: "ul",
            items: [
              "Calculates the value of 30.618 g (2 Tola 7.5 Masha) of silver at the rate you enter, in any of 155 currencies.",
              "Shows the full calculation on a receipt you can download, share or copy.",
              "Lets you keep calculations in your own browser, with no account.",
              "Explains the units, sources and methodology in plain language, in English, Urdu and Arabic.",
            ],
          },
        ],
      },
      {
        id: "what-it-does-not-do",
        heading: "What it does not do",
        blocks: [
          {
            type: "ul",
            items: [
              "It does not issue fatwas or religious rulings, and it does not choose between scholarly opinions.",
              "It does not fetch, publish or verify live silver prices.",
              "It does not convert between currencies.",
              "It does not ask for your name or any personal details.",
            ],
          },
        ],
      },
      {
        id: "methodology",
        heading: "How the calculation is sourced",
        blocks: [
          {
            type: "p",
            text: "The reference weight and the Tola conversion come from published sources that were opened and checked before use. Each source is listed on the calculator page and in the guides, together with the date it was reviewed. Where sources differ, the site says so.",
          },
          {
            type: "link",
            text: "Read: Minimum Haq Mahr, 10 Dirhams of silver",
            path: "/guides/minimum-haq-mahr-10-dirhams",
          },
        ],
      },
      {
        id: "languages",
        heading: "Languages",
        blocks: [
          {
            type: "p",
            text: "The site is available in English, Urdu and Arabic. Translations may be refined over time; if you notice an error, please let us know.",
          },
        ],
      },
    ],
  },
  ur: {
    title: "حق مہر فائنڈر کا تعارف",
    description:
      "حق مہر فائنڈر کیا ہے، یہ کیا کرتا ہے اور کیا نہیں کرتا، اس کے حساب کے ذرائع کیا ہیں، اور یہ کن زبانوں میں دستیاب ہے۔",
    intro:
      "حق مہر فائنڈر ایک آزاد منصوبہ ہے جو لوگوں کو اپنے درج کردہ چاندی کے ریٹ سے کم از کم حق مہر کے حوالے، یعنی 10 درہم چاندی، کی قیمت کا اندازہ لگانے میں مدد دیتا ہے۔",
    sections: [
      {
        id: "what-it-does",
        heading: "یہ سائٹ کیا کرتی ہے",
        blocks: [
          {
            type: "ul",
            items: [
              "آپ کے درج کردہ ریٹ پر 30.618 گرام (2 تولہ 7.5 ماشہ) چاندی کی قیمت 155 کرنسیوں میں سے کسی میں بھی نکالتی ہے۔",
              "پورا حساب ایک رسید پر دکھاتی ہے جسے آپ ڈاؤن لوڈ، شیئر یا کاپی کر سکتے ہیں۔",
              "بغیر اکاؤنٹ کے آپ کے اپنے براؤزر میں حسابات محفوظ رکھنے دیتی ہے۔",
              "اکائیوں، ذرائع اور طریقۂ کار کو سادہ زبان میں انگریزی، اردو اور عربی میں بیان کرتی ہے۔",
            ],
          },
        ],
      },
      {
        id: "what-it-does-not-do",
        heading: "یہ کیا نہیں کرتی",
        blocks: [
          {
            type: "ul",
            items: [
              "یہ فتویٰ یا شرعی فیصلہ جاری نہیں کرتی، اور علماء کی آراء میں سے کسی کو ترجیح نہیں دیتی۔",
              "یہ چاندی کی لائیو قیمتیں نہ لاتی ہے، نہ شائع کرتی ہے، نہ ان کی تصدیق کرتی ہے۔",
              "یہ کرنسیاں ایک دوسرے میں تبدیل نہیں کرتی۔",
              "یہ آپ کا نام یا کوئی ذاتی معلومات نہیں مانگتی۔",
            ],
          },
        ],
      },
      {
        id: "methodology",
        heading: "حساب کے ذرائع",
        blocks: [
          {
            type: "p",
            text: "حوالہ وزن اور تولے کی تبدیلی شائع شدہ ذرائع سے لی گئی ہے، جنہیں استعمال سے پہلے کھول کر جانچا گیا۔ ہر ذریعہ اس کی جانچ کی تاریخ کے ساتھ کیلکولیٹر کے صفحے اور رہنمائی میں درج ہے۔ جہاں ذرائع میں فرق ہے، وہاں سائٹ یہ بات واضح کرتی ہے۔",
          },
          {
            type: "link",
            text: "پڑھیں: کم از کم حق مہر، 10 درہم چاندی",
            path: "/guides/minimum-haq-mahr-10-dirhams",
          },
        ],
      },
      {
        id: "languages",
        heading: "زبانیں",
        blocks: [
          {
            type: "p",
            text: "یہ سائٹ انگریزی، اردو اور عربی میں دستیاب ہے۔ تراجم میں وقت کے ساتھ بہتری کی جا سکتی ہے؛ اگر آپ کو کوئی غلطی نظر آئے تو ہمیں ضرور بتائیں۔",
          },
        ],
      },
    ],
  },
  ar: {
    title: "عن حاسبة حق المهر",
    description:
      "ما هي حاسبة حق المهر، وما الذي تقدّمه وما لا تقدّمه، ومصادر طريقة الحساب، واللغات المتاحة.",
    intro:
      "حاسبة حق المهر مشروع مستقل يساعد الناس على تقدير قيمة المرجع الأدنى لحق المهر، أي 10 دراهم من الفضة، بناءً على سعر فضة يُدخلونه بأنفسهم.",
    sections: [
      {
        id: "what-it-does",
        heading: "ما الذي يقدّمه الموقع",
        blocks: [
          {
            type: "ul",
            items: [
              "يحسب قيمة 30.618 غرامًا (2 تولة و7.5 ماشة) من الفضة بالسعر الذي تُدخله، بأي من 155 عملة.",
              "يعرض الحساب كاملًا في إيصال يمكنك تنزيله أو مشاركته أو نسخه.",
              "يتيح لك حفظ الحسابات في متصفحك دون حساب مستخدم.",
              "يشرح الوحدات والمصادر وطريقة الحساب بلغة واضحة، بالإنجليزية والأردية والعربية.",
            ],
          },
        ],
      },
      {
        id: "what-it-does-not-do",
        heading: "ما لا يقدّمه",
        blocks: [
          {
            type: "ul",
            items: [
              "لا يُصدر فتاوى ولا أحكامًا شرعية، ولا يرجّح بين آراء العلماء.",
              "لا يجلب أسعار الفضة الحية ولا ينشرها ولا يتحقق منها.",
              "لا يحوّل بين العملات.",
              "لا يطلب اسمك ولا أي بيانات شخصية.",
            ],
          },
        ],
      },
      {
        id: "methodology",
        heading: "مصادر طريقة الحساب",
        blocks: [
          {
            type: "p",
            text: "الوزن المرجعي وتحويل التولة مأخوذان من مصادر منشورة فُتحت وروجعت قبل استخدامها. وكل مصدر مذكور في صفحة الحاسبة وفي الأدلة مع تاريخ مراجعته. وحيث تختلف المصادر يذكر الموقع ذلك.",
          },
          {
            type: "link",
            text: "اقرأ: الحد الأدنى لحق المهر، 10 دراهم من الفضة",
            path: "/guides/minimum-haq-mahr-10-dirhams",
          },
        ],
      },
      {
        id: "languages",
        heading: "اللغات",
        blocks: [
          {
            type: "p",
            text: "الموقع متاح بالإنجليزية والأردية والعربية. وقد تُحسَّن الترجمات مع الوقت؛ فإن لاحظت خطأً فأخبرنا من فضلك.",
          },
        ],
      },
    ],
  },
};
