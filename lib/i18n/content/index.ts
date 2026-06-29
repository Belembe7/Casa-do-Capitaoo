import type { Locale } from '../locales';
import type { SiteContent } from './types';
import { PT_CONTENT } from './pt';
import { EN_CONTENT } from './en';
import { ES_CONTENT } from './langs/es';
import { FR_CONTENT, DE_CONTENT, IT_CONTENT } from './langs/fr';
import {
  ZH_CONTENT,
  HI_CONTENT,
  AR_CONTENT,
  RU_CONTENT,
  JA_CONTENT,
  KO_CONTENT,
  TR_CONTENT,
  VI_CONTENT,
  PL_CONTENT,
  NL_CONTENT,
  BN_CONTENT,
} from './langs/rest';

const CONTENT: Record<Locale, SiteContent> = {
  pt: PT_CONTENT,
  en: EN_CONTENT,
  es: ES_CONTENT,
  fr: FR_CONTENT,
  de: DE_CONTENT,
  zh: ZH_CONTENT,
  hi: HI_CONTENT,
  ar: AR_CONTENT,
  ru: RU_CONTENT,
  ja: JA_CONTENT,
  ko: KO_CONTENT,
  it: IT_CONTENT,
  tr: TR_CONTENT,
  vi: VI_CONTENT,
  pl: PL_CONTENT,
  nl: NL_CONTENT,
  bn: BN_CONTENT,
};

export function getSiteContent(locale: Locale): SiteContent {
  return CONTENT[locale] ?? EN_CONTENT;
}

export type { SiteContent, RoomSlug, OfferSlug } from './types';
