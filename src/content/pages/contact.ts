import type { Localized, PageContent } from "../types";

export const contact: Localized<PageContent> = {
  en: {
    title: "Contact",
    description:
      "Contact Haq Mahr Finder by email or WhatsApp about corrections, translations, broken links, suggestions or booking a Qazi.",
    intro:
      "Spotted a mistake or have a suggestion? Get in touch by email or WhatsApp. It helps us keep the site accurate.",
    sections: [
      {
        id: "reach-us",
        heading: "Email and WhatsApp",
        blocks: [
          { type: "email", label: "Email:" },
          { type: "whatsapp", label: "WhatsApp:" },
        ],
      },
      {
        id: "what-to-send",
        heading: "What's useful to tell us",
        blocks: [
          {
            type: "ul",
            items: [
              "A calculation or conversion you think is wrong, with the rate and currency you used.",
              "A mistake in the Urdu or Arabic translation.",
              "A broken or outdated link.",
              "A published source that gives a different figure.",
            ],
          },
          {
            type: "note",
            tone: "info",
            text: "We can't answer religious questions or give fatwas. Please ask a qualified scholar for those.",
          },
        ],
      },
    ],
  },
  ur: {
    title: "رابطہ",
    description:
      "تصحیح، ترجمے، خراب لنکس، تجاویز یا قاضی کی بکنگ کے لیے ای میل یا واٹس ایپ پر حق مہر فائنڈر سے رابطہ کریں۔",
    intro:
      "کوئی غلطی نظر آئی یا کوئی تجویز ہے؟ ای میل یا واٹس ایپ پر ہم سے رابطہ کریں۔ اس سے سائٹ کو درست رکھنے میں مدد ملتی ہے۔",
    sections: [
      {
        id: "reach-us",
        heading: "ای میل اور واٹس ایپ",
        blocks: [
          { type: "email", label: "ای میل:" },
          { type: "whatsapp", label: "واٹس ایپ:" },
        ],
      },
      {
        id: "what-to-send",
        heading: "ہمیں کیا بتائیں",
        blocks: [
          {
            type: "ul",
            items: [
              "کوئی حساب یا تبدیلی جو آپ کے خیال میں غلط ہو، جو ریٹ اور کرنسی آپ نے استعمال کی اس کے ساتھ۔",
              "اردو یا عربی ترجمے کی کوئی غلطی۔",
              "کوئی خراب یا پرانا لنک۔",
              "کوئی شائع شدہ سورس جو مختلف مقدار بتاتا ہو۔",
            ],
          },
          {
            type: "note",
            tone: "info",
            text: "ہم شرعی سوالات کے جواب یا فتویٰ نہیں دیتے۔ اس کے لیے کسی مستند عالم سے رجوع کریں۔",
          },
        ],
      },
    ],
  },
  ar: {
    title: "اتصل بنا",
    description:
      "تواصل مع حاسبة حق المهر عبر البريد الإلكتروني أو واتساب بشأن تصحيح أو ترجمة أو رابط معطّل أو اقتراح أو حجز مأذون.",
    intro:
      "لاحظت خطأً أو لديك اقتراح؟ راسلنا عبر البريد الإلكتروني أو واتساب، فهذا يساعدنا على إبقاء الموقع دقيقًا.",
    sections: [
      {
        id: "reach-us",
        heading: "البريد الإلكتروني وواتساب",
        blocks: [
          { type: "email", label: "البريد الإلكتروني:" },
          { type: "whatsapp", label: "واتساب:" },
        ],
      },
      {
        id: "what-to-send",
        heading: "ما يفيدنا أن تخبرنا به",
        blocks: [
          {
            type: "ul",
            items: [
              "حساب أو تحويل ترى أنه خاطئ، مع السعر والعملة اللذين استخدمتهما.",
              "خطأ في الترجمة الأردية أو العربية.",
              "رابط معطّل أو قديم.",
              "مصدر منشور يذكر رقمًا مختلفًا.",
            ],
          },
          {
            type: "note",
            tone: "info",
            text: "لا نجيب عن الأسئلة الشرعية ولا نصدر فتاوى، فاسأل عنها عالمًا مؤهلًا.",
          },
        ],
      },
    ],
  },
};
