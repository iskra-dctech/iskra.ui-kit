let counter = 0;

/**
 * Deterministic-per-runtime id generator for wiring `aria-*` relationships in
 * environments without `useId` (e.g. Vue, plain DOM). Prefer a framework's
 * native id hook when available.
 */
export function createId(prefix = 'ik'): string {
  counter += 1;
  return `${prefix}-${counter}`;
}

/** Reset the counter — test-only helper for deterministic snapshots. */
export function resetIdCounter(): void {
  counter = 0;
}
