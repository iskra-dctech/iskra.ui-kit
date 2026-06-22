import type { Meta, StoryObj } from '@storybook/react-vite';
import { DeviceCard } from '../components/DeviceCard/DeviceCard.js';
import { DataList } from '@iskra-ui/react';

const meta = {
  title: 'Patterns/Inventory/DeviceCards',
  parameters: {
    layout: 'padded',
    viewport: { defaultViewport: 'compact375' },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const devices = [
  { id: '1', name: 'leaf-07.msk', ip: '10.0.2.7', status: 'sync' as const, cpu: '42%' },
  { id: '2', name: 'spine-01.msk', ip: '10.0.2.1', status: 'drift' as const, cpu: '88%' },
];

export const CompactDeviceList: Story = {
  render: () => (
    <DataList
      items={devices}
      getItemKey={(d) => d.id}
      aria-label="Инвентарь устройств"
      renderItem={(d) => (
        <DeviceCard
          name={d.name}
          ip={d.ip}
          status={d.status}
          metricLabel="CPU · 24 ч"
          metricValue={d.cpu}
          metricAlert={d.status === 'drift'}
          sparkline={[0.3, 0.5, 0.7, 0.88]}
          tags={['msk']}
        />
      )}
    />
  ),
};
