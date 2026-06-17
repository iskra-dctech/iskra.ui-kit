import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx.js';
import './Card.css';

export type CardPadding = 'none' | 's' | 'm' | 'l';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  elevated?: boolean;
  /** Hoverable/focusable affordance. Set `onClick` and an accessible name. */
  interactive?: boolean;
  selected?: boolean;
}

/** Card — surface container. Use Card.Header / Card.Body / Card.Footer for structured content. */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { padding = 'm', elevated = false, interactive = false, selected = false, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'ik-card',
        `ik-card-pad-${padding}`,
        elevated && 'ik-card-elevated',
        interactive && 'ik-card-interactive',
        selected && 'ik-card-selected',
        className,
      )}
      tabIndex={interactive ? 0 : undefined}
      {...rest}
    />
  );
}) as React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
};

function CardHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('ik-card-header', className)} {...rest} />;
}
function CardBody({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('ik-card-body', className)} {...rest} />;
}
function CardFooter({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('ik-card-footer', className)} {...rest} />;
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
