import { enMessages } from './catalogs/en.js';
import { ruMessages } from './catalogs/ru.js';
import type { IskraLocale, IskraMessages } from './types.js';

const catalogs: Record<IskraLocale, IskraMessages> = {
  en: enMessages,
  ru: ruMessages,
};

export function getMessages(locale: IskraLocale): IskraMessages {
  return catalogs[locale];
}

export const DEFAULT_LOCALE: IskraLocale = 'en';
