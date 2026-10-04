import type { GuideContent } from "./types";
import type { Localized } from "../types";

// Religious content: every claim here must be supported by a source listed for this guide.
export const minimumHaqMahr10Dirhams: Localized<GuideContent> = {
  en: {
    title: "Minimum Haq Mahr: 10 Dirhams of silver",
    description:
      "What the 10 Dirham minimum for Haq Mahr means, why it is written as 2 Tola 7.5 Masha, the gram figures given by published fatwas, and how the calculator uses them.",
    summary:
      "Published Hanafi fatwas give the minimum Mahr as 10 Dirhams of silver, about 30.618 g. See what the sources say and where they differ.",
    intro:
      "Mahr (also written Mehr or Mahar) is the marriage gift owed to the bride. This guide summarises what the sources listed at the end say about its minimum amount. It is a summary for information, not a fatwa.",
    sections: [
      {
        id: "what-the-sources-say",
        heading: "What the sources say",
        blocks: [
          {
            type: "ul",
            items: [
              "A Hanafi fatwa by Mufti Ebrahim Salejee (MuftiOnline) gives the minimum Mahr as 10 Dirhams of silver, equal to 30.618 g.",
              "Darul Ifta Birmingham (Fatwa 03336) also gives the minimum as 10 Dirhams. It notes that one Dirham is given as roughly 2.97 g to 3.1 g, so 10 Dirhams comes to about 29.7 g to 31 g.",
              "A column in Daily Jang's Iqra section (18 May 2018) gives the minimum Mahr as 2 Tola 7.5 Masha of silver, or its value.",
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
            text: "2 Tola 7.5 Masha is the same weight expressed in the Tola system: 31.5 Masha, or 2.625 Tola. With a Tola of 11.664 g this is 30.618 g, matching the figure in the first fatwa above.",
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
      "حق مہر کی کم از کم مقدار 10 درہم کا مطلب، اسے 2 تولہ 7.5 ماشہ کیوں لکھا جاتا ہے، شائع شدہ فتاویٰ میں دی گئی گرام کی مقداریں، اور کیلکولیٹر انہیں کیسے استعمال کرتا ہے۔",
    summary:
      "شائع شدہ حنفی فتاویٰ کے مطابق کم از کم مہر 10 درہم چاندی ہے، تقریباً 30.618 گرام۔ دیکھیں ذرائع کیا کہتے ہیں اور کہاں فرق ہے۔",
    intro:
      "مہر نکاح میں دلہن کا وہ حق ہے جو اسے ادا کیا جاتا ہے۔ یہ رہنمائی آخر میں دیے گئے ذرائع کی روشنی میں اس کی کم از کم مقدار کا خلاصہ پیش کرتی ہے۔ یہ صرف معلومات کے لیے خلاصہ ہے، فتویٰ نہیں۔",
    sections: [
      {
        id: "what-the-sources-say",
        heading: "ذرائع کیا کہتے ہیں",
        blocks: [
          {
            type: "ul",
            items: [
              "مفتی ابراہیم صالحجی (مفتی آن لائن) کے ایک حنفی فتوے میں کم از کم مہر 10 درہم چاندی بتایا گیا ہے، جو 30.618 گرام کے برابر ہے۔",
              "دارالافتاء برمنگھم (فتویٰ 03336) میں بھی کم از کم مقدار 10 درہم بتائی گئی ہے۔ اس کے مطابق ایک درہم تقریباً 2.97 سے 3.1 گرام بیان کیا جاتا ہے، اس لیے 10 درہم تقریباً 29.7 سے 31 گرام بنتے ہیں۔",
              "روزنامہ جنگ کے صفحہ اقراء (18 مئی 2018) کے ایک مضمون میں کم از کم مہر 2 تولہ 7.5 ماشہ چاندی یا اس کی قیمت بتایا گیا ہے۔",
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
            text: "2 تولہ 7.5 ماشہ یہی وزن تولے کے نظام میں ہے: 31.5 ماشہ یا 2.625 تولہ۔ 11.664 گرام فی تولہ کے حساب سے یہ 30.618 گرام بنتا ہے، جو اوپر والے پہلے فتوے کی مقدار کے مطابق ہے۔",
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
      "معنى الحد الأدنى للمهر بـ10 دراهم، ولماذا يُكتب 2 تولة و7.5 ماشة، والأوزان بالغرام الواردة في الفتاوى المنشورة، وكيف تستخدمها الحاسبة.",
    summary:
      "تذكر فتاوى حنفية منشورة أن أقل المهر 10 دراهم من الفضة، أي نحو 30.618 غرامًا. اطّلع على ما تقوله المصادر وأين تختلف.",
    intro:
      "المهر (ويُكتب أيضًا مهر أو صداق) هو حق الزوجة في عقد النكاح. يلخّص هذا الدليل ما تذكره المصادر المدرجة في آخره عن حدّه الأدنى. وهو ملخّص للعلم، وليس فتوى.",
    sections: [
      {
        id: "what-the-sources-say",
        heading: "ماذا تقول المصادر",
        blocks: [
          {
            type: "ul",
            items: [
              "تذكر فتوى حنفية للمفتي إبراهيم صالحجي (MuftiOnline) أن أقل المهر 10 دراهم من الفضة، أي 30.618 غرامًا.",
              "تذكر دار الإفتاء في برمنغهام (الفتوى 03336) أيضًا أن الحد الأدنى 10 دراهم، وتشير إلى أن الدرهم يُقدَّر بنحو 2.97 إلى 3.1 غرام، فتكون الـ10 دراهم نحو 29.7 إلى 31 غرامًا.",
              "يذكر مقال في صفحة «اقرأ» بصحيفة جنگ اليومية (18 مايو 2018) أن أقل المهر 2 تولة و7.5 ماشة من الفضة أو قيمتها.",
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
            text: "2 تولة و7.5 ماشة هي الوزن نفسه بنظام التولة: 31.5 ماشة أو 2.625 تولة. وبحساب التولة 11.664 غرامًا تكون 30.618 غرامًا، وهو ما يوافق رقم الفتوى الأولى أعلاه.",
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
