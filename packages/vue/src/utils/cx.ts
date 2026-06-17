/** Join truthy class fragments — mirrors the React package's `cx`. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
