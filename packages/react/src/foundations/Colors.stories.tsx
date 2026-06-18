import type { Meta, StoryObj } from '@storybook/react-vite';
import { TokenSwatch } from './_docs.js';

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasePalette: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 10,
        maxWidth: 700,
      }}
    >
      <TokenSwatch name="Anthracite Deep" hint="--bg · page bg" token="--bg" />
      <TokenSwatch name="Elevated Graphite" hint="--panel · cards" token="--panel" />
      <TokenSwatch name="Border" hint="--line · hairline" token="--line" />
      <TokenSwatch name="Text Primary" hint="--fg1" token="--fg1" />
      <TokenSwatch name="Text Secondary" hint="--fg2" token="--fg2" />
      <TokenSwatch name="Text Tertiary" hint="--fg3" token="--fg3" />
    </div>
  ),
};

export const Accent: Story = {
  render: () => (
    <div style={{ maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        <TokenSwatch name="Cyber Mint" hint="--accent · border/indicator" token="--accent" />
        <TokenSwatch name="Mint Hover" hint="--accent-hover" token="--accent-hover" />
        <TokenSwatch
          name="Mint Safe (text)"
          hint="--accent-safe · AA on dark"
          token="--accent-safe"
        />
      </div>
      <div
        style={{
          display: 'flex',
          gap: 14,
          alignItems: 'center',
          background: 'var(--panel)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius)',
          padding: '12px 14px',
        }}
      >
        <span style={{ color: 'var(--status-err)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
          ✕ --accent as text
        </span>
        <span style={{ fontSize: 12, color: 'var(--fg2)' }}>1.6:1 — fails WCAG AA</span>
        <span style={{ flex: 1 }} />
        <span style={{ color: 'var(--accent-safe)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
          ✓ --accent-safe as text
        </span>
        <span style={{ fontSize: 12, color: 'var(--fg2)' }}>use for accent labels</span>
      </div>
    </div>
  ),
};

const STATUS_ROWS = [
  { token: '--status-ok', name: 'Sync / Online', use: 'синхронизация, успех' },
  { token: '--status-warn', name: 'Drift / Warning', use: 'расхождение состояния' },
  { token: '--status-err', name: 'Error / Critical', use: 'ошибка, потеря связи' },
  { token: '--status-off', name: 'Maintenance', use: 'обслуживание, отключено' },
  { token: '--status-info', name: 'Info / Neutral', use: 'инфо (минимально)' },
] as const;

export const Status: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9, maxWidth: 700 }}>
      {STATUS_ROWS.map((row) => (
        <div key={row.token} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              flexShrink: 0,
              background: `var(${row.token})`,
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg1)', width: 150 }}>
            {row.name}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--fg2)',
              width: 100,
            }}
          >
            {row.token}
          </span>
          <span style={{ fontSize: 12, color: 'var(--fg2)' }}>{row.use}</span>
        </div>
      ))}
    </div>
  ),
};

const THEME_SWATCHES = ['--bg', '--panel', '--line', '--fg1', '--fg2', '--accent-safe'] as const;

const LightThemePanel = ({
  themeClass,
  label,
}: {
  themeClass: 'theme-cold' | 'theme-warm';
  label: string;
}) => (
  <div
    className={themeClass}
    style={{
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      border: '1px solid var(--line)',
      background: 'var(--bg)',
    }}
  >
    <div
      style={{
        padding: '9px 12px',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        background: 'var(--panel)',
        color: 'var(--fg1)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {label}
    </div>
    <div style={{ padding: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {THEME_SWATCHES.map((token) => (
        <div
          key={token}
          title={token}
          style={{
            width: 38,
            height: 38,
            borderRadius: 3,
            border: '1px solid var(--line-soft)',
            background: `var(${token})`,
          }}
        />
      ))}
    </div>
  </div>
);

export const LightThemes: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 14,
        maxWidth: 700,
        padding: 18,
        background: 'var(--panel-muted)',
        borderRadius: 'var(--radius)',
      }}
    >
      <LightThemePanel themeClass="theme-cold" label="Холодный офф-вайт" />
      <LightThemePanel themeClass="theme-warm" label="Тёплый песочный" />
    </div>
  ),
};
