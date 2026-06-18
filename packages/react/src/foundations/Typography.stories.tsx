import type { Meta, StoryObj } from '@storybook/react-vite';
import { DocsNote, TypeRow } from './_docs.js';

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  render: () => (
    <div style={{ maxWidth: 700 }}>
      <TypeRow
        spec="H1 · 24/600"
        style={{
          fontSize: 'var(--text-h1)',
          fontWeight: 'var(--wt-h1)',
          letterSpacing: '-.02em',
          lineHeight: 'var(--lh-h1)',
          fontFamily: 'var(--font-display)',
        }}
      >
        Fleet Intelligence
      </TypeRow>
      <TypeRow
        spec="H2 · 20/600"
        style={{
          fontSize: 'var(--text-h2)',
          fontWeight: 'var(--wt-h2)',
          letterSpacing: '-.02em',
          lineHeight: 'var(--lh-h2)',
          fontFamily: 'var(--font-display)',
        }}
      >
        Device Detail · Command Center
      </TypeRow>
      <TypeRow
        spec="H3 · 18/600"
        style={{
          fontSize: 'var(--text-h3)',
          fontWeight: 'var(--wt-h3)',
          letterSpacing: '-.01em',
          lineHeight: 'var(--lh-h3)',
          fontFamily: 'var(--font-display)',
          borderBottom: 'none',
        }}
      >
        Reconciliation Activity
      </TypeRow>
    </div>
  ),
};

export const Body: Story = {
  render: () => (
    <div style={{ maxWidth: 700, fontSize: 14 }}>
      <TypeRow
        spec="UI · 14/400"
        style={{
          fontSize: 'var(--text-ui)',
          fontWeight: 'var(--wt-ui)',
          lineHeight: 'var(--lh-ui)',
          color: 'var(--fg1)',
          fontFamily: 'var(--font-ui)',
        }}
      >
        Платформа сопоставляет ожидаемое и наблюдаемое состояние.
      </TypeRow>
      <TypeRow
        spec="UI · 14/500"
        style={{
          fontSize: 'var(--text-ui-med)',
          fontWeight: 'var(--wt-ui-med)',
          lineHeight: 'var(--lh-ui)',
          color: 'var(--fg1)',
          fontFamily: 'var(--font-ui)',
        }}
      >
        Force Sync · Детали · Power Reset
      </TypeRow>
      <TypeRow
        spec="SMALL · 12/400"
        style={{
          fontSize: 'var(--text-small)',
          lineHeight: 'var(--lh-sm)',
          color: 'var(--fg2)',
          fontFamily: 'var(--font-ui)',
          borderBottom: 'none',
        }}
      >
        Вспомогательная информация, метаданные, подписи к полям ввода.
      </TypeRow>
    </div>
  ),
};

const MONO_LABELS = ['Fleet in Sync', 'Inventory', 'Reconciler', 'Control & Monitoring'] as const;

export const Labels: Story = {
  render: () => (
    <div style={{ maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
        {MONO_LABELS.map((label) => (
          <span
            key={label}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-label)',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: 'var(--fg2)',
            }}
          >
            {label}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-label)',
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: 'var(--accent-safe)',
          }}
        >
          Group · Architecture
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-label)',
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: 'var(--fg1)',
          }}
        >
          Runtime Contract
        </span>
      </div>
      <DocsNote>
        JetBrains Mono · 11px · letter-spacing .12em · uppercase · eyebrows & section labels
      </DocsNote>
    </div>
  ),
};

export const Mono: Story = {
  render: () => (
    <div style={{ maxWidth: 700, fontFamily: 'var(--font-mono)' }}>
      <TypeRow
        spec="IP / HOST"
        style={{ fontSize: 'var(--text-mono)', lineHeight: 'var(--lh-mono)', color: 'var(--fg1)' }}
      >
        leaf-07.msk · 10.0.2.7
      </TypeRow>
      <TypeRow
        spec="ID / METRIC"
        style={{ fontSize: 'var(--text-mono)', lineHeight: 'var(--lh-mono)', color: 'var(--fg1)' }}
      >
        srv-01 · 142 ms · CPU 73%
      </TypeRow>
      <TypeRow
        spec="CLI"
        style={{ fontSize: 'var(--text-mono)', lineHeight: 'var(--lh-mono)', color: 'var(--fg1)' }}
      >
        <span style={{ color: 'var(--accent-safe)' }}>curl</span> -X POST
        .../devices/leaf-07/actions/sync
      </TypeRow>
      <TypeRow
        spec="YAML"
        style={{
          fontSize: 'var(--text-mono)',
          lineHeight: 'var(--lh-mono)',
          color: 'var(--fg1)',
          borderBottom: 'none',
        }}
      >
        desired: {'{'} state: <span style={{ color: 'var(--accent-safe)' }}>synced</span> {'}'}
      </TypeRow>
    </div>
  ),
};
