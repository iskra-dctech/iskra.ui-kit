import type { Preview } from '@storybook/react-vite';
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
  },
  globalTypes: {
    theme: {
      description: 'Тема Искра.DCI',
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
  },
  decorators: [
    (Story, context) => {
      const theme = THEMES[context.globals.theme as string] ?? '';
      if (typeof document !== 'undefined') {
        document.body.classList.remove('theme-cold', 'theme-warm');
        if (theme) document.body.classList.add(theme);
        document.body.style.background = 'var(--bg)';
        document.body.style.color = 'var(--fg1)';
      }
      return Story();
    },
  ],
};

export default preview;
