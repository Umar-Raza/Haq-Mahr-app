import type { Localized, PageContent } from "../types";

export const terms: Localized<PageContent> = {
  en: {
    title: "Terms of Use",
    description:
      "The terms for using Haq Mahr Finder: informational use, your responsibility for the silver rate, no warranty, external links and acceptable use.",
    intro:
      "By using Haq Mahr Finder you agree to these terms. If you do not agree, please do not use the site.",
    sections: [
      {
        id: "service",
        heading: "The service",
        blocks: [
          {
            type: "p",
            text: "Haq Mahr Finder provides a free calculator, receipts and guides for general information. It is not a fatwa, religious ruling, or legal or financial advice. See the Disclaimer for details.",
          },
          { type: "link", text: "Read the Disclaimer", path: "/disclaimer" },
        ],
      },
      {
        id: "your-responsibility",
        heading: "Your responsibility",
        blocks: [
          {
            type: "ul",
            items: [
              "You are responsible for the silver rate, unit and currency you enter, and for checking them.",
              "You decide how to use a result. For religious or legal decisions, consult a qualified person.",
              "Receipts you share should not be altered to misrepresent the calculation.",
            ],
          },
        ],
      },
      {
        id: "acceptable-use",
        heading: "Acceptable use",
        blocks: [
          {
            type: "p",
            text: "Do not use the site unlawfully, try to disrupt or overload it, or attempt to access it in ways it was not designed for.",
          },
        ],
      },
      {
        id: "no-warranty",
        heading: "No warranty and limitation of liability",
        blocks: [
          {
            type: "p",
            text: "The site is provided “as is” and “as available”, without warranties of any kind. To the extent permitted by law, we are not liable for any loss arising from use of the site or reliance on its results.",
          },
        ],
      },
      {
        id: "external-links",
        heading: "External links",
        blocks: [
          {
            type: "p",
            text: "Links to third-party websites are for reference only. Their terms and content are their own responsibility.",
          },
        ],
      },
      {
        id: "content",
        heading: "Site content",
        blocks: [
          {
            type: "p",
            text: "You may share receipts and link to the guides. Please do not republish the guides as your own work.",
          },
        ],
      },
      {
        id: "changes",
        heading: "Changes",
        blocks: [
          {
            type: "p",
            text: "These terms may be updated from time to time. The date at the top shows the latest revision. Continued use of the site means you accept the updated terms.",
          },
        ],
      },
    ],
  },
  ur: {
    title: "استعمال کی شرائط",
    description:
      "حق مہر فائنڈر کے استعمال کی شرائط: معلوماتی استعمال، چاندی کے ریٹ کی آپ کی ذمہ داری، کوئی ضمانت نہیں، بیرونی لنکس اور قابلِ قبول استعمال۔",
    intro:
      "حق مہر فائنڈر استعمال کر کے آپ ان شرائط سے اتفاق کرتے ہیں۔ اگر آپ متفق نہیں تو براہِ کرم سائٹ استعمال نہ کریں۔",
    sections: [
      {
        id: "service",
        heading: "سروس",
        blocks: [
          {
            type: "p",
            text: "حق مہر فائنڈر عمومی معلومات کے لیے مفت کیلکولیٹر، رسیدیں اور رہنمائی فراہم کرتا ہے۔ یہ فتویٰ، شرعی فیصلہ، یا قانونی یا مالی مشورہ نہیں۔ تفصیل کے لیے اعلانِ لاتعلقی دیکھیں۔",
          },
          { type: "link", text: "اعلانِ لاتعلقی پڑھیں", path: "/disclaimer" },
        ],
      },
      {
        id: "your-responsibility",
        heading: "آپ کی ذمہ داری",
        blocks: [
          {
            type: "ul",
            items: [
              "آپ اپنے درج کردہ چاندی کے ریٹ، اکائی اور کرنسی کے، اور ان کی جانچ کے ذمہ دار ہیں۔",
              "نتیجے کا استعمال آپ کا اپنا فیصلہ ہے۔ شرعی یا قانونی فیصلوں کے لیے کسی اہل شخص سے رجوع کریں۔",
              "شیئر کی جانے والی رسیدوں میں ایسی تبدیلی نہ کریں جس سے حساب غلط ظاہر ہو۔",
            ],
          },
        ],
      },
      {
        id: "acceptable-use",
        heading: "قابلِ قبول استعمال",
        blocks: [
          {
            type: "p",
            text: "سائٹ کو غیر قانونی طور پر استعمال نہ کریں، اسے متاثر کرنے یا اس پر حد سے زیادہ بوجھ ڈالنے کی کوشش نہ کریں، اور اسے ان طریقوں سے استعمال کرنے کی کوشش نہ کریں جن کے لیے یہ نہیں بنی۔",
          },
        ],
      },
      {
        id: "no-warranty",
        heading: "کوئی ضمانت نہیں اور ذمہ داری کی حد",
        blocks: [
          {
            type: "p",
            text: "سائٹ ”جیسی ہے“ اور ”جب دستیاب ہو“ کی بنیاد پر کسی بھی قسم کی ضمانت کے بغیر فراہم کی جاتی ہے۔ قانون کی اجازت کی حد تک، ہم سائٹ کے استعمال یا اس کے نتائج پر بھروسے سے ہونے والے کسی نقصان کے ذمہ دار نہیں۔",
          },
        ],
      },
      {
        id: "external-links",
        heading: "بیرونی لنکس",
        blocks: [
          {
            type: "p",
            text: "دوسری ویب سائٹس کے لنکس صرف حوالے کے لیے ہیں۔ ان کی شرائط اور مواد ان کی اپنی ذمہ داری ہے۔",
          },
        ],
      },
      {
        id: "content",
        heading: "سائٹ کا مواد",
        blocks: [
          {
            type: "p",
            text: "آپ رسیدیں شیئر کر سکتے ہیں اور رہنمائی کے صفحات کا لنک دے سکتے ہیں۔ براہِ کرم رہنمائی کو اپنے کام کے طور پر دوبارہ شائع نہ کریں۔",
          },
        ],
      },
      {
        id: "changes",
        heading: "تبدیلیاں",
        blocks: [
          {
            type: "p",
            text: "ان شرائط میں وقتاً فوقتاً تبدیلی ہو سکتی ہے۔ اوپر دی گئی تاریخ تازہ ترین نظرِ ثانی بتاتی ہے۔ سائٹ کا استعمال جاری رکھنے کا مطلب ہے کہ آپ تازہ شرائط قبول کرتے ہیں۔",
          },
        ],
      },
    ],
  },
  ar: {
    title: "شروط الاستخدام",
    description:
      "شروط استخدام حاسبة حق المهر: الاستخدام للعلم، ومسؤوليتك عن سعر الفضة، وعدم الضمان، والروابط الخارجية، والاستخدام المقبول.",
    intro:
      "باستخدامك حاسبة حق المهر فإنك توافق على هذه الشروط. إن لم توافق فيُرجى عدم استخدام الموقع.",
    sections: [
      {
        id: "service",
        heading: "الخدمة",
        blocks: [
          {
            type: "p",
            text: "تقدّم حاسبة حق المهر حاسبة وإيصالات وأدلة مجانية للمعلومات العامة. وهي ليست فتوى ولا حكمًا شرعيًا ولا استشارة قانونية أو مالية. انظر إخلاء المسؤولية للتفاصيل.",
          },
          { type: "link", text: "اقرأ إخلاء المسؤولية", path: "/disclaimer" },
        ],
      },
      {
        id: "your-responsibility",
        heading: "مسؤوليتك",
        blocks: [
          {
            type: "ul",
            items: [
              "أنت مسؤول عن سعر الفضة والوحدة والعملة التي تُدخلها وعن التحقق منها.",
              "قرار استخدام النتيجة يعود إليك. وللقرارات الشرعية أو القانونية استشر شخصًا مؤهلًا.",
              "لا تعدّل الإيصالات التي تشاركها بما يُظهر الحساب على غير حقيقته.",
            ],
          },
        ],
      },
      {
        id: "acceptable-use",
        heading: "الاستخدام المقبول",
        blocks: [
          {
            type: "p",
            text: "لا تستخدم الموقع بشكل غير قانوني، ولا تحاول تعطيله أو إثقاله، ولا تحاول الوصول إليه بطرق لم يُصمم لها.",
          },
        ],
      },
      {
        id: "no-warranty",
        heading: "عدم الضمان وحدود المسؤولية",
        blocks: [
          {
            type: "p",
            text: "يُقدَّم الموقع «كما هو» و«حسب توفّره» دون أي ضمانات. وفي الحدود التي يسمح بها القانون، لسنا مسؤولين عن أي خسارة تنشأ عن استخدام الموقع أو الاعتماد على نتائجه.",
          },
        ],
      },
      {
        id: "external-links",
        heading: "الروابط الخارجية",
        blocks: [
          {
            type: "p",
            text: "الروابط إلى مواقع الغير للاطلاع فقط، وشروطها ومحتواها من مسؤوليتها.",
          },
        ],
      },
      {
        id: "content",
        heading: "محتوى الموقع",
        blocks: [
          {
            type: "p",
            text: "يمكنك مشاركة الإيصالات ووضع روابط إلى الأدلة. يُرجى عدم إعادة نشر الأدلة على أنها من عملك.",
          },
        ],
      },
      {
        id: "changes",
        heading: "التغييرات",
        blocks: [
          {
            type: "p",
            text: "قد تُحدَّث هذه الشروط من وقت لآخر. ويُظهر التاريخ في الأعلى آخر مراجعة. واستمرارك في استخدام الموقع يعني قبولك الشروط المحدّثة.",
          },
        ],
      },
    ],
  },
};
