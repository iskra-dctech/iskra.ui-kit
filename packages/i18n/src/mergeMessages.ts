import type { DeepPartial, IskraMessages } from './types.js'

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function mergeDeep(base: Record<string, unknown>, overrides?: Record<string, unknown>): Record<string, unknown> {
  if (!overrides) return base

  const result = { ...base }

  for (const key of Object.keys(overrides)) {
    const overrideValue = overrides[key]
    const baseValue = base[key]

    if (overrideValue === undefined) continue

    if (isPlainObject(overrideValue) && isPlainObject(baseValue)) {
      result[key] = mergeDeep(baseValue, overrideValue)
    } else {
      result[key] = overrideValue
    }
  }

  return result
}

export function mergeMessages(
  base: IskraMessages,
  overrides?: DeepPartial<IskraMessages>,
): IskraMessages {
  return mergeDeep(
    base as unknown as Record<string, unknown>,
    overrides as unknown as Record<string, unknown> | undefined,
  ) as IskraMessages
}
