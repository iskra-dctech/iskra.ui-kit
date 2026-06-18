import type { CSSProperties, ReactNode } from 'react'

export interface SwatchProps {
  name: string
  hint: string
  color: string
}

export const Swatch = ({ name, hint, color }: SwatchProps) => (
  <div
    style={{
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
    }}
  >
    <div style={{ height: 56, background: color }} />
    <div style={{ padding: '7px 10px', background: 'var(--panel)', fontFamily: 'var(--font-mono)' }}>
      <div style={{ fontSize: 11, color: 'var(--fg1)', fontWeight: 600, marginBottom: 2 }}>{name}</div>
      <div style={{ fontSize: 10, color: 'var(--fg2)' }}>{hint}</div>
    </div>
  </div>
)

export interface TokenSwatchProps {
  name: string
  hint: string
  token: string
}

export const TokenSwatch = ({ name, hint, token }: TokenSwatchProps) => (
  <Swatch name={name} hint={hint} color={`var(${token})`} />
)

export interface TokenRowProps {
  token: string
  px: string
  width: string
}

export const TokenRow = ({ token, px, width }: TokenRowProps) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
    <span style={{ fontSize: 11, color: 'var(--fg2)', width: 60, fontFamily: 'var(--font-mono)' }}>
      {token}
    </span>
    <span style={{ fontSize: 11, color: 'var(--fg1)', width: 46, fontFamily: 'var(--font-mono)' }}>
      {px}
    </span>
    <div
      style={{
        height: 16,
        width,
        background: 'var(--accent-safe)',
        borderRadius: 'var(--radius-sm)',
      }}
    />
  </div>
)

export interface TypeRowProps {
  spec: string
  children: ReactNode
  style?: CSSProperties
}

export const TypeRow = ({ spec, children, style }: TypeRowProps) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: 16,
      padding: '10px 0',
      borderBottom: '1px solid var(--line)',
    }}
  >
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--fg2)',
        width: 120,
        flexShrink: 0,
        letterSpacing: '.04em',
      }}
    >
      {spec}
    </span>
    <span style={style}>{children}</span>
  </div>
)

export const DocsNote = ({ children }: { children: ReactNode }) => (
  <p style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>
    {children}
  </p>
)
