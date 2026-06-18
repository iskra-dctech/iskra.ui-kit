import type { Meta, StoryObj } from '@storybook/react-vite'
import { DocsNote, TokenRow } from './_docs.js'

const meta = {
  title: 'Foundations/Spacing',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const SPACING_SCALE = [
  { token: '--s1', px: '4px', width: '4px' },
  { token: '--s2', px: '8px', width: '8px' },
  { token: '--s3', px: '12px', width: '12px' },
  { token: '--s4', px: '16px', width: '16px' },
  { token: '--s5', px: '24px', width: '24px' },
  { token: '--s6', px: '32px', width: '32px' },
  { token: '--s7', px: '48px', width: '48px' },
  { token: '--s8', px: '64px', width: '64px' },
] as const

export const Scale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 700 }}>
      {SPACING_SCALE.map((row) => (
        <TokenRow key={row.token} {...row} />
      ))}
      <DocsNote>8px base · 4px allowed for micro-detail · all sizes multiples of 8</DocsNote>
    </div>
  ),
}

const ELEVATION_LAYERS = [
  { name: 'Page', token: '--bg' },
  { name: 'Card', token: '--panel' },
  { name: 'Raised', token: '--panel-soft' },
  { name: 'Header', token: '--panel-muted' },
] as const

export const Elevation: Story = {
  render: () => (
    <div style={{ maxWidth: 700 }}>
      <DocsNote>// NO SHADOWS — depth = 1px var(--line) hairline + surface step</DocsNote>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 16 }}>
        {ELEVATION_LAYERS.map((layer) => (
          <div
            key={layer.token}
            style={{
              padding: '18px 22px',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius)',
              background: `var(${layer.token})`,
              marginLeft: layer.token === '--bg' ? 0 : -1,
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg1)' }}>{layer.name}</div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--fg2)',
                marginTop: 4,
              }}
            >
              {layer.token}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}
