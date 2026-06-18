import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, ICON_NAMES } from './Icon.js';

const meta = {
  title: 'Foundations/Icon',
  component: Icon,
  args: { name: 'refresh', size: 20 },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};

const DOMAIN_ICONS = [
  'storage',
  'switch-device',
  'hsm',
  'pdu',
  'laptop',
  'desktop',
  'telegram',
  'vk',
  'max',
  'book-marked',
] as const;

export const DomainIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 16,
        color: 'var(--fg1)',
      }}
    >
      {DOMAIN_ICONS.map((n) => (
        <div key={n} style={{ display: 'grid', placeItems: 'center', gap: 6, fontSize: 10 }}>
          <Icon name={n} size={20} />
          <span style={{ color: 'var(--fg2)' }}>{n}</span>
        </div>
      ))}
    </div>
  ),
};

export const All: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gap: 16,
        color: 'var(--fg1)',
      }}
    >
      {ICON_NAMES.map((n) => (
        <div key={n} style={{ display: 'grid', placeItems: 'center', gap: 6, fontSize: 10 }}>
          <Icon name={n} size={20} />
          <span style={{ color: 'var(--fg2)' }}>{n}</span>
        </div>
      ))}
    </div>
  ),
};
