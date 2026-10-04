import type { GuideContent } from "./types";
import type { Localized } from "../types";

// Religious content: every claim here must be supported by a source listed for this guide.
export const minimumHaqMahr10Dirhams: Localized<GuideContent> = {
  en: {
    title: "Minimum Haq Mahr: 10 Dirhams of silver",
    description:
      "The Hanafi ruling on the minimum Haq Mahr of 10 Dirhams of silver (2 Tola 7.5 Masha, 30.618 g), what happens if less is agreed, the classical texts, and how the calculator uses it.",
    summary:
      "In Hanafi fiqh the minimum Mahr is 10 Dirhams of silver, about 30.618 g, even if a smaller amount is agreed. See the texts and where figures differ.",
    intro:
      "Mahr (also written Mehr or Mahar) is the marriage gift owed to the bride. This guide summarises what the sources listed at the end say about its minimum amount, mainly according to the Hanafi school. It is a summary for information, not a fatwa.",
    sections: [
      {
        id: "the-ruling",
        heading: "The ruling",
        blocks: [
          {
            type: "p",
            text: "The minimum Mahr is 10 Dirhams, which is 2 Tola 7.5 Masha (30.618 g) of silver. If the couple agree on less than this, 10 Dirhams is still due.",
          },
          {
            type: "ul",
            items: [
              "Example: if the minimum, in rupees, is 10,000 but the parties set the Mahr at 5,000, the husband must still pay 10,000.",
              "Agreeing on less than the minimum does not by itself stop the marriage from being valid, provided the other conditions of a valid nikah are met.",
              "If more than 10 Dirhams is agreed, the agreed amount is what is due.",
            ],
          },
        ],
      },
      {
        id: "classical-texts",
        heading: "What the classical texts say",
        blocks: [
          {
            type: "ul",
            items: [
              "Badai al-Sanai (al-Kasani): if the named Mahr is less than ten, it is completed to ten according to the three imams of the school.",
              "Tanwir al-Absar with al-Durr al-Mukhtar: 10 Dirhams are due if 10 Dirhams are named, and also if less than that is named.",
              "Hashiyat al-Tahtawi on al-Durr, quoting al-Nahr: Mahr carries two rights, the woman's (anything above ten up to her mahr al-mithl) and the Shariah's (ten). If she accepts less than ten, the Shariah's right remains, so the minimum must be completed.",
              "Bahar-e-Shariat: if 10 Dirhams or less is named in the nikah, 10 Dirhams is due; if more is named, the named amount is due.",
            ],
          },
          {
            type: "note",
            tone: "info",
            text: "These texts are quoted as they appear in the fatwa listed under Sources. Volume and page references are given there.",
          },
        ],
      },
      {
        id: "what-the-sources-say",
        heading: "What the sources say about the weight",
        blocks: [
          {
            type: "ul",
            items: [
              "Fatawa Faqih-e-Millat (Mufti Jalaluddin Amjadi): today's equivalent of 10 Dirhams is 2 Tola 7.5 Masha of silver, which by current weights is 30.618 g.",
            ],
          },
        ],
      },
      {
        id: "tola-and-grams",
        heading: "From 10 Dirhams to Tola and grams",
        blocks: [
          {
            type: "p",
            text: "2 Tola 7.5 Masha is the same weight expressed in the Tola system: 31.5 Masha, or 2.625 Tola. With a Tola of 11.664 g this is 30.618 g, matching the figure in the fatwas above.",
          },
          {
            type: "link",
            text: "Read the Tola, Masha and Gram guide",
            path: "/guides/tola-masha-gram",
          },
        ],
      },
      {
        id: "differences",
        heading: "Why figures differ",
        blocks: [
          {
            type: "p",
            text: "The sources agree on 10 Dirhams but not on the exact weight of one Dirham in grams, so published gram figures vary slightly. Other schools of Islamic law and individual scholars may also hold different views on the minimum itself. This site does not decide between these views.",
          },
          {
            type: "note",
            tone: "warning",
            text: "The minimum is a lower limit, not a recommended or typical amount. For a decision about your own marriage, please consult a qualified scholar.",
          },
        ],
      },
      {
        id: "how-the-calculator-uses-it",
        heading: "How the calculator uses this",
        blocks: [
          {
            type: "p",
            text: "Haq Mahr Finder uses 30.618 g (2.625 Tola) and multiplies it by the silver rate you enter. Because silver prices change, the value of the minimum in money changes too. Check the rate on the day you need the figure.",
          },
          {
            type: "link",
            text: "Calculate with today's silver rate",
            path: "",
          },
        ],
      },
    ],
  },
  ur: {
    title: "کم از کم حق مہر: 10 درہم چاندی",
    description:
      "کم از کم حق مہر 10 درہم چاندی (2 تولہ 7.5 ماشہ، 30.618 گرام) کا حنفی حکم، اس سے کم مقرر کرنے پر کیا ہوگا، کلاسیکی کتب کی عبارات، اور کیلکولیٹر اسے کیسے استعمال کرتا ہے۔",
    summary:
      "فقہِ حنفی میں کم از کم مہر 10 درہم چاندی، تقریباً 30.618 گرام ہے، چاہے اس سے کم طے کیا جائے۔ عبارات اور مقداروں کا فرق دیکھیں۔",
    intro:
      "مہر نکاح میں دلہن کا وہ حق ہے جو اسے ادا کیا جاتا ہے۔ یہ رہنمائی آخر میں دیے گئے ذرائع کی روشنی میں، بنیادی طور پر حنفی مسلک کے مطابق، اس کی کم از کم مقدار کا خلاصہ پیش کرتی ہے۔ یہ صرف معلومات کے لیے خلاصہ ہے، فتویٰ نہیں۔",
    sections: [
      {
        id: "the-ruling",
        heading: "حکم",
        blocks: [
          {
            type: "p",
            text: "مہر کی کم سے کم مقدار 10 درہم یعنی 2 تولے 7.5 ماشے (30.618 گرام) چاندی ہے۔ اگر فریقین اس سے کم مہر مقرر کریں تب بھی 10 درہم مہر ہی واجب ہوگا۔",
          },
          {
            type: "ul",
            items: [
              "مثال: اگر مہر کی کم از کم مقدار روپے میں 10,000 ہو، لیکن فریقین 5,000 مقرر کریں، تو مرد پر 10,000 ادا کرنا لازم ہوگا۔",
              "شرعی مقدار سے کم مہر مقرر کرنے سے نکاح منعقد ہو جاتا ہے، بشرطیکہ نکاح کے منعقد ہونے کی دیگر تمام شرائط پائی جائیں۔",
              "اگر 10 درہم سے زیادہ مقرر کیا جائے تو جو مقرر ہوا وہی واجب ہے۔",
            ],
          },
        ],
      },
      {
        id: "classical-texts",
        heading: "کلاسیکی کتب کیا کہتی ہیں",
        blocks: [
          {
            type: "ul",
            items: [
              "بدائع الصنائع (علامہ کاسانی): مہر اگر دس سے کم مقرر کیا جائے تو ہمارے تینوں ائمہ کے نزدیک دس تک پورا کیا جائے گا۔",
              "تنویر الابصار مع الدر المختار: 10 درہم مقرر کیے ہوں یا اس سے کم، دونوں صورتوں میں 10 درہم مہر واجب ہوگا۔",
              "حاشیۃ الطحطاوی علی الدر (بحوالہ نہر): مہر میں دو حق ہیں: عورت کا حق، یعنی دس سے زائد مہرِ مثل تک، اور شریعت کا حق، یعنی دس۔ عورت دس سے کم پر راضی ہو جائے تب بھی شریعت کا حق باقی رہتا ہے، اس لیے کم از کم مہر کی تکمیل ضروری ہے۔",
              "بہارِ شریعت: نکاح میں 10 درہم یا اس سے کم مہر باندھا گیا تو 10 درہم واجب، اور زیادہ باندھا ہو تو جو مقرر ہوا واجب۔",
            ],
          },
          {
            type: "note",
            tone: "info",
            text: "یہ عبارات اسی طرح نقل کی گئی ہیں جیسے ذرائع میں درج فتوے میں آئی ہیں۔ جلد اور صفحے کے حوالے وہیں دیکھیں۔",
          },
        ],
      },
      {
        id: "what-the-sources-say",
        heading: "وزن کے بارے میں ذرائع کیا کہتے ہیں",
        blocks: [
          {
            type: "ul",
            items: [
              "فتاویٰ فقیہ ملت (مفتی جلال الدین امجدی): 10 درہم کی موجودہ حیثیت 2 تولہ 7.5 ماشہ چاندی کے برابر ہے، جو موجودہ وزن کے حساب سے 30.618 گرام ہے۔",
            ],
          },
        ],
      },
      {
        id: "tola-and-grams",
        heading: "10 درہم سے تولہ اور گرام تک",
        blocks: [
          {
            type: "p",
            text: "2 تولہ 7.5 ماشہ یہی وزن تولے کے نظام میں ہے: 31.5 ماشہ یا 2.625 تولہ۔ 11.664 گرام فی تولہ کے حساب سے یہ 30.618 گرام بنتا ہے، جو اوپر بیان کیے گئے فتاویٰ کی مقدار کے مطابق ہے۔",
          },
          {
            type: "link",
            text: "تولہ، ماشہ اور گرام کی رہنمائی پڑھیں",
            path: "/guides/tola-masha-gram",
          },
        ],
      },
      {
        id: "differences",
        heading: "مقداروں میں فرق کیوں ہے",
        blocks: [
          {
            type: "p",
            text: "ذرائع 10 درہم پر متفق ہیں، لیکن ایک درہم کے گرام میں وزن پر نہیں، اس لیے شائع شدہ گرام کی مقداروں میں معمولی فرق ہے۔ دیگر فقہی مذاہب اور انفرادی علماء کی کم از کم مقدار کے بارے میں رائے بھی مختلف ہو سکتی ہے۔ یہ سائٹ ان آراء میں سے کسی کا فیصلہ نہیں کرتی۔",
          },
          {
            type: "note",
            tone: "warning",
            text: "کم از کم مقدار ایک نچلی حد ہے، تجویز کردہ یا عام مقدار نہیں۔ اپنے نکاح سے متعلق فیصلے کے لیے کسی مستند عالم سے رجوع کریں۔",
          },
        ],
      },
      {
        id: "how-the-calculator-uses-it",
        heading: "کیلکولیٹر اسے کیسے استعمال کرتا ہے",
        blocks: [
          {
            type: "p",
            text: "حق مہر فائنڈر 30.618 گرام (2.625 تولہ) کو آپ کے درج کردہ چاندی کے ریٹ سے ضرب دیتا ہے۔ چونکہ چاندی کی قیمت بدلتی رہتی ہے، اس لیے کم از کم مقدار کی رقم بھی بدلتی ہے۔ جس دن مقدار درکار ہو اسی دن کا ریٹ دیکھیں۔",
          },
          { type: "link", text: "آج کے چاندی کے ریٹ سے حساب کریں", path: "" },
        ],
      },
    ],
  },
  ar: {
    title: "الحد الأدنى لحق المهر: 10 دراهم من الفضة",
    description:
      "الحكم الحنفي في الحد الأدنى للمهر بـ10 دراهم من الفضة (2 تولة و7.5 ماشة، أي 30.618 غرامًا)، وما يجب إن سُمّي أقل منها، ونصوص الكتب المعتمدة، وكيف تستخدمها الحاسبة.",
    summary:
      "في الفقه الحنفي أقل المهر 10 دراهم من الفضة، أي نحو 30.618 غرامًا، ولو سُمّي أقل منها. اطّلع على النصوص وعلى مواضع اختلاف الأرقام.",
    intro:
      "المهر (ويُكتب أيضًا مهر أو صداق) هو حق الزوجة في عقد النكاح. يلخّص هذا الدليل ما تذكره المصادر المدرجة في آخره عن حدّه الأدنى، وفق المذهب الحنفي في الأساس. وهو ملخّص للعلم، وليس فتوى.",
    sections: [
      {
        id: "the-ruling",
        heading: "الحكم",
        blocks: [
          {
            type: "p",
            text: "أقل المهر 10 دراهم، أي 2 تولة و7.5 ماشة (30.618 غرامًا) من الفضة. فإن اتفق الزوجان على أقل من ذلك وجب مع ذلك 10 دراهم.",
          },
          {
            type: "ul",
            items: [
              "مثال: إذا كان أقل المهر بالروبية 10,000 وسمّى الطرفان 5,000، لزم الزوج دفع 10,000.",
              "تسمية أقل من الحد الأدنى لا تمنع بذاتها صحة النكاح، بشرط توافر سائر شروط صحته.",
              "وإن سُمّي أكثر من 10 دراهم وجب المقدار المسمّى.",
            ],
          },
        ],
      },
      {
        id: "classical-texts",
        heading: "ما تقوله الكتب المعتمدة",
        blocks: [
          {
            type: "ul",
            items: [
              "بدائع الصنائع (الكاساني): إن كان المسمّى أقل من عشرة يُكمَّل إلى عشرة عند أئمة المذهب الثلاثة.",
              "تنوير الأبصار مع الدر المختار: تجب 10 دراهم إن سمّى 10 دراهم أو سمّى دونها.",
              "حاشية الطحطاوي على الدر (عن النهر): للمهر حقّان: حق المرأة وهو ما زاد على العشرة إلى مهر مثلها، وحق الشرع وهو العشرة. فإذا رضيت بأقل من عشرة بقي حق الشرع، فوجب تكميلها.",
              "بهار شريعت: إذا عُقد النكاح بـ10 دراهم أو بأقل منها وجبت 10 دراهم، وإن سُمّي أكثر وجب المسمّى.",
            ],
          },
          {
            type: "note",
            tone: "info",
            text: "نُقلت هذه النصوص كما وردت في الفتوى المذكورة ضمن المصادر، وفيها أرقام المجلدات والصفحات.",
          },
        ],
      },
      {
        id: "what-the-sources-say",
        heading: "ماذا تقول المصادر عن الوزن",
        blocks: [
          {
            type: "ul",
            items: [
              "فتاوى فقيه ملت (المفتي جلال الدين أمجدي): الـ10 دراهم تساوي اليوم 2 تولة و7.5 ماشة من الفضة، أي 30.618 غرامًا بحسب الأوزان الحالية.",
            ],
          },
        ],
      },
      {
        id: "tola-and-grams",
        heading: "من 10 دراهم إلى التولة والغرام",
        blocks: [
          {
            type: "p",
            text: "2 تولة و7.5 ماشة هي الوزن نفسه بنظام التولة: 31.5 ماشة أو 2.625 تولة. وبحساب التولة 11.664 غرامًا تكون 30.618 غرامًا، وهو ما يوافق رقم الفتاوى المذكورة أعلاه.",
          },
          {
            type: "link",
            text: "اقرأ دليل التولة والماشة والغرام",
            path: "/guides/tola-masha-gram",
          },
        ],
      },
      {
        id: "differences",
        heading: "لماذا تختلف الأرقام",
        blocks: [
          {
            type: "p",
            text: "تتفق المصادر على 10 دراهم، لكنها لا تتفق على وزن الدرهم الواحد بالغرام، لذا تختلف الأرقام المنشورة قليلًا. وقد يكون لمذاهب فقهية أخرى ولعلماء آخرين آراء مختلفة في الحد الأدنى نفسه. ولا يرجّح هذا الموقع بين هذه الآراء.",
          },
          {
            type: "note",
            tone: "warning",
            text: "الحد الأدنى هو أقل ما يجوز، وليس مقدارًا موصى به أو معتادًا. ولاتخاذ قرار يخص زواجك، يُرجى سؤال عالم مؤهل.",
          },
        ],
      },
      {
        id: "how-the-calculator-uses-it",
        heading: "كيف تستخدم الحاسبة ذلك",
        blocks: [
          {
            type: "p",
            text: "تضرب حاسبة حق المهر 30.618 غرامًا (2.625 تولة) في سعر الفضة الذي تُدخله. ولأن أسعار الفضة تتغيّر، تتغيّر قيمة الحد الأدنى بالمال أيضًا. تحقّق من السعر في اليوم الذي تحتاج فيه إلى الرقم.",
          },
          { type: "link", text: "احسب بسعر الفضة اليوم", path: "" },
        ],
      },
    ],
  },
};
