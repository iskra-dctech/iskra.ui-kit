import { forwardRef, type ReactNode } from 'react';
import { Button, type ButtonProps } from '../Button/Button.js';

export interface IconButtonProps extends Omit<
  ButtonProps,
  'iconOnly' | 'iconBefore' | 'iconAfter'
> {
  /** The icon to render. `children` is accepted as a fallback alias. */
  icon?: ReactNode;
  /** Accessible name — required because there is no visible text. */
  'aria-label': string;
}

/** IconButton — square, icon-only button. Always requires an accessible name. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, children, ...rest },
  ref,
) {
  return (
    <Button ref={ref} iconOnly {...rest}>
      {icon ?? children}
    </Button>
  );
});
