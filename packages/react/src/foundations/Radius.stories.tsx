import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Foundations/Radius',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 28, alignItems: 'flex-end', maxWidth: 700 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 88,
            height: 64,
            background: 'var(--panel)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius)',
          }}
        />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg2)' }}>
          <b style={{ color: 'var(--fg1)' }}>4px</b> · --radius · default
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 88,
            height: 64,
            background: 'var(--panel)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-sm)',
          }}
        />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg2)' }}>
          <b style={{ color: 'var(--fg1)' }}>2px</b> · --radius-sm · chips/tags
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 14,
            height: 14,
            background: 'var(--accent)',
            borderRadius: '50%',
          }}
        />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg2)' }}>
          <b style={{ color: 'var(--fg1)' }}>50%</b> · status dot
        </div>
      </div>
      <p style={{ fontSize: 12, color: 'var(--fg3)', maxWidth: 200, lineHeight: 1.5, margin: 0 }}>
        Fixed radius across the system — buttons, cards, inputs, modals. Strict right angles; never
        pill-shaped.
      </p>
    </div>
  ),
};
