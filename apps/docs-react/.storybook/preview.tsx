import type { Preview } from '@storybook/react-vite';
import { IskraProvider } from '@iskra-ui/react';
import type { IskraLocale } from '@iskra-ui/i18n';
// Full token + reset + font stylesheet; component CSS is bundled per-story by Vite.
import '@iskra-ui/styles/index.css';

const THEMES: Record<string, string> = {
  dark: '',
  cold: 'theme-cold',
  warm: 'theme-warm',
};

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'error' },
    backgrounds: { disabled: true },
    viewport: {
      viewports: {
        compact375: {
          name: 'Compact (375)',
          styles: { width: '375px', height: '667px' },
          type: 'mobile',
        },
        compact428: {
          name: 'Compact L (428)',
          styles: { width: '428px', height: '926px' },
          type: 'mobile',
        },
        tablet768: {
          name: 'Tablet (768)',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop1280: {
          name: 'Desktop (1280)',
          styles: { width: '1280px', height: '800px' },
          type: 'desktop',
        },
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Iskra.DCI theme',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'dark', title: 'Dark (default)' },
          { value: 'cold', title: 'Cold light' },
          { value: 'warm', title: 'Warm light' },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Component locale',
      defaultValue: 'en',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'ru', title: 'Russian' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = THEMES[context.globals.theme as string] ?? '';
      const locale = (context.globals.locale as IskraLocale) ?? 'en';
      if (typeof document !== 'undefined') {
        document.body.classList.remove('theme-cold', 'theme-warm');
        if (theme) document.body.classList.add(theme);
        document.body.style.background = 'var(--bg)';
        document.body.style.color = 'var(--fg1)';
        document.documentElement.lang = locale;
      }
      return (
        <IskraProvider locale={locale}>
          <Story />
        </IskraProvider>
      );
    },
  ],
};

export default preview;
