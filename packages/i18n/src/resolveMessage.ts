import type { IskraMessages, MessageKey } from './types.js';

export function resolveMessage(messages: IskraMessages, key: MessageKey): string {
  const parts = key.split('.');
  let current: unknown = messages;

  for (const part of parts) {
    if (current == null || typeof current !== 'object') {
      throw new Error(`Missing i18n message: ${key}`);
    }
    current = (current as Record<string, unknown>)[part];
  }

  if (typeof current !== 'string') {
    throw new Error(`Missing i18n message: ${key}`);
  }

  return current;
}
