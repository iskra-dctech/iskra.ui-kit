import { tokens } from '@iskra-ui/tokens';

export const BP_SM = tokens['--bp-sm'];
export const BP_MD = tokens['--bp-md'];
export const BP_LG = tokens['--bp-lg'];
export const BP_XL = tokens['--bp-xl'];

/** Viewports narrower than `bp-md` (767px and below). */
export const MEDIA_BELOW_MD = `(max-width: calc(${BP_MD} - 1px))`;

/** Viewports `bp-md` and wider. */
export const MEDIA_MD_UP = `(min-width: ${BP_MD})`;

export type BreakpointName = 'below-md' | 'md-up';

const BREAKPOINT_MEDIA: Record<BreakpointName, string> = {
  'below-md': MEDIA_BELOW_MD,
  'md-up': MEDIA_MD_UP,
};

export function mediaQueryForBreakpoint(name: BreakpointName): string {
  return BREAKPOINT_MEDIA[name];
}
