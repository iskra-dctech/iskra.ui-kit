import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs.js';

const items = [
  { value: 'overview', label: 'Обзор', content: 'Сводка состояния устройства.' },
  { value: 'config', label: 'Конфигурация', content: 'Текущий и desired state.' },
  { value: 'history', label: 'История', content: 'Журнал изменений и дрейфов.' },
  { value: 'raw', label: 'Raw', content: 'Сырой вывод CLI.', disabled: true },
];

const meta = {
  title: 'Patterns/Tabs',
  component: Tabs,
  args: { items, 'aria-label': 'Разделы устройства' },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
