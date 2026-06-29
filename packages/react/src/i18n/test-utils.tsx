import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';
import type { DeepPartial, IskraLocale, IskraMessages } from '@iskra-ui/i18n';
import { IskraProvider } from './IskraProvider.js';

export interface RenderWithIskraOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: IskraLocale;
  messages?: DeepPartial<IskraMessages>;
}

export function renderWithIskra(
  ui: ReactElement,
  options: RenderWithIskraOptions = {},
): RenderResult {
  const { locale = 'en', messages, ...renderOptions } = options;

  return render(ui, {
    ...renderOptions,
    wrapper: ({ children }) => (
      <IskraProvider locale={locale} messages={messages}>
        {children}
      </IskraProvider>
    ),
  });
}
