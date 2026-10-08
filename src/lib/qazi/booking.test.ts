import { describe, expect, it } from "vitest";
import {
  BOOKING_LIMITS,
  buildBookingMessage,
  validateBooking,
  whatsappChatHref,
  type BookingInput,
} from "./booking";

const valid: BookingInput = {
  husbandName: "Ali",
  brideName: "Sara",
  country: "PK",
  date: "2026-10-08",
  time: "",
  email: "ali@example.com",
  whatsappCountry: "PK",
  whatsapp: "",
  note: "",
};
const today = "2026-10-08";

describe("validateBooking", () => {
  it("accepts a minimal request", () => {
    expect(validateBooking(valid, today)).toEqual({});
  });

  it("requires both names, a country, a date and an email", () => {
    expect(
      validateBooking(
        { ...valid, husbandName: "  ", brideName: "\n", country: "", date: "", email: "" },
        today,
      ),
    ).toEqual({
      husbandName: "husbandNameRequired",
      brideName: "brideNameRequired",
      country: "countryRequired",
      date: "dateRequired",
      email: "emailRequired",
    });
  });

  it("limits field lengths", () => {
    const long = (n: number) => "a".repeat(n + 1);
    expect(
      validateBooking(
        {
          ...valid,
          husbandName: long(BOOKING_LIMITS.husbandName),
          brideName: long(BOOKING_LIMITS.brideName),
          note: long(BOOKING_LIMITS.note),
        },
        today,
      ),
    ).toEqual({
      husbandName: "tooLong",
      brideName: "tooLong",
      note: "tooLong",
    });
  });

  it("allows today or later, rejects past or malformed dates", () => {
    expect(validateBooking({ ...valid, date: today }, today)).toEqual({});
    expect(validateBooking({ ...valid, date: "2027-01-01" }, today)).toEqual({});
    expect(validateBooking({ ...valid, date: "2026-10-07" }, today).date).toBe(
      "datePast",
    );
    expect(validateBooking({ ...valid, date: "08/10/2026" }, today).date).toBe(
      "datePast",
    );
  });

  it("does not require a time, and accepts any value since the native input constrains it", () => {
    expect(validateBooking({ ...valid, time: "18:30" }, today)).toEqual({});
  });

  it("validates email format and length", () => {
    expect(validateBooking({ ...valid, email: "not-an-email" }, today).email).toBe(
      "emailInvalid",
    );
    expect(
      validateBooking({ ...valid, email: "a".repeat(121) + "@x.com" }, today)
        .email,
    ).toBe("tooLong");
  });

  it("validates whatsapp only when given, ignoring spaces, dashes and parentheses", () => {
    expect(validateBooking(valid, today).whatsapp).toBeUndefined();
    expect(validateBooking({ ...valid, whatsapp: "300 1234567" }, today)).toEqual(
      {},
    );
    expect(
      validateBooking({ ...valid, whatsapp: "(300) 123-4567" }, today),
    ).toEqual({});
    expect(validateBooking({ ...valid, whatsapp: "12" }, today).whatsapp).toBe(
      "phoneInvalid",
    );
    expect(
      validateBooking({ ...valid, whatsapp: "call me maybe" }, today).whatsapp,
    ).toBe("phoneInvalid");
  });
});

describe("buildBookingMessage", () => {
  const texts = {
    greeting: "Assalamu alaikum.",
    husbandName: "Husband's name",
    brideName: "Bride's name",
    country: "Country",
    date: "Preferred date",
    time: "Preferred time",
    email: "Email",
    whatsapp: "WhatsApp",
    note: "Message",
    footer: "Sent from haq-mahr-finder.app",
  };

  it("writes one line per detail and skips empty optional ones", () => {
    const text = buildBookingMessage(
      { ...valid, husbandName: " Ali\n Khan ", note: "  " },
      texts,
      { date: "October 8, 2026", countryName: "Pakistan", whatsappDial: "+92" },
    );
    expect(text.split("\n")).toEqual([
      "Assalamu alaikum.",
      "",
      "Husband's name: Ali Khan",
      "Bride's name: Sara",
      "Country: Pakistan",
      "Preferred date: October 8, 2026",
      "Email: ali@example.com",
      "",
      "Sent from haq-mahr-finder.app",
    ]);
  });

  it("includes the time and whatsapp (with its dial code) and note when given", () => {
    const text = buildBookingMessage(
      { ...valid, time: "18:30", whatsapp: "300 1234567", note: "Evening please" },
      texts,
      { date: "October 8, 2026", countryName: "Pakistan", whatsappDial: "+92" },
    );
    expect(text).toContain("Preferred time: 18:30");
    expect(text).toContain("WhatsApp: +92 300 1234567");
    expect(text).toContain("Message: Evening please");
  });
});

describe("whatsappChatHref", () => {
  it("links to the number, with encoded text when given", () => {
    expect(whatsappChatHref("923001234567")).toBe("https://wa.me/923001234567");
    expect(whatsappChatHref("923001234567", "a b&c\nd")).toBe(
      "https://wa.me/923001234567?text=a%20b%26c%0Ad",
    );
  });
});
