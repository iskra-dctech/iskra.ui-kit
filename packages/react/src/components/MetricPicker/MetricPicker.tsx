import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { MetricDefinition } from '@iskra-ui/core';
import { useIskraT } from '../../i18n/useIskraT.js';
import { Popover } from '../Popover/Popover.js';
import { SearchField } from '../SearchField/SearchField.js';
import { cx } from '../../utils/cx.js';
import './MetricPicker.css';

export interface MetricPickerProps {
  metrics: MetricDefinition[];
  value?: string;
  onChange: (metricId: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

interface GroupedMetric {
  group: string;
  items: MetricDefinition[];
}

function groupMetrics(metrics: MetricDefinition[], defaultGroup: string): GroupedMetric[] {
  const map = new Map<string, MetricDefinition[]>();
  for (const m of metrics) {
    const g = m.group ?? defaultGroup;
    const list = map.get(g) ?? [];
    list.push(m);
    map.set(g, list);
  }
  return [...map.entries()].map(([group, items]) => ({ group, items }));
}

/**
 * MetricPicker — searchable combobox for selecting a metric from a catalog.
 */
export function MetricPicker({
  metrics,
  value,
  onChange,
  placeholder,
  disabled = false,
  className,
}: MetricPickerProps) {
  const t = useIskraT();
  const resolvedPlaceholder = placeholder ?? t('metricPicker.placeholder');
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selected = metrics.find((m) => m.id === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return metrics;
    return metrics.filter(
      (m) =>
        m.label.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        m.description?.toLowerCase().includes(q),
    );
  }, [metrics, query]);

  const grouped = useMemo(
    () => groupMetrics(filtered, t('metricPicker.otherGroup')),
    [filtered, t],
  );

  const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  const listEpoch = `${query}:${open}`;
  const [activeEpoch, setActiveEpoch] = useState(listEpoch);
  const [activeIndex, setActiveIndex] = useState(0);

  if (listEpoch !== activeEpoch) {
    setActiveEpoch(listEpoch);
    setActiveIndex(0);
  }

  const selectMetric = (id: string) => {
    onChange(id);
    setOpen(false);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flat.length - 1));
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }

    if (e.key === 'Enter' && flat[activeIndex]) {
      e.preventDefault();
      selectMetric(flat[activeIndex].id);
    }
  };

  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  let flatIndex = -1;

  return (
    <div className={cx('ik-metric-picker', className)}>
      <Popover
        open={open}
        onOpenChange={setOpen}
        placement="bottom-start"
        trigger={
          <SearchField
            value={open ? query : (selected?.label ?? query)}
            onChange={(e) => {
              setQuery(e.target.value);
              if (!open) setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={resolvedPlaceholder}
            disabled={disabled}
            clearable={false}
            aria-autocomplete="list"
            aria-controls={open ? listId : undefined}
            aria-expanded={open}
            role="combobox"
          />
        }
        panelClassName="ik-metric-picker-panel"
      >
        <ul id={listId} className="ik-metric-picker-list" role="listbox">
          {flat.length === 0 ? (
            <li className="ik-metric-picker-empty">{t('metricPicker.empty')}</li>
          ) : (
            grouped.map((g) => (
              <li key={g.group}>
                <div className="ik-metric-picker-group">{g.group}</div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {g.items.map((m) => {
                    flatIndex += 1;
                    const idx = flatIndex;
                    return (
                      <li key={m.id}>
                        <button
                          ref={(el) => {
                            itemRefs.current[idx] = el;
                          }}
                          type="button"
                          role="option"
                          aria-selected={value === m.id}
                          className={cx(
                            'ik-metric-picker-item',
                            idx === activeIndex && 'is-active',
                          )}
                          onClick={() => selectMetric(m.id)}
                        >
                          <span className="ik-metric-picker-label">{m.label}</span>
                          {m.description && (
                            <span className="ik-metric-picker-desc">{m.description}</span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))
          )}
        </ul>
      </Popover>
    </div>
  );
}
