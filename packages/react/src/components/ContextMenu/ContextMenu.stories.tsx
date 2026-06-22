import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from './index.js';
import { Card } from '../Card/Card.js';
import { Button } from '../Button/Button.js';
import { Icon } from '../Icon/Icon.js';

const meta = {
  title: 'Primitives/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Контекстное и action-меню (WAI-ARIA Menu). ПКМ или клик по триггеру. Состав: ContextMenu → Trigger → Content → Item / Separator.',
      },
    },
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card padding="m" style={{ width: 280, cursor: 'context-menu' }}>
          ПКМ или клик — открыть меню
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => undefined}>Копировать</ContextMenuItem>
        <ContextMenuItem onSelect={() => undefined}>Вставить</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={() => undefined}>Свойства</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Button type="button" variant="outline">
          Действия
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem icon={<Icon name="refresh" size={16} />} onSelect={() => undefined}>
          Обновить
        </ContextMenuItem>
        <ContextMenuItem icon={<Icon name="search" size={16} />} onSelect={() => undefined}>
          Найти
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const DestructiveAndDisabled: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <Button type="button">Меню</Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => undefined}>Редактировать</ContextMenuItem>
        <ContextMenuItem disabled onSelect={() => undefined}>
          Архивировать (недоступно)
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive onSelect={() => undefined}>
          Удалить
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const TableRow: Story = {
  render: () => (
    <div style={{ width: 480, border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 80px',
              padding: '10px 12px',
              cursor: 'context-menu',
            }}
          >
            <span>INC-1042</span>
            <span>Критический</span>
            <span>Открыт</span>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => undefined}>Открыть инцидент</ContextMenuItem>
          <ContextMenuItem onSelect={() => undefined}>Назначить</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem destructive onSelect={() => undefined}>
            Закрыть
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Button type="button" variant="outline" onClick={() => setOpen(true)}>
          Открыть программно
        </Button>
        <ContextMenu open={open} onOpenChange={setOpen}>
          <ContextMenuTrigger>
            <Button type="button">Триггер</Button>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onSelect={() => setOpen(false)}>Закрыть</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    );
  },
};

export const ClickOnly: Story = {
  render: () => (
    <ContextMenu triggerOn="click">
      <ContextMenuTrigger asChild>
        <Button type="button">Только клик</Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => undefined}>Экспорт</ContextMenuItem>
        <ContextMenuItem onSelect={() => undefined}>Импорт</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const ContextMenuOnly: Story = {
  render: () => (
    <ContextMenu triggerOn="contextmenu">
      <ContextMenuTrigger asChild>
        <Card padding="m" style={{ width: 240 }}>
          Только ПКМ
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => undefined}>Копировать</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
