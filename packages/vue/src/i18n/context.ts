import type { InjectionKey } from 'vue';
import {
  createTranslator,
  DEFAULT_LOCALE,
  getMessages,
  mergeMessages,
  type DeepPartial,
  type IskraLocale,
  type IskraMessages,
  type TranslateFn,
} from '@iskra-ui/i18n';

export interface IskraLocaleContextValue {
  locale: IskraLocale;
  messages: IskraMessages;
  t: TranslateFn;
}

export const IskraLocaleKey: InjectionKey<IskraLocaleContextValue> = Symbol('iskra-locale');

const defaultMessages = getMessages(DEFAULT_LOCALE);

export const defaultIskraLocaleContext: IskraLocaleContextValue = {
  locale: DEFAULT_LOCALE,
  messages: defaultMessages,
  t: createTranslator(defaultMessages),
};

export function createIskraLocaleContext(
  locale: IskraLocale = DEFAULT_LOCALE,
  overrides?: DeepPartial<IskraMessages>,
): IskraLocaleContextValue {
  const messages = mergeMessages(getMessages(locale), overrides);
  return {
    locale,
    messages,
    t: createTranslator(messages),
  };
}
