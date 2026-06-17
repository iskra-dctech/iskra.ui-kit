/* ИСКРА.DCI — App shell: TopBar + SideNav */

function TopBar({ query, onQuery }) {
  return (
    <header
      style={{
        height: 48,
        borderBottom: '1px solid #30363D',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 14,
        background: '#0D1117',
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img
          src="../../assets/logo-spark.svg"
          width="22"
          height="22"
          style={{ imageRendering: 'pixelated' }}
          alt=""
        />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
          <span
            style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-.04em', color: '#F0F6FC' }}
          >
            ИСКРА<span style={{ color: '#00FFC2' }}>.</span>
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 9,
              letterSpacing: '.18em',
              color: '#6E7681',
            }}
          >
            DCI
          </span>
        </div>
      </div>
      <div style={{ flex: 1 }} />
      <div
        style={{
          width: 280,
          height: 30,
          background: '#161B22',
          border: '1px solid #30363D',
          borderRadius: 4,
          padding: '0 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Icon name="search" size={14} color="#6E7681" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Поиск устройств, IP, тегов…"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            width: '100%',
            fontFamily: "'Inter',sans-serif",
            fontSize: 12,
            color: '#F0F6FC',
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono'",
            fontSize: 10,
            color: '#6E7681',
            border: '1px solid #30363D',
            borderRadius: 2,
            padding: '1px 5px',
          }}
        >
          ⌘K
        </span>
      </div>
      <button
        style={{
          width: 30,
          height: 30,
          borderRadius: 4,
          background: 'transparent',
          border: '1px solid #30363D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#8B949E',
        }}
      >
        <Icon name="bell" size={15} />
      </button>
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 4,
          background: 'rgba(0,170,133,.14)',
          border: '1px solid #30363D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          color: '#00AA85',
          fontWeight: 600,
          fontFamily: "'Inter'",
        }}
      >
        AK
      </div>
    </header>
  );
}

function SideNav({ active, onNav }) {
  const items = [
    { id: 'dashboard', label: 'Обзор', icon: 'activity' },
    { id: 'panels', label: 'Панели', icon: 'grid' },
    { id: 'inventory', label: 'Устройства', icon: 'server' },
    { id: 'console', label: 'Консоль', icon: 'terminal' },
    { id: 'docs', label: 'Документация', icon: 'book-open' },
    { id: 'storage', label: 'Хранилище', icon: 'archive' },
  ];
  return (
    <nav
      style={{
        width: 200,
        borderRight: '1px solid #30363D',
        background: '#0D1117',
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 10px',
        gap: 2,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono'",
          fontSize: 10,
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: '#6E7681',
          padding: '6px 10px 8px',
        }}
      >
        User WebUI
      </div>
      {items.map((it) => {
        const on = active === it.id;
        return (
          <button
            key={it.id}
            onClick={() => onNav(it.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              height: 34,
              padding: '0 10px',
              borderRadius: 4,
              border: '1px solid ' + (on ? '#30363D' : 'transparent'),
              background: on ? '#161B22' : 'transparent',
              color: on ? '#F0F6FC' : '#8B949E',
              cursor: 'pointer',
              fontFamily: "'Inter'",
              fontSize: 13,
              fontWeight: on ? 500 : 400,
              textAlign: 'left',
              position: 'relative',
            }}
          >
            {on && (
              <span
                style={{
                  position: 'absolute',
                  left: -10,
                  top: 7,
                  bottom: 7,
                  width: 2,
                  background: '#00FFC2',
                  borderRadius: 1,
                }}
              />
            )}
            <Icon name={it.icon} size={16} color={on ? '#00FFC2' : '#6E7681'} />
            {it.label}
          </button>
        );
      })}
      <div style={{ flex: 1 }} />
      <div style={{ borderTop: '1px solid #30363D', paddingTop: 10, marginTop: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px' }}>
          <StatusDot status="ok" size={7} />
          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: '#8B949E' }}>
            API · reconciler · ok
          </span>
        </div>
      </div>
    </nav>
  );
}

Object.assign(window, { TopBar, SideNav });
