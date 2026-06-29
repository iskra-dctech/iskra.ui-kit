import { createContext, useMemo, type ReactNode } from 'react';
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

const defaultMessages = getMessages(DEFAULT_LOCALE);

export const IskraLocaleContext = createContext<IskraLocaleContextValue>({
  locale: DEFAULT_LOCALE,
  messages: defaultMessages,
  t: createTranslator(defaultMessages),
});

export interface IskraProviderProps {
  locale?: IskraLocale;
  messages?: DeepPartial<IskraMessages>;
  children: ReactNode;
}

export function IskraProvider({
  locale = DEFAULT_LOCALE,
  messages: overrides,
  children,
}: IskraProviderProps) {
  const value = useMemo(() => {
    const messages = mergeMessages(getMessages(locale), overrides);
    return {
      locale,
      messages,
      t: createTranslator(messages),
    };
  }, [locale, overrides]);

  return <IskraLocaleContext.Provider value={value}>{children}</IskraLocaleContext.Provider>;
}
