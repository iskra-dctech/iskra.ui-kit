import { formatMessage } from './formatMessage.js'
import { resolveMessage } from './resolveMessage.js'
import type { IskraMessages, MessageKey, TranslateFn } from './types.js'

export function createTranslator(messages: IskraMessages): TranslateFn {
  return (key: MessageKey, params?: Record<string, string | number>) =>
    formatMessage(resolveMessage(messages, key), params)
}
