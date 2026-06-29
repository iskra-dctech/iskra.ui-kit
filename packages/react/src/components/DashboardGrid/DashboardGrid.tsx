import { type ReactElement, useMemo } from 'react';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import type { LayoutItem } from '@iskra-ui/core';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { MEDIA_BELOW_MD } from '../../responsive/breakpoints.js';
import { cx } from '../../utils/cx.js';
import './DashboardGrid.css';

const AutoGridLayout = WidthProvider(GridLayout);

interface RglLayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  static?: boolean;
}

export interface DashboardGridProps {
  layout: LayoutItem[];
  onLayoutChange?: (layout: LayoutItem[]) => void;
  editable?: boolean;
  children: ReactElement[];
  rowHeight?: number;
  className?: string;
}

function toRglLayout(items: LayoutItem[]): RglLayoutItem[] {
  return items.map((item) => ({
    i: item.i,
    x: item.x,
    y: item.y,
    w: item.w,
    h: item.h,
    minW: item.minW,
    minH: item.minH,
  }));
}

function fromRglLayout(items: RglLayoutItem[]): LayoutItem[] {
  return items.map((item) => ({
    i: item.i,
    x: item.x,
    y: item.y,
    w: item.w,
    h: item.h,
    minW: item.minW,
    minH: item.minH,
  }));
}

/**
 * DashboardGrid — drag-and-resize widget layout. On viewports below `md` stacks
 * widgets in a single column and disables drag.
 */
export function DashboardGrid({
  layout,
  onLayoutChange,
  editable = false,
  children,
  rowHeight = 80,
  className,
}: DashboardGridProps) {
  const isMobile = useMediaQuery(MEDIA_BELOW_MD);

  const rglLayout = useMemo(() => {
    if (!isMobile) return toRglLayout(layout);
    return layout.map((item, index) => ({
      i: item.i,
      x: 0,
      y: index * item.h,
      w: 1,
      h: item.h,
      minW: 1,
      minH: item.minH,
      static: true,
    }));
  }, [layout, isMobile]);

  const cols = isMobile ? 1 : 12;

  return (
    <div className={cx('ik-dashboard-grid', editable && !isMobile && 'is-editable', className)}>
      <AutoGridLayout
        className="layout"
        layout={rglLayout}
        cols={cols}
        rowHeight={rowHeight}
        margin={[12, 12]}
        containerPadding={[0, 0]}
        isDraggable={editable && !isMobile}
        isResizable={editable && !isMobile}
        compactType="vertical"
        onLayoutChange={(next) => {
          if (!isMobile) onLayoutChange?.(fromRglLayout(next));
        }}
        draggableHandle=".ik-dash-widget-hd"
      >
        {children}
      </AutoGridLayout>
    </div>
  );
}
