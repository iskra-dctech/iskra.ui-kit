import { describe, expect, it } from 'vitest';
import { createTranslator, formatMessage, getMessages, mergeMessages } from './index.js';

describe('@iskra-ui/i18n', () => {
  it('returns English messages by default locale', () => {
    expect(getMessages('en').common.close).toBe('Close');
  });

  it('returns Russian messages for ru locale', () => {
    expect(getMessages('ru').common.close).toBe('Закрыть');
  });

  it('interpolates template params', () => {
    expect(formatMessage('{{count}} items', { count: 3 })).toBe('3 items');
  });

  it('resolves nested keys via translator', () => {
    const t = createTranslator(getMessages('en'));
    expect(t('widget.expandLabel', { title: 'CPU' })).toBe('Expand chart CPU');
  });

  it('deep-merges partial overrides', () => {
    const merged = mergeMessages(getMessages('en'), {
      common: { close: 'Dismiss' },
    });
    expect(merged.common.close).toBe('Dismiss');
    expect(merged.common.clear).toBe('Clear');
  });
});
