import type { Localized, PageContent } from "../types";

export const contact: Localized<PageContent> = {
  en: {
    title: "Contact",
    description:
      "How to contact Haq Mahr Finder about corrections, translations, broken links or suggestions.",
    intro:
      "Corrections and suggestions help keep the site accurate. You can reach us by email.",
    sections: [
      {
        id: "email",
        heading: "Email",
        blocks: [{ type: "email", label: "Email:" }],
      },
      {
        id: "what-to-send",
        heading: "Useful things to tell us",
        blocks: [
          {
            type: "ul",
            items: [
              "A calculation or conversion you believe is wrong, with the rate and currency you used.",
              "A translation error in Urdu or Arabic.",
              "A broken or outdated link.",
              "A published source that gives a different figure.",
            ],
          },
          {
            type: "note",
            tone: "info",
            text: "We cannot answer religious questions or issue fatwas. For those, please consult a qualified scholar.",
          },
        ],
      },
    ],
  },
  ur: {
    title: "رابطہ",
    description:
      "تصحیح، ترجمے، خراب لنکس یا تجاویز کے لیے حق مہر فائنڈر سے رابطہ کرنے کا طریقہ۔",
    intro:
      "تصحیح اور تجاویز سائٹ کو درست رکھنے میں مدد دیتی ہیں۔ آپ ہم سے ای میل کے ذریعے رابطہ کر سکتے ہیں۔",
    sections: [
      {
        id: "email",
        heading: "ای میل",
        blocks: [{ type: "email", label: "ای میل:" }],
      },
      {
        id: "what-to-send",
        heading: "ہمیں کیا بتائیں",
        blocks: [
          {
            type: "ul",
            items: [
              "کوئی حساب یا تبدیلی جو آپ کے خیال میں غلط ہو، استعمال کیے گئے ریٹ اور کرنسی کے ساتھ۔",
              "اردو یا عربی ترجمے کی کوئی غلطی۔",
              "کوئی خراب یا پرانا لنک۔",
              "کوئی شائع شدہ ذریعہ جو مختلف مقدار بتاتا ہو۔",
            ],
          },
          {
            type: "note",
            tone: "info",
            text: "ہم شرعی سوالات کے جواب یا فتویٰ نہیں دے سکتے۔ اس کے لیے براہِ کرم کسی مستند عالم سے رجوع کریں۔",
          },
        ],
      },
    ],
  },
  ar: {
    title: "اتصل بنا",
    description:
      "كيفية التواصل مع حاسبة حق المهر بشأن التصحيحات أو الترجمات أو الروابط المعطلة أو الاقتراحات.",
    intro:
      "تساعد التصحيحات والاقتراحات على إبقاء الموقع دقيقًا. يمكنك مراسلتنا بالبريد الإلكتروني.",
    sections: [
      {
        id: "email",
        heading: "البريد الإلكتروني",
        blocks: [{ type: "email", label: "البريد الإلكتروني:" }],
      },
      {
        id: "what-to-send",
        heading: "ما يفيدنا أن تخبرنا به",
        blocks: [
          {
            type: "ul",
            items: [
              "حساب أو تحويل تعتقد أنه خاطئ، مع السعر والعملة اللذين استخدمتهما.",
              "خطأ في الترجمة الأردية أو العربية.",
              "رابط معطّل أو قديم.",
              "مصدر منشور يذكر رقمًا مختلفًا.",
            ],
          },
          {
            type: "note",
            tone: "info",
            text: "لا نستطيع الإجابة عن الأسئلة الشرعية أو إصدار الفتاوى. لذلك يُرجى سؤال عالم مؤهل.",
          },
        ],
      },
    ],
  },
};
