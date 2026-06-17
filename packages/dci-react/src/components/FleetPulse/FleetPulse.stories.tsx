import type { Meta, StoryObj } from '@storybook/react';
import { FleetPulse } from './FleetPulse.js';

const meta: Meta<typeof FleetPulse> = {
  title: 'Domain/FleetPulse',
  component: FleetPulse,
};
export default meta;
type Story = StoryObj<typeof FleetPulse>;

export const WithIssues: Story = {
  args: {
    percent: 81,
    defaultOpen: true,
    issues: [
      {
        id: '1',
        name: 'border-01.spb',
        reason: 'Потеря связи с устройством',
        severity: 'error',
        actionLabel: 'Retry',
      },
      {
        id: '2',
        name: 'leaf-07.msk',
        reason: 'Drift: BGP-конфигурация',
        severity: 'drift',
        actionLabel: 'Sync',
      },
      {
        id: '3',
        name: 'leaf-12.msk',
        reason: 'Drift: MTU расходится',
        severity: 'drift',
        actionLabel: 'Sync',
      },
    ],
  },
};

export const AllHealthy: Story = {
  args: { percent: 100, issues: [] },
};
