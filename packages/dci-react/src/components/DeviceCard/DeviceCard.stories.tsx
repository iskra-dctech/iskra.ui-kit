import type { Meta, StoryObj } from '@storybook/react';
import { DeviceCard } from './DeviceCard.js';

const meta: Meta<typeof DeviceCard> = {
  title: 'Domain/DeviceCard',
  component: DeviceCard,
};
export default meta;
type Story = StoryObj<typeof DeviceCard>;

export const InSync: Story = {
  args: {
    name: 'spine-01.msk',
    ip: '10.0.1.1',
    status: 'sync',
    metricLabel: 'Трафик · 24 ч',
    metricValue: '1.4 Гбит/с',
    sparkline: [0.4, 0.55, 0.35, 0.7, 0.6, 0.45, 0.75, 0.58],
    tags: ['spine', 'prod'],
  },
};

export const Drift: Story = {
  args: {
    name: 'leaf-07.msk',
    ip: '10.0.2.7',
    status: 'drift',
    metricLabel: 'CPU · 24 ч',
    metricValue: '88%',
    metricAlert: true,
    sparkline: [0.5, 0.85, 0.9, 0.88, 0.6, 0.4, 0.55, 0.42],
    tags: ['leaf', 'drift'],
    onSelect: () => {},
  },
};
