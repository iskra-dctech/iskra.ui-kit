import type { ChartType } from '@iskra-ui/core';
import { useMemo } from 'react';
import { useIskraT } from '../../i18n/useIskraT.js';
import { Icon, type IconName } from '../Icon/Icon.js';
import { IconButton } from '../IconButton/IconButton.js';
import { cx } from '../../utils/cx.js';
import './ChartTypeSelector.css';

export interface ChartTypeSelectorProps {
  value: ChartType;
  onChange: (type: ChartType) => void;
  disabled?: boolean;
  className?: string;
}

const CHART_TYPE_KEYS: { type: ChartType; icon: IconName; labelKey: 'chart.types.line' | 'chart.types.bar' | 'chart.types.area' | 'chart.types.scatter' }[] = [
  { type: 'line', icon: 'chart-line', labelKey: 'chart.types.line' },
  { type: 'bar', icon: 'chart-bar', labelKey: 'chart.types.bar' },
  { type: 'area', icon: 'chart-area', labelKey: 'chart.types.area' },
  { type: 'scatter', icon: 'chart-scatter', labelKey: 'chart.types.scatter' },
];

/**
 * ChartTypeSelector — toggle group for picking a chart visualisation type.
 */
export function ChartTypeSelector({
  value,
  onChange,
  disabled = false,
  className,
}: ChartTypeSelectorProps) {
  const t = useIskraT();
  const options = useMemo(
    () => CHART_TYPE_KEYS.map((opt) => ({ ...opt, label: t(opt.labelKey) })),
    [t],
  );

  return (
    <div
      className={cx('ik-chart-type', className)}
      role="radiogroup"
      aria-label={t('a11y.chartType')}
    >
      {options.map((opt) => (
        <IconButton
          key={opt.type}
          type="button"
          role="radio"
          aria-checked={value === opt.type}
          variant={value === opt.type ? 'outline' : 'ghost'}
          size="s"
          className={cx(value === opt.type && 'is-selected')}
          icon={<Icon name={opt.icon} size={14} />}
          aria-label={opt.label}
          disabled={disabled}
          onClick={() => onChange(opt.type)}
        />
      ))}
    </div>
  );
}
