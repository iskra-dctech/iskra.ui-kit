import type { App } from 'vue';
import type { DeepPartial, IskraLocale, IskraMessages } from '@iskra-ui/i18n';
import { createIskraLocaleContext, IskraLocaleKey } from './context.js';

export interface IskraLocalePluginOptions {
  locale?: IskraLocale;
  messages?: DeepPartial<IskraMessages>;
}

export const IskraLocalePlugin = {
  install(app: App, options: IskraLocalePluginOptions = {}) {
    app.provide(IskraLocaleKey, createIskraLocaleContext(options.locale, options.messages));
  },
};

export { default as IskraProvider } from './IskraProvider.vue';
export { useIskraLocale, useIskraT } from './useIskraT.js';
export type { IskraLocaleContextValue } from './context.js';
