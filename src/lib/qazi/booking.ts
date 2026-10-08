/** Qazi booking request: validated on the client, then handed to WhatsApp as a pre-written message. */
import type { CountryCode } from "./countries";

export type BookingInput = {
  husbandName: string;
  brideName: string;
  country: CountryCode | "";
  /** ISO date (YYYY-MM-DD). Required. */
  date: string;
  /** 24-hour "HH:MM" or "" when not chosen. Optional. */
  time: string;
  email: string;
  /** Country for the calling-code select; always has a value (defaults to "PK"). */
  whatsappCountry: CountryCode;
  /** The visitor's own local number, without the calling code; validated loosely, not reformatted. */
  whatsapp: string;
  note: string;
};

export const BOOKING_LIMITS = {
  husbandName: 80,
  brideName: 80,
  email: 120,
  whatsapp: 20,
  note: 500,
} as const;

export type BookingField =
  | "husbandName"
  | "brideName"
  | "country"
  | "date"
  | "email"
  | "whatsapp"
  | "note";
export type BookingError =
  | "husbandNameRequired"
  | "brideNameRequired"
  | "countryRequired"
  | "dateRequired"
  | "datePast"
  | "emailRequired"
  | "emailInvalid"
  | "phoneInvalid"
  | "tooLong";
export type BookingErrors = Partial<Record<BookingField, BookingError>>;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// A local phone number once spaces, dashes and parentheses are removed: 4–12 digits.
const PHONE_CLEAN = /[\s()-]/g;
const PHONE = /^\d{4,12}$/;

/** Single-line fields: trim and collapse whitespace, including pasted newlines. */
const oneLine = (value: string) => value.replace(/\s+/g, " ").trim();

/** `today` is the visitor's local date as YYYY-MM-DD. */
export function validateBooking(
  input: BookingInput,
  today: string,
): BookingErrors {
  const errors: BookingErrors = {};
  const husbandName = oneLine(input.husbandName);
  const brideName = oneLine(input.brideName);
  const email = input.email.trim();
  const whatsapp = input.whatsapp.trim();

  if (!husbandName) errors.husbandName = "husbandNameRequired";
  else if (husbandName.length > BOOKING_LIMITS.husbandName) {
    errors.husbandName = "tooLong";
  }
  if (!brideName) errors.brideName = "brideNameRequired";
  else if (brideName.length > BOOKING_LIMITS.brideName) {
    errors.brideName = "tooLong";
  }
  if (!input.country) errors.country = "countryRequired";
  if (!input.date) errors.date = "dateRequired";
  else if (!ISO_DATE.test(input.date) || input.date < today) {
    errors.date = "datePast";
  }
  if (!email) errors.email = "emailRequired";
  else if (email.length > BOOKING_LIMITS.email) errors.email = "tooLong";
  else if (!EMAIL.test(email)) errors.email = "emailInvalid";
  if (whatsapp) {
    if (whatsapp.length > BOOKING_LIMITS.whatsapp) errors.whatsapp = "tooLong";
    else if (!PHONE.test(whatsapp.replace(PHONE_CLEAN, ""))) {
      errors.whatsapp = "phoneInvalid";
    }
  }
  if (input.note.trim().length > BOOKING_LIMITS.note) errors.note = "tooLong";
  return errors;
}

export type BookingMessageTexts = {
  greeting: string;
  husbandName: string;
  brideName: string;
  country: string;
  date: string;
  time: string;
  email: string;
  whatsapp: string;
  note: string;
  footer: string;
};

/**
 * Plain-text message; optional lines are left out when empty. `countryName` is the localized
 * name of `input.country`, and `whatsappDial` is the calling code for `input.whatsappCountry`
 * (e.g. "+92"), prefixed onto the visitor's local number.
 */
export function buildBookingMessage(
  input: BookingInput,
  texts: BookingMessageTexts,
  values: { date: string | null; countryName: string; whatsappDial: string },
): string {
  const note = input.note.trim();
  const email = input.email.trim();
  const whatsapp = input.whatsapp.trim();
  return [
    texts.greeting,
    "",
    `${texts.husbandName}: ${oneLine(input.husbandName)}`,
    `${texts.brideName}: ${oneLine(input.brideName)}`,
    ...(values.countryName ? [`${texts.country}: ${values.countryName}`] : []),
    ...(values.date ? [`${texts.date}: ${values.date}`] : []),
    ...(input.time ? [`${texts.time}: ${input.time}`] : []),
    ...(email ? [`${texts.email}: ${email}`] : []),
    ...(whatsapp ? [`${texts.whatsapp}: ${values.whatsappDial} ${whatsapp}`] : []),
    ...(note ? [`${texts.note}: ${note}`] : []),
    "",
    texts.footer,
  ].join("\n");
}

/** Click-to-chat link to a specific number (digits only, international format). */
export function whatsappChatHref(number: string, text?: string): string {
  const base = `https://wa.me/${number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
