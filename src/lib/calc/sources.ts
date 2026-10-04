// Verified by opening each URL on the review date. Keep in sync with decision.md.
export const METHODOLOGY_REVIEWED_ON = "2026-10-04";

export type MethodologySource = {
  title: string;
  publisher: string;
  url: string;
  supports: "tola" | "reference" | "range";
};

export const methodologySources: readonly MethodologySource[] = [
  {
    title: "Tola (unit)",
    publisher: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Tola_(unit)",
    supports: "tola",
  },
  {
    title: "Minimum Mahar in Pounds: Explained",
    publisher: "Mufti Ebrahim Salejee, MuftiOnline (via IslamQA.org)",
    url: "https://islamqa.org/hanafi/muftionline/130564/minimum-mahar-in-pounds-explained/",
    supports: "reference",
  },
  {
    title: "What is the minimum quantity of mehar in gram? (Fatwa 03336)",
    publisher: "Darul Ifta Birmingham",
    url: "https://daruliftabirmingham.co.uk/what-is-the-minimum-quantity-of-mehar-in-gram-for-muslim-marriage/",
    supports: "range",
  },
  {
    title: "Iqra, 18 May 2018",
    publisher: "Daily Jang",
    url: "https://jang.com.pk/news/494011",
    supports: "reference",
  },
];
