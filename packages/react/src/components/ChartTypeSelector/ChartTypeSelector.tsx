import type { ChartType } from '@iskra-ui/core';
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

const OPTIONS: { type: ChartType; icon: IconName; label: string }[] = [
  { type: 'line', icon: 'chart-line', label: 'Линейный график' },
  { type: 'bar', icon: 'chart-bar', label: 'Столбчатая диаграмма' },
  { type: 'area', icon: 'chart-area', label: 'Область' },
  { type: 'scatter', icon: 'chart-scatter', label: 'Точечная диаграмма' },
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
  return (
    <div
      className={cx('ik-chart-type', className)}
      role="radiogroup"
      aria-label="Тип графика"
    >
      {OPTIONS.map((opt) => (
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
