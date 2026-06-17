/* ИСКРА.DCI — primitives & icons. Exports to window. */

// Feather icon wrapper (1.5px outline, 16/20px per guide)
function Icon({ name, size = 16, color, style, strokeWidth = 1.5 }) {
  const svg =
    window.feather && window.feather.icons[name]
      ? window.feather.icons[name].toSvg({ width: size, height: size, 'stroke-width': strokeWidth })
      : '';
  return (
    <span
      aria-hidden="true"
      style={{ display: 'inline-flex', color, ...style }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

function StatusDot({ status = 'ok', size = 8, pulse = false }) {
  const map = { ok: '#00FFC2', warn: '#F97316', err: '#F85149', off: '#6E7681', info: '#58A6FF' };
  return (
    <span
      className={pulse ? 'iskra-pulse' : ''}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: map[status],
        flexShrink: 0,
        display: 'inline-block',
      }}
    />
  );
}

function Badge({ status = 'ok', children }) {
  const map = {
    ok: { c: '#00FFC2', b: 'rgba(0,255,194,.4)', bg: 'rgba(0,255,194,.08)' },
    warn: { c: '#F97316', b: 'rgba(249,115,22,.4)', bg: 'rgba(249,115,22,.08)' },
    err: { c: '#F85149', b: 'rgba(248,81,73,.4)', bg: 'rgba(248,81,73,.08)' },
    off: { c: '#8B949E', b: '#30363D', bg: '#161B22' },
    info: { c: '#58A6FF', b: 'rgba(88,166,255,.4)', bg: 'rgba(88,166,255,.08)' },
  }[status];
  const dot = { ok: '#00FFC2', warn: '#F97316', err: '#F85149', off: '#6E7681', info: '#58A6FF' }[
    status
  ];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12,
        fontWeight: 500,
        padding: '4px 9px',
        borderRadius: 3,
        border: `1px solid ${map.b}`,
        color: map.c,
        background: map.bg,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: dot }} />
      {children}
    </span>
  );
}

function Button({ variant = 'secondary', icon, children, onClick, disabled, style }) {
  const [hover, setHover] = React.useState(false);
  const base = {
    height: 32,
    padding: '0 16px',
    borderRadius: 4,
    fontFamily: "'Inter',sans-serif",
    fontSize: 13,
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    border: '1px solid',
    background: 'transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background .15s,color .15s,border-color .15s',
    opacity: disabled ? 0.4 : 1,
    whiteSpace: 'nowrap',
  };
  const variants = {
    primary: {
      borderColor: '#00FFC2',
      color: '#00FFC2',
      background: hover && !disabled ? 'rgba(0,255,194,.12)' : 'transparent',
    },
    secondary: {
      borderColor: hover && !disabled ? '#00FFC2' : '#30363D',
      color: hover && !disabled ? '#00FFC2' : '#F0F6FC',
    },
    destructive: {
      borderColor: '#F85149',
      color: '#F85149',
      background: hover && !disabled ? 'rgba(248,81,73,.1)' : 'transparent',
    },
    ghost: { borderColor: 'transparent', color: hover && !disabled ? '#00FFC2' : '#8B949E' },
  };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {icon && <Icon name={icon} size={15} />}
      {children}
    </button>
  );
}

function Tag({ children }) {
  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: 9,
        color: '#8B949E',
        background: '#0D1117',
        border: '1px solid #30363D',
        borderRadius: 2,
        padding: '1px 5px',
        letterSpacing: '.04em',
      }}
    >
      {children}
    </span>
  );
}

function Sparkline({ data, alert = false, height = 28 }) {
  return (
    <div style={{ height, display: 'flex', alignItems: 'flex-end', gap: 2 }}>
      {data.map((v, i) => {
        const isAlert = alert && v > 78;
        return (
          <span
            key={i}
            style={{
              flex: 1,
              borderRadius: 1,
              height: `${v}%`,
              background: isAlert ? '#F97316' : '#00AA85',
              opacity: isAlert ? 0.85 : v > 65 ? 0.7 : v > 48 ? 0.5 : 0.3,
            }}
          />
        );
      })}
    </div>
  );
}

function MonoField({ value, placeholder, focus = false, mono = true, onChange, style }) {
  const [f, setF] = React.useState(focus);
  return (
    <div
      style={{
        height: 32,
        background: '#0D1117',
        border: `1px solid ${f ? '#00FFC2' : '#30363D'}`,
        boxShadow: f ? '0 0 0 1px #00FFC2' : 'none',
        borderRadius: 4,
        padding: '0 10px',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        ...style,
      }}
    >
      <input
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => setF(true)}
        onBlur={() => setF(focus)}
        style={{
          background: 'transparent',
          border: 'none',
          outline: 'none',
          width: '100%',
          fontFamily: mono ? "'JetBrains Mono',monospace" : "'Inter',sans-serif",
          fontSize: mono ? 12 : 13,
          color: '#F0F6FC',
        }}
      />
    </div>
  );
}

Object.assign(window, { Icon, StatusDot, Badge, Button, Tag, Sparkline, MonoField });
