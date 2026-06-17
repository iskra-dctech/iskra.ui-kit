import type { Meta, StoryObj } from '@storybook/react-vite';
import { CliRow } from './CliRow.js';

const meta: Meta<typeof CliRow> = {
  title: 'Domain/CliRow',
  component: CliRow,
};
export default meta;
type Story = StoryObj<typeof CliRow>;

export const Basic: Story = {
  args: {
    command: 'curl -X POST .../api/v1/devices/leaf-07/actions/sync',
  },
};
