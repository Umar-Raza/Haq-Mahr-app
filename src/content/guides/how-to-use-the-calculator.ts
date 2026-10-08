import type { GuideContent } from "./types";
import type { Localized } from "../types";

export const howToUseTheCalculator: Localized<GuideContent> = {
  en: {
    title: "How to use the Haq Mahr calculator",
    description:
      "Step-by-step guide to the Haq Mahr Finder calculator: entering a silver rate, choosing a currency and unit, and saving or sharing the receipt.",
    summary:
      "Enter today's silver rate, check the receipt, then download, share or save it. It takes under a minute.",
    intro:
      "The calculator works out the value of 10 Dirhams of silver (2 Tola 7.5 Masha, taken as 30.618 g) from a silver rate that you enter yourself. Nothing is fetched automatically, so the result is only as current as the rate you type.",
    sections: [
      {
        id: "steps",
        heading: "Step by step",
        blocks: [
          {
            type: "ol",
            items: [
              "Find today's silver rate from a source you trust, and note whether it is quoted per Tola or per gram.",
              "Under “Rate basis”, choose Per Tola or Per Gram to match that quote.",
              "Type the rate as a plain number, for example 5555 or 245.50. Commas are fine; currency symbols are not needed.",
              "Pick the currency the rate is quoted in. The search box accepts a code (PKR), a country's currency name, or part of it.",
              "Read the result on the receipt. It updates as you type, so there is nothing to submit.",
            ],
          },
          {
            type: "link",
            text: "Open the calculator",
            path: "",
          },
        ],
      },
      {
        id: "reading-the-receipt",
        heading: "Reading the receipt",
        blocks: [
          {
            type: "ul",
            items: [
              "Estimated value: the rate multiplied by the reference weight, always rounded up to the currency's smallest unit (for example 0.01 for PKR).",
              "Silver rate: the rate exactly as you entered it.",
              "Reference weight: 10 Dirhams shown in Tola, Masha or grams. Change the unit with “Show reference weight in”; the amount does not change.",
            ],
          },
          {
            type: "note",
            tone: "info",
            text: "The currency is only a label. The calculator never converts between currencies, so enter the rate in the same currency you want the result in.",
          },
        ],
      },
      {
        id: "sharing",
        heading: "Download, share or copy",
        blocks: [
          {
            type: "ul",
            items: [
              "Download saves an image of the receipt (PNG).",
              "Share opens your device's share sheet where available. If the device cannot share, the result text is copied instead.",
              "WhatsApp opens WhatsApp with the result text ready to send.",
              "Copy offers two versions: Formatted, with every detail on its own line, or Short, a single line with the amount and the rate.",
            ],
          },
        ],
      },
      {
        id: "history",
        heading: "Saving to history",
        blocks: [
          {
            type: "p",
            text: "Choose “Save to history” to keep a calculation in this browser. On the History page you can open it again in the calculator, delete it, or clear everything. History stays on your device only and can be lost if you clear your browser data.",
          },
          { type: "link", text: "Go to History", path: "/history" },
        ],
      },
      {
        id: "good-to-know",
        heading: "Good to know",
        blocks: [
          {
            type: "ul",
            items: [
              "Rates can have up to 4 decimal places.",
              "Clear resets the rate so you can start again.",
              "The result is an informational estimate, not a fatwa or legal ruling. If you are unsure which figure applies to you, ask a qualified scholar.",
            ],
          },
        ],
      },
    ],
  },
  ur: {
    title: "حق مہر کیلکولیٹر استعمال کرنے کا طریقہ",
    description:
      "حق مہر فائنڈر کیلکولیٹر کی مرحلہ وار رہنمائی: چاندی کا ریٹ درج کرنا، کرنسی اور اکائی منتخب کرنا، اور رسید محفوظ یا شیئر کریں کرنا۔",
    summary:
      "آج کا چاندی کا ریٹ درج کریں، رسید دیکھیں، پھر اسے ڈاؤن لوڈ، شیئر یا محفوظ کریں۔ ایک منٹ سے کم وقت لگتا ہے۔",
    intro:
      "یہ کیلکولیٹر 10 درہم چاندی (2 تولہ 7.5 ماشہ، یعنی 30.618 گرام) کی قیمت اس ریٹ سے نکالتا ہے جو آپ خود درج کرتے ہیں۔ کوئی ریٹ خودکار طور پر نہیں لیا جاتا، اس لیے نتیجہ اتنا ہی تازہ ہوتا ہے جتنا آپ کا درج کیا ہوا ریٹ۔",
    sections: [
      {
        id: "steps",
        heading: "مرحلہ وار طریقہ",
        blocks: [
          {
            type: "ol",
            items: [
              "کسی قابلِ اعتماد ذریعے سے آج کا چاندی کا ریٹ معلوم کریں، اور دیکھیں کہ ریٹ فی تولہ ہے یا فی گرام۔",
              "”ریٹ کس حساب سے“ میں اسی کے مطابق فی تولہ یا فی گرام منتخب کریں۔",
              "ریٹ سادہ عدد کی صورت میں لکھیں، مثلاً 5555 یا 245.50۔ کوما لگا سکتے ہیں؛ کرنسی کا نشان لکھنے کی ضرورت نہیں۔",
              "وہ کرنسی منتخب کریں جس میں ریٹ بتایا گیا ہے۔ تلاش کے خانے میں کوڈ (PKR) یا کرنسی کا نام یا اس کا کچھ حصہ لکھ سکتے ہیں۔",
              "نتیجہ رسید پر دیکھیں۔ یہ لکھتے ساتھ ہی بدلتا ہے، کوئی بٹن دبانے کی ضرورت نہیں۔",
            ],
          },
          { type: "link", text: "کیلکولیٹر کھولیں", path: "" },
        ],
      },
      {
        id: "reading-the-receipt",
        heading: "رسید کو سمجھنا",
        blocks: [
          {
            type: "ul",
            items: [
              "اندازاً مالیت: ریٹ ضرب حوالہ وزن، جو ہمیشہ کرنسی کی سب سے چھوٹی اکائی تک اوپر کی طرف گول کیا جاتا ہے (مثلاً PKR میں 0.01)۔",
              "چاندی کا ریٹ: بالکل وہی ریٹ جو آپ نے درج کیا۔",
              "حوالہ وزن: 10 درہم، تولہ، ماشہ یا گرام میں۔ اکائی ”حوالہ جاتی وزن اس اکائی میں دکھائیں“ سے بدلیں؛ رقم نہیں بدلتی۔",
            ],
          },
          {
            type: "note",
            tone: "info",
            text: "کرنسی صرف ایک لیبل ہے۔ کیلکولیٹر کبھی ایک کرنسی کو دوسری میں تبدیل نہیں کرتا، اس لیے ریٹ اسی کرنسی میں درج کریں جس میں نتیجہ چاہیے۔",
          },
        ],
      },
      {
        id: "sharing",
        heading: "ڈاؤن لوڈ، شیئر یا کاپی",
        blocks: [
          {
            type: "ul",
            items: [
              "ڈاؤن لوڈ کریں سے رسید کی تصویر (PNG) محفوظ ہوتی ہے۔",
              "شیئر جہاں ممکن ہو آپ کی ڈیوائس کا شیئر مینو کھولتا ہے۔ اگر ڈیوائس شیئر نہ کر سکے تو نتیجے کا متن کاپی ہو جاتا ہے۔",
              "واٹس ایپ نتیجے کے متن کے ساتھ واٹس ایپ کھولتا ہے۔",
              "کاپی کریں میں دو انتخاب ہیں: تفصیلی، جس میں ہر تفصیل الگ لائن میں ہوتی ہے، یا مختصر، جس میں رقم اور ریٹ ایک لائن میں ہوتے ہیں۔",
            ],
          },
        ],
      },
      {
        id: "history",
        heading: "ہسٹری میں محفوظ کرنا",
        blocks: [
          {
            type: "p",
            text: "کسی حساب کو اس براؤزر میں رکھنے کے لیے ”ہسٹری میں محفوظ کریں“ منتخب کریں۔ ہسٹری کے صفحے پر آپ اسے دوبارہ کیلکولیٹر میں کھول سکتے ہیں، حذف کر سکتے ہیں یا سب صاف کر سکتے ہیں۔ ہسٹری صرف آپ کی ڈیوائس پر رہتی ہے اور براؤزر کا ڈیٹا صاف کرنے سے مٹ سکتی ہے۔",
          },
          { type: "link", text: "ہسٹری پر جائیں", path: "/history" },
        ],
      },
      {
        id: "good-to-know",
        heading: "مفید باتیں",
        blocks: [
          {
            type: "ul",
            items: [
              "ریٹ میں زیادہ سے زیادہ 4 اعشاری ہندسے ہو سکتے ہیں۔",
              "صاف کریں سے ریٹ مٹ جاتا ہے تاکہ آپ نئے سرے سے شروع کر سکیں۔",
              "نتیجہ صرف معلوماتی اندازہ ہے، فتویٰ یا قانونی فیصلہ نہیں۔ اگر یقین نہ ہو کہ آپ کے لیے کون سی مقدار درست ہے تو کسی مستند عالم سے رجوع کریں۔",
            ],
          },
        ],
      },
    ],
  },
  ar: {
    title: "كيفية استخدام حاسبة حق المهر",
    description:
      "دليل خطوة بخطوة لحاسبة حق المهر: إدخال سعر الفضة، واختيار العملة والوحدة، وحفظ الإيصال أو مشاركته.",
    summary:
      "أدخل سعر الفضة اليوم، وراجع الإيصال، ثم نزّله أو شاركه أو احفظه. لا يستغرق ذلك أكثر من دقيقة.",
    intro:
      "تحسب هذه الأداة قيمة 10 دراهم من الفضة (2 تولة و7.5 ماشة، أي 30.618 غرامًا) بناءً على سعر فضة تُدخله بنفسك. لا يُجلب أي سعر تلقائيًا، لذا تكون النتيجة حديثة بقدر حداثة السعر الذي تكتبه.",
    sections: [
      {
        id: "steps",
        heading: "الخطوات",
        blocks: [
          {
            type: "ol",
            items: [
              "اعرف سعر الفضة اليوم من مصدر تثق به، ولاحظ هل السعر للتولة أم للغرام.",
              "في «أساس السعر» اختر «لكل تولة» أو «لكل غرام» بحسب ذلك.",
              "اكتب السعر رقمًا بسيطًا، مثل 5555 أو 245.50. يمكن استخدام الفواصل، ولا حاجة إلى رمز العملة.",
              "اختر العملة التي ذُكر بها السعر. يقبل مربع البحث رمز العملة (PKR) أو اسمها أو جزءًا منه.",
              "اقرأ النتيجة في الإيصال. تتحدّث أثناء الكتابة، فلا حاجة إلى زر إرسال.",
            ],
          },
          { type: "link", text: "افتح الحاسبة", path: "" },
        ],
      },
      {
        id: "reading-the-receipt",
        heading: "قراءة الإيصال",
        blocks: [
          {
            type: "ul",
            items: [
              "القيمة التقديرية: السعر مضروبًا في الوزن المرجعي، مقرّبًا دائمًا إلى الأعلى لأصغر وحدة في العملة (مثل 0.01 للروبية الباكستانية).",
              "سعر الفضة: السعر كما أدخلته تمامًا.",
              "الوزن المرجعي: 10 دراهم بالتولة أو الماشة أو الغرام. غيّر الوحدة من «اعرض الوزن المرجعي بوحدة»؛ ولا يتغيّر المبلغ.",
            ],
          },
          {
            type: "note",
            tone: "info",
            text: "العملة مجرد تسمية. لا تحوّل الحاسبة بين العملات أبدًا، لذا أدخل السعر بالعملة نفسها التي تريد النتيجة بها.",
          },
        ],
      },
      {
        id: "sharing",
        heading: "التنزيل والمشاركة والنسخ",
        blocks: [
          {
            type: "ul",
            items: [
              "تنزيل يحفظ صورة للإيصال (PNG).",
              "مشاركة تفتح قائمة المشاركة في جهازك حيث تتوفر. وإن تعذّرت المشاركة يُنسخ نص النتيجة بدلًا من ذلك.",
              "واتساب يفتح واتساب ونص النتيجة جاهز للإرسال.",
              "نسخ يتيح نسختين: مفصّل، وفيه كل تفصيل في سطر مستقل، أو مختصر، وهو سطر واحد بالمبلغ والسعر.",
            ],
          },
        ],
      },
      {
        id: "history",
        heading: "الحفظ في السجل",
        blocks: [
          {
            type: "p",
            text: "اختر «حفظ في السجل» للاحتفاظ بالحساب في هذا المتصفح. في صفحة السجل يمكنك فتحه مجددًا في الحاسبة أو حذفه أو مسح الكل. يبقى السجل على جهازك فقط وقد يضيع إذا مسحت بيانات المتصفح.",
          },
          { type: "link", text: "اذهب إلى السجل", path: "/history" },
        ],
      },
      {
        id: "good-to-know",
        heading: "معلومات مفيدة",
        blocks: [
          {
            type: "ul",
            items: [
              "يمكن أن يحتوي السعر على 4 منازل عشرية كحد أقصى.",
              "زر «مسح» يزيل السعر لتبدأ من جديد.",
              "النتيجة تقدير للعلم فقط، وليست فتوى ولا حكمًا قانونيًا. إن لم تكن متأكدًا من المقدار الذي ينطبق عليك فاسأل عالمًا مؤهلًا.",
            ],
          },
        ],
      },
    ],
  },
};
