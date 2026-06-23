import type { enMessages } from './catalogs/en.js'

export type IskraLocale = 'en' | 'ru'

type MessageTreeFrom<T> = T extends string
  ? string
  : T extends Record<string, unknown>
    ? { [K in keyof T]: MessageTreeFrom<T[K]> }
    : never

export type IskraMessages = MessageTreeFrom<typeof enMessages>

type LeafPaths<T, Prefix extends string = ''> = T extends string
  ? Prefix
  : T extends Record<string, unknown>
    ? {
        [K in keyof T & string]: LeafPaths<T[K], Prefix extends '' ? K : `${Prefix}.${K}`>
      }[keyof T & string]
    : never

export type MessageKey = LeafPaths<typeof enMessages>

export type DeepPartial<T> = T extends string
  ? string
  : T extends Record<string, unknown>
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : never

export type TranslateFn = (
  key: MessageKey,
  params?: Record<string, string | number>,
) => string
