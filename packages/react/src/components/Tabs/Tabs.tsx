import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { createTabsIds, firstEnabledValue, getNextTabValue } from '@iskra-dci/core';
import { cx } from '../../utils/cx.js';
import './Tabs.css';

export interface TabItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  'aria-label'?: string;
}

/**
 * Tabs — WAI-ARIA Tabs pattern. Roving tabindex on the tablist with
 * Left/Right/Home/End navigation; only the active tab is in the tab order.
 */
export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  'aria-label': ariaLabel,
}: TabsProps) {
  const baseId = useId();
  const ids = createTabsIds(baseId);
  const controlled = value != null;
  const [internal, setInternal] = useState(defaultValue ?? firstEnabledValue(items));
  const current = controlled ? value : internal;
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const select = (v: string) => {
    if (!controlled) setInternal(v);
    onValueChange?.(v);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const nextValue = getNextTabValue(items, items[index]!.value, e.key);
    if (nextValue) {
      e.preventDefault();
      select(nextValue);
      tabRefs.current[nextValue]?.focus();
    }
  };

  return (
    <div className={cx('ik-tabs', className)}>
      <div className="ik-tabs-list" role="tablist" aria-label={ariaLabel}>
        {items.map((item, i) => {
          const selected = item.value === current;
          return (
            <button
              key={item.value}
              ref={(el) => {
                tabRefs.current[item.value] = el;
              }}
              type="button"
              role="tab"
              id={ids.tab(item.value)}
              aria-selected={selected}
              aria-controls={ids.panel(item.value)}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              className="ik-tabs-tab"
              onClick={() => select(item.value)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.value}
          role="tabpanel"
          id={ids.panel(item.value)}
          aria-labelledby={ids.tab(item.value)}
          hidden={item.value !== current}
          tabIndex={0}
          className="ik-tabs-panel"
        >
          {item.value === current && item.content}
        </div>
      ))}
    </div>
  );
}
