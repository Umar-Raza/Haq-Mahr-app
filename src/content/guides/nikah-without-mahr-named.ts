import type { GuideContent } from "./types";
import type { Localized } from "../types";

// Religious content: every claim here must be supported by a source listed for this guide.
export const nikahWithoutMahrNamed: Localized<GuideContent> = {
  en: {
    title: "Nikah without a named Mahr",
    description:
      "What the Hanafi sources say when no Mahr is named at the nikah: the nikah is valid and the wife is owed Mahr al-Mithl, the Mahr of a woman like her from her father's family.",
    summary:
      "If no Mahr is named at the nikah, the nikah is still valid and Mahr al-Mithl is due. See what it is and what the classical texts say.",
    intro:
      "Sometimes a nikah takes place without any Mahr being agreed. This guide summarises what the source listed at the end says about the validity of such a nikah and what is owed. It is a summary for information, not a fatwa.",
    sections: [
      {
        id: "the-ruling",
        heading: "The ruling",
        blocks: [
          {
            type: "p",
            text: "If no Mahr is fixed at the time of nikah, the nikah is still valid according to the source. The wife is then owed Mahr al-Mithl.",
          },
          {
            type: "ul",
            items: [
              "Mahr itself is a requirement of the marriage, whether or not it is mentioned in the nikah.",
              "Fixing the amount is not a condition for the nikah to be valid.",
              "Even if the parties stipulate that there will be no Mahr, the nikah is valid and Mahr is still due.",
            ],
          },
        ],
      },
      {
        id: "mahr-al-mithl",
        heading: "What is Mahr al-Mithl?",
        blocks: [
          {
            type: "p",
            text: "Mahr al-Mithl is the Mahr of a woman of the bride's father's family who is like her, for example her sister, her paternal aunt or her paternal uncle's daughter. The wife is owed that amount.",
          },
          {
            type: "note",
            tone: "info",
            text: "Haq Mahr Finder does not calculate Mahr al-Mithl. It only values the minimum reference weight of silver at a rate you enter.",
          },
        ],
      },
      {
        id: "classical-texts",
        heading: "What the texts say",
        blocks: [
          {
            type: "ul",
            items: [
              "Fatawa Alamgiri: if a man marries a woman without naming a Mahr, or on the condition that she has no Mahr, she is owed Mahr al-Mithl if the marriage was consummated or he died.",
              "Fatawa Khaliliya (Mufti Khalil Khan Barakati): there are two things, the Mahr itself and fixing it. The Mahr is required for a nikah whether or not it is mentioned, even if its absence is made a condition. Fixing it is not required, and if it is not fixed, Mahr al-Mithl is due. In every case there is no doubt that the nikah is valid.",
              "Bahar-e-Shariat: a woman's Mahr al-Mithl is the Mahr of a woman like her from her family, such as her sister, paternal aunt or paternal uncle's daughter.",
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
        id: "related",
        heading: "Related",
        blocks: [
          {
            type: "p",
            text: "When a Mahr is named, a minimum applies. Read about the minimum of 10 Dirhams of silver, or work out its value with the calculator.",
          },
          {
            type: "link",
            text: "Read: Minimum Haq Mahr, 10 Dirhams of silver",
            path: "/guides/minimum-haq-mahr-10-dirhams",
          },
          { type: "link", text: "Open the calculator", path: "" },
          {
            type: "note",
            tone: "warning",
            text: "For a decision about your own marriage, please consult a qualified scholar.",
          },
        ],
      },
    ],
  },
  ur: {
    title: "مہر معین کیے بغیر نکاح",
    description:
      "جب نکاح میں مہر مقرر نہ کیا جائے تو حنفی ذرائع کیا کہتے ہیں: نکاح درست ہے اور بیوی کو مہرِ مثل ملے گا، یعنی اس کے باپ کے خاندان کی اس جیسی عورت کا مہر۔",
    summary:
      "نکاح میں مہر مقرر نہ ہو تب بھی نکاح درست ہے اور مہرِ مثل واجب ہے۔ دیکھیں مہرِ مثل کیا ہے اور کتب کیا کہتی ہیں۔",
    intro:
      "کبھی نکاح اس طرح ہو جاتا ہے کہ مہر طے نہیں ہوتا۔ یہ رہنمائی آخر میں دیے گئے ذریعے کی روشنی میں ایسے نکاح کے درست ہونے اور واجب الادا مہر کا خلاصہ پیش کرتی ہے۔ یہ صرف معلومات کے لیے خلاصہ ہے، فتویٰ نہیں۔",
    sections: [
      {
        id: "the-ruling",
        heading: "حکم",
        blocks: [
          {
            type: "p",
            text: "ذریعے کے مطابق اگر نکاح کے وقت مہر معین نہ کیا جائے تو نکاح شرعاً درست ہو جاتا ہے، لیکن ایسی صورت میں عورت کو مہرِ مثل دیا جائے گا۔",
          },
          {
            type: "ul",
            items: [
              "نفسِ مہر نکاح کے لیے لازم ہے، چاہے نکاح میں اس کا ذکر ہو یا نہ ہو۔",
              "مہر کی مقدار کا تعین نکاح کے درست ہونے کی شرط نہیں۔",
              "اگر مہر نہ ہونے کی شرط بھی لگا دی جائے تب بھی نکاح درست ہوگا اور مہر دینا لازم ہوگا۔",
            ],
          },
        ],
      },
      {
        id: "mahr-al-mithl",
        heading: "مہرِ مثل کیا ہے؟",
        blocks: [
          {
            type: "p",
            text: "عورت کے خاندان کی اس جیسی عورت کا جو مہر ہو، وہ اس کے لیے مہرِ مثل ہے، مثلاً اس کی بہن، پھوپھی یا چچا کی بیٹی کا مہر۔",
          },
          {
            type: "note",
            tone: "info",
            text: "حق مہر فائنڈر مہرِ مثل کا حساب نہیں کرتا۔ یہ صرف چاندی کے کم از کم حوالہ وزن کی قیمت آپ کے درج کردہ ریٹ پر نکالتا ہے۔",
          },
        ],
      },
      {
        id: "classical-texts",
        heading: "کتب کیا کہتی ہیں",
        blocks: [
          {
            type: "ul",
            items: [
              "فتاویٰ عالمگیری: اگر کسی عورت سے نکاح کیا اور مہر بیان نہ کیا، یا اس شرط پر نکاح کیا کہ اس کے لیے مہر نہیں ہوگا، تو دونوں صورتوں میں اس کے لیے مہرِ مثل ہوگا، اگر دخول کر لیا یا وہ فوت ہو گیا۔",
              "فتاویٰ خلیلیہ (مفتی خلیل خان برکاتی): یہاں دو چیزیں ہیں: نفسِ مہر اور تعینِ مہر۔ نکاح کے لیے مہر لازم ہے، نکاح میں اس کا ذکر ہو یا نہ ہو، بلکہ مہر کی نفی کی شرط بھی ہو تب بھی۔ تعینِ مہر ضروری نہیں، اور اگر تعین نہ ہو تو مہرِ مثل لازم ہوگا۔ بہرحال نکاح کے انعقاد میں کوئی شبہ نہیں۔",
              "بہارِ شریعت: عورت کے خاندان کی اس جیسی عورت کا جو مہر ہو، وہ اس کے لیے مہرِ مثل ہے، مثلاً اس کی بہن، پھوپھی، چچا کی بیٹی وغیرہا کا مہر۔",
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
        id: "related",
        heading: "متعلقہ",
        blocks: [
          {
            type: "p",
            text: "جب مہر مقرر کیا جائے تو اس کی ایک کم از کم مقدار ہوتی ہے۔ چاندی کے 10 درہم کی کم از کم مقدار کے بارے میں پڑھیں، یا کیلکولیٹر سے اس کی قیمت نکالیں۔",
          },
          {
            type: "link",
            text: "پڑھیں: کم از کم حق مہر، 10 درہم چاندی",
            path: "/guides/minimum-haq-mahr-10-dirhams",
          },
          { type: "link", text: "کیلکولیٹر کھولیں", path: "" },
          {
            type: "note",
            tone: "warning",
            text: "اپنے نکاح سے متعلق فیصلے کے لیے کسی مستند عالم سے رجوع کریں۔",
          },
        ],
      },
    ],
  },
  ar: {
    title: "النكاح دون تسمية المهر",
    description:
      "ما تقوله المصادر الحنفية إذا لم يُسمَّ المهر في عقد النكاح: النكاح صحيح وتستحق الزوجة مهر المثل، وهو مهر امرأة تماثلها من أسرة أبيها.",
    summary:
      "إذا لم يُسمَّ المهر في النكاح فالنكاح صحيح ويجب مهر المثل. تعرّف على معناه وما تقوله كتب المذهب.",
    intro:
      "قد يُعقد النكاح دون الاتفاق على مهر. يلخّص هذا الدليل ما يذكره المصدر المدرج في آخره عن صحة هذا النكاح وما يجب فيه. وهو ملخّص للعلم، وليس فتوى.",
    sections: [
      {
        id: "the-ruling",
        heading: "الحكم",
        blocks: [
          {
            type: "p",
            text: "بحسب المصدر، إذا لم يُحدَّد المهر وقت العقد فالنكاح صحيح شرعًا، وتستحق الزوجة حينئذٍ مهر المثل.",
          },
          {
            type: "ul",
            items: [
              "أصل المهر لازم للنكاح، سواء ذُكر في العقد أم لم يُذكر.",
              "تحديد مقداره ليس شرطًا لصحة النكاح.",
              "وحتى لو اشترط الطرفان ألا يكون هناك مهر، فالنكاح صحيح والمهر واجب.",
            ],
          },
        ],
      },
      {
        id: "mahr-al-mithl",
        heading: "ما هو مهر المثل؟",
        blocks: [
          {
            type: "p",
            text: "مهر المثل هو مهر امرأة من أسرة أبي الزوجة تماثلها، كأختها أو عمتها أو بنت عمها. وهو ما تستحقه الزوجة.",
          },
          {
            type: "note",
            tone: "info",
            text: "لا تحسب حاسبة حق المهر مهر المثل. هي تقدّر فقط قيمة الوزن المرجعي الأدنى من الفضة بالسعر الذي تُدخله.",
          },
        ],
      },
      {
        id: "classical-texts",
        heading: "ما تقوله الكتب",
        blocks: [
          {
            type: "ul",
            items: [
              "الفتاوى العالمكيرية (الهندية): إذا تزوج امرأة ولم يسمِّ لها مهرًا، أو تزوجها على ألا مهر لها، فلها مهر مثلها إن دخل بها أو مات عنها.",
              "فتاوى خليلية (المفتي خليل خان بركاتي): هنا أمران: أصل المهر وتعيينه. أصل المهر لازم للنكاح سواء ذُكر أم لم يُذكر، حتى لو شُرط نفيه. أما تعيينه فليس بلازم، وإن لم يُعيَّن وجب مهر المثل. وفي كل حال لا شك في صحة النكاح.",
              "بهار شريعت: مهر مثل المرأة هو مهر امرأة تماثلها من أسرتها، كأختها وعمتها وبنت عمها وغيرهن.",
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
        id: "related",
        heading: "ذو صلة",
        blocks: [
          {
            type: "p",
            text: "عند تسمية المهر يكون له حدّ أدنى. اقرأ عن الحد الأدنى وهو 10 دراهم من الفضة، أو احسب قيمته بالحاسبة.",
          },
          {
            type: "link",
            text: "اقرأ: الحد الأدنى لحق المهر، 10 دراهم من الفضة",
            path: "/guides/minimum-haq-mahr-10-dirhams",
          },
          { type: "link", text: "افتح الحاسبة", path: "" },
          {
            type: "note",
            tone: "warning",
            text: "ولاتخاذ قرار يخص زواجك، يُرجى سؤال عالم مؤهل.",
          },
        ],
      },
    ],
  },
};
