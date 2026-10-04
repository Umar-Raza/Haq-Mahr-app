import type { Localized, PageContent } from "../types";

// Keep in sync with the code: storage keys hmf-theme and hmf-history; no cookies,
// analytics or ads yet; fonts are self-hosted by next/font.
export const privacyPolicy: Localized<PageContent> = {
  en: {
    title: "Privacy Policy",
    description:
      "How Haq Mahr Finder handles your data: no account, no cookies set by the site, and history and theme kept only in your browser.",
    intro:
      "Haq Mahr Finder is designed to work without collecting personal information. This policy explains what is stored, where, and what happens when you share a result.",
    sections: [
      {
        id: "no-account",
        heading: "No account, no forms",
        blocks: [
          {
            type: "p",
            text: "You do not need to sign up or give your name to use the site. Calculations happen in your browser; the silver rate you type is not sent to our server.",
          },
        ],
      },
      {
        id: "browser-storage",
        heading: "What is stored in your browser",
        blocks: [
          {
            type: "ul",
            items: [
              "Theme: your light or dark choice, so the site looks the same on your next visit.",
              "History: only if you choose “Save to history”. Each entry holds the rate, rate basis, currency, display unit, result, calculation version and the date saved. No names or personal details.",
            ],
          },
          {
            type: "p",
            text: "This data stays in your browser's local storage on your device. It is not sent to us. You can delete history on the History page, or remove everything by clearing this site's data in your browser settings.",
          },
          { type: "link", text: "Manage your history", path: "/history" },
        ],
      },
      {
        id: "cookies-analytics-ads",
        heading: "Cookies, analytics and ads",
        blocks: [
          {
            type: "p",
            text: "The site currently sets no cookies and uses no analytics or advertising services. If that changes, this policy will be updated before the change takes effect, and any required consent will be requested.",
          },
        ],
      },
      {
        id: "hosting",
        heading: "Hosting",
        blocks: [
          {
            type: "p",
            text: "Like most websites, the service that hosts this site may automatically process technical data such as your IP address, browser type and the pages requested, in order to deliver and secure the site.",
          },
        ],
      },
      {
        id: "sharing",
        heading: "When you share a result",
        blocks: [
          {
            type: "p",
            text: "If you use Share or WhatsApp, the result text or image is passed to the app or service you choose. That service's own privacy policy then applies. Nothing is shared unless you choose to share it.",
          },
        ],
      },
      {
        id: "external-links",
        heading: "External links",
        blocks: [
          {
            type: "p",
            text: "Sources and other external links open sites we do not control. Their privacy practices are their own.",
          },
        ],
      },
      {
        id: "changes",
        heading: "Changes to this policy",
        blocks: [
          {
            type: "p",
            text: "If this policy changes, the date at the top of the page will be updated.",
          },
        ],
      },
    ],
  },
  ur: {
    title: "پرائیویسی پالیسی",
    description:
      "حق مہر فائنڈر آپ کے ڈیٹا کو کیسے سنبھالتا ہے: کوئی اکاؤنٹ نہیں، سائٹ کی طرف سے کوئی کوکی نہیں، اور ہسٹری اور تھیم صرف آپ کے براؤزر میں۔",
    intro:
      "حق مہر فائنڈر ذاتی معلومات جمع کیے بغیر کام کرنے کے لیے بنایا گیا ہے۔ یہ پالیسی بتاتی ہے کہ کیا محفوظ ہوتا ہے، کہاں، اور نتیجہ شیئر کرنے پر کیا ہوتا ہے۔",
    sections: [
      {
        id: "no-account",
        heading: "نہ اکاؤنٹ، نہ فارم",
        blocks: [
          {
            type: "p",
            text: "سائٹ استعمال کرنے کے لیے سائن اپ کرنے یا نام دینے کی ضرورت نہیں۔ حساب آپ کے براؤزر میں ہوتا ہے؛ آپ کا لکھا ہوا چاندی کا ریٹ ہمارے سرور پر نہیں بھیجا جاتا۔",
          },
        ],
      },
      {
        id: "browser-storage",
        heading: "آپ کے براؤزر میں کیا محفوظ ہوتا ہے",
        blocks: [
          {
            type: "ul",
            items: [
              "تھیم: آپ کا لائٹ یا ڈارک انتخاب، تاکہ اگلی بار سائٹ ویسی ہی نظر آئے۔",
              "ہسٹری: صرف اس صورت میں جب آپ ”ہسٹری میں محفوظ کریں“ منتخب کریں۔ ہر اندراج میں ریٹ، ریٹ کی بنیاد، کرنسی، دکھائی جانے والی اکائی، نتیجہ، حساب کا ورژن اور محفوظ کرنے کی تاریخ ہوتی ہے۔ کوئی نام یا ذاتی معلومات نہیں۔",
            ],
          },
          {
            type: "p",
            text: "یہ ڈیٹا آپ کی ڈیوائس پر براؤزر کی لوکل اسٹوریج میں رہتا ہے اور ہمیں نہیں بھیجا جاتا۔ ہسٹری کو ہسٹری کے صفحے سے حذف کر سکتے ہیں، یا براؤزر کی سیٹنگز میں اس سائٹ کا ڈیٹا صاف کر کے سب کچھ ہٹا سکتے ہیں۔",
          },
          { type: "link", text: "اپنی ہسٹری دیکھیں", path: "/history" },
        ],
      },
      {
        id: "cookies-analytics-ads",
        heading: "کوکیز، اینالیٹکس اور اشتہارات",
        blocks: [
          {
            type: "p",
            text: "یہ سائٹ فی الحال کوئی کوکی نہیں لگاتی اور نہ کوئی اینالیٹکس یا اشتہاری سروس استعمال کرتی ہے۔ اگر اس میں تبدیلی ہوئی تو تبدیلی سے پہلے یہ پالیسی اپ ڈیٹ کی جائے گی، اور جہاں ضروری ہو اجازت طلب کی جائے گی۔",
          },
        ],
      },
      {
        id: "hosting",
        heading: "ہوسٹنگ",
        blocks: [
          {
            type: "p",
            text: "زیادہ تر ویب سائٹس کی طرح، اس سائٹ کو ہوسٹ کرنے والی سروس سائٹ کی فراہمی اور حفاظت کے لیے خودکار طور پر تکنیکی ڈیٹا، جیسے آپ کا IP ایڈریس، براؤزر کی قسم اور طلب کیے گئے صفحات، پراسیس کر سکتی ہے۔",
          },
        ],
      },
      {
        id: "sharing",
        heading: "جب آپ نتیجہ شیئر کریں",
        blocks: [
          {
            type: "p",
            text: "اگر آپ شیئر یا واٹس ایپ استعمال کریں تو نتیجے کا متن یا تصویر آپ کی منتخب کردہ ایپ یا سروس کو دی جاتی ہے، اور اس پر اس سروس کی اپنی پرائیویسی پالیسی لاگو ہوتی ہے۔ آپ کے منتخب کیے بغیر کچھ شیئر نہیں ہوتا۔",
          },
        ],
      },
      {
        id: "external-links",
        heading: "بیرونی لنکس",
        blocks: [
          {
            type: "p",
            text: "ذرائع اور دیگر بیرونی لنکس ایسی سائٹس کھولتے ہیں جو ہمارے اختیار میں نہیں۔ ان کے پرائیویسی کے طریقے ان کے اپنے ہیں۔",
          },
        ],
      },
      {
        id: "changes",
        heading: "اس پالیسی میں تبدیلی",
        blocks: [
          {
            type: "p",
            text: "اگر یہ پالیسی بدلی تو صفحے کے اوپر دی گئی تاریخ اپ ڈیٹ کر دی جائے گی۔",
          },
        ],
      },
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    description:
      "كيف تتعامل حاسبة حق المهر مع بياناتك: بلا حساب مستخدم، ولا ملفات تعريف ارتباط من الموقع، والسجل والمظهر محفوظان في متصفحك فقط.",
    intro:
      "صُممت حاسبة حق المهر لتعمل دون جمع معلومات شخصية. توضح هذه السياسة ما يُحفظ وأين، وما يحدث عند مشاركة نتيجة.",
    sections: [
      {
        id: "no-account",
        heading: "بلا حساب ولا نماذج",
        blocks: [
          {
            type: "p",
            text: "لا تحتاج إلى التسجيل أو ذكر اسمك لاستخدام الموقع. يجري الحساب في متصفحك، ولا يُرسل سعر الفضة الذي تكتبه إلى خادمنا.",
          },
        ],
      },
      {
        id: "browser-storage",
        heading: "ما يُحفظ في متصفحك",
        blocks: [
          {
            type: "ul",
            items: [
              "المظهر: اختيارك للوضع الفاتح أو الداكن، ليظهر الموقع بالشكل نفسه في زيارتك التالية.",
              "السجل: فقط إذا اخترت «حفظ في السجل». يحتوي كل إدخال على السعر وأساسه والعملة ووحدة العرض والنتيجة وإصدار الحساب وتاريخ الحفظ، دون أي أسماء أو بيانات شخصية.",
            ],
          },
          {
            type: "p",
            text: "تبقى هذه البيانات في التخزين المحلي لمتصفحك على جهازك ولا تُرسل إلينا. يمكنك حذف السجل من صفحة السجل، أو إزالة كل شيء بمسح بيانات هذا الموقع من إعدادات المتصفح.",
          },
          { type: "link", text: "إدارة سجلك", path: "/history" },
        ],
      },
      {
        id: "cookies-analytics-ads",
        heading: "ملفات تعريف الارتباط والتحليلات والإعلانات",
        blocks: [
          {
            type: "p",
            text: "لا يضع الموقع حاليًا أي ملفات تعريف ارتباط ولا يستخدم خدمات تحليلات أو إعلانات. وإن تغيّر ذلك فستُحدَّث هذه السياسة قبل سريان التغيير، وتُطلب الموافقة حيث يلزم.",
          },
        ],
      },
      {
        id: "hosting",
        heading: "الاستضافة",
        blocks: [
          {
            type: "p",
            text: "كمعظم المواقع، قد تعالج خدمة الاستضافة تلقائيًا بيانات تقنية مثل عنوان IP ونوع المتصفح والصفحات المطلوبة، لتقديم الموقع وحمايته.",
          },
        ],
      },
      {
        id: "sharing",
        heading: "عند مشاركة نتيجة",
        blocks: [
          {
            type: "p",
            text: "إذا استخدمت المشاركة أو واتساب، يُمرَّر نص النتيجة أو صورتها إلى التطبيق أو الخدمة التي تختارها، وتسري عندئذ سياسة الخصوصية الخاصة بها. لا يُشارك شيء ما لم تختر مشاركته.",
          },
        ],
      },
      {
        id: "external-links",
        heading: "الروابط الخارجية",
        blocks: [
          {
            type: "p",
            text: "تفتح المصادر والروابط الخارجية الأخرى مواقع لا نتحكم فيها، ولها ممارسات خصوصية خاصة بها.",
          },
        ],
      },
      {
        id: "changes",
        heading: "التغييرات على هذه السياسة",
        blocks: [
          {
            type: "p",
            text: "إذا تغيّرت هذه السياسة فسيُحدَّث التاريخ المذكور أعلى الصفحة.",
          },
        ],
      },
    ],
  },
};
