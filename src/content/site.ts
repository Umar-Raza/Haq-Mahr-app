/**
 * Public contact details, chosen by the site owner. While both are null, the Contact page
 * returns 404 and is left out of the footer, so the site never shows a placeholder.
 */
export const CONTACT_EMAIL: string | null = "umardev92@gmail.com";
/** WhatsApp number in international format, digits only, e.g. "923001234567". */
export const CONTACT_WHATSAPP: string | null = "923270029087";

/**
 * WhatsApp number that receives Qazi booking requests (digits only). While null, the
 * Online Qazi page returns 404 and its nav, footer and home links are hidden.
 */
export const QAZI_WHATSAPP: string | null = CONTACT_WHATSAPP;

export const isContactPublished =
  CONTACT_EMAIL !== null || CONTACT_WHATSAPP !== null;
export const isQaziPublished = QAZI_WHATSAPP !== null;

/** Public domain, shown on the receipt and in shared text. */
export const SITE_DOMAIN = "haq-mahr-finder.app";
export const SITE_URL = `https://${SITE_DOMAIN}`;

/** Date the informational pages (About, Disclaimer, Privacy, Terms, Contact) were last revised. */
export const INFO_PAGES_UPDATED_ON = "2026-10-08";
