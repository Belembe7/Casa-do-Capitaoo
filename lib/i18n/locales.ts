export const LOCALES = [
  { code: 'pt', name: 'Português', flagCode: 'pt' },
  { code: 'en', name: 'English', flagCode: 'gb' },
  { code: 'es', name: 'Español', flagCode: 'es' },
  { code: 'fr', name: 'Français', flagCode: 'fr' },
  { code: 'de', name: 'Deutsch', flagCode: 'de' },
  { code: 'zh', name: '中文', flagCode: 'cn' },
  { code: 'hi', name: 'हिन्दी', flagCode: 'in' },
  { code: 'ar', name: 'العربية', flagCode: 'sa' },
  { code: 'ru', name: 'Русский', flagCode: 'ru' },
  { code: 'ja', name: '日本語', flagCode: 'jp' },
  { code: 'ko', name: '한국어', flagCode: 'kr' },
  { code: 'it', name: 'Italiano', flagCode: 'it' },
  { code: 'tr', name: 'Türkçe', flagCode: 'tr' },
  { code: 'vi', name: 'Tiếng Việt', flagCode: 'vn' },
  { code: 'pl', name: 'Polski', flagCode: 'pl' },
  { code: 'nl', name: 'Nederlands', flagCode: 'nl' },
  { code: 'bn', name: 'বাংলা', flagCode: 'bd' },
] as const;

export type Locale = (typeof LOCALES)[number]['code'];

export const defaultLocale: Locale = 'pt';

export function getLocaleMeta(code: Locale) {
  return LOCALES.find((l) => l.code === code)!;
}

export function isLocale(value: string): value is Locale {
  return LOCALES.some((l) => l.code === value);
}
