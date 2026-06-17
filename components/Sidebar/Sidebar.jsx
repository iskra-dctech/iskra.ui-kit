// components/Sidebar/Sidebar.jsx
// ИСКРА.DCI — Sidebar Navigation · shared between operator and admin frontends

/* ─────────────────────────────────────────────────────────────────────────────
   Scoped CSS — injected once into <head>, all selectors prefixed .iskra-sb
   ───────────────────────────────────────────────────────────────────────────── */

const _CSS = `
.iskra-sb{display:flex;flex-direction:column;width:220px;height:100%;
  background:var(--panel,#161B22);border-right:1px solid var(--line,#30363D);
  font-family:var(--font-ui,'Inter',system-ui,sans-serif);font-size:14px;
  overflow:hidden;flex-shrink:0;position:relative;
  transition:width .18s cubic-bezier(.2,.6,.2,1);}
.iskra-sb.isb-c{width:52px;}
.iskra-sb.isb-c.isb-tip-rdy{overflow:visible;}

/* ── Logo bar ── */
.isb-logo{height:52px;min-height:52px;display:flex;align-items:center;gap:10px;
  padding:0 14px;border-bottom:1px solid var(--line,#30363D);overflow:hidden;}
.isb-spark{flex-shrink:0;width:20px;height:20px;display:flex;align-items:center;
  justify-content:center;color:var(--accent,#00FFC2);}
.isb-wmark{flex:1;font-family:var(--font-mono,'JetBrains Mono',monospace);
  font-size:12px;font-weight:700;letter-spacing:.05em;color:var(--fg1,#F0F6FC);
  white-space:nowrap;overflow:hidden;transition:opacity .14s;}
.iskra-sb.isb-c .isb-wmark{opacity:0;}
.isb-collapser{flex-shrink:0;width:20px;height:20px;border:1px solid var(--line,#30363D);
  border-radius:3px;background:transparent;color:var(--fg3,#6E7681);cursor:pointer;
  display:flex;align-items:center;justify-content:center;padding:0;
  transition:color .12s,border-color .12s;}
.isb-collapser:hover{color:var(--fg1,#F0F6FC);border-color:var(--accent,#00FFC2);}
.isb-collapser svg{width:10px;height:10px;
  transition:transform .18s cubic-bezier(.2,.6,.2,1);}
.iskra-sb.isb-c .isb-collapser svg{transform:rotate(180deg);}

/* ── Scrollable nav ── */
.isb-scroll{flex:1;overflow-y:auto;overflow-x:hidden;padding:6px 0;
  scrollbar-width:thin;scrollbar-color:var(--line,#30363D) transparent;}
.isb-grp+.isb-grp{margin-top:2px;}
.iskra-sb.isb-c .isb-grp+.isb-grp{border-top:1px solid var(--line-soft,rgba(48,54,61,.45));
  margin-top:4px;padding-top:4px;}

/* ── Section label ── */
.isb-sec{font-family:var(--font-mono,'JetBrains Mono',monospace);font-size:10px;
  letter-spacing:.1em;text-transform:uppercase;color:var(--fg3,#6E7681);
  padding:14px 14px 4px;white-space:nowrap;overflow:hidden;
  max-height:36px;opacity:1;
  transition:max-height .18s cubic-bezier(.2,.6,.2,1),opacity .1s,padding .18s;}
.iskra-sb.isb-c .isb-sec{max-height:0;opacity:0;padding-top:0;padding-bottom:0;pointer-events:none;}

/* ── Nav item ── */
.isb-item{position:relative;display:flex;align-items:center;gap:10px;height:36px;
  padding:0 14px;width:100%;background:transparent;border:none;
  border-left:2px solid transparent;color:var(--fg2,#8B949E);
  font-family:var(--font-ui,'Inter',sans-serif);font-size:13.5px;font-weight:400;
  text-align:left;white-space:nowrap;cursor:pointer;box-sizing:border-box;
  transition:color .12s,background .12s,border-color .12s;}
.isb-item:hover{background:var(--panel-muted,#202A35);color:var(--fg1,#F0F6FC);}
.isb-item.isb-on{background:var(--accent-soft,rgba(0,170,133,.14));
  color:var(--accent-safe,#00AA85);border-left-color:var(--accent,#00FFC2);font-weight:500;}
.isb-item.isb-on:hover{background:var(--accent-soft,rgba(0,170,133,.14));
  color:var(--accent-safe,#00AA85);}
.iskra-sb.isb-c .isb-item{padding:0;justify-content:center;gap:0;}
.isb-item:focus-visible{outline:none;box-shadow:inset 0 0 0 1px var(--accent,#00FFC2);}
.isb-collapser:focus-visible{outline:none;box-shadow:0 0 0 1px var(--accent,#00FFC2);}

/* ── Icon ── */
.isb-ico{flex-shrink:0;width:16px;height:16px;display:flex;
  align-items:center;justify-content:center;}

/* ── Label ── */
.isb-lbl{flex:1;overflow:hidden;text-overflow:ellipsis;max-width:160px;opacity:1;
  transition:max-width .18s cubic-bezier(.2,.6,.2,1),opacity .1s;}
.iskra-sb.isb-c .isb-lbl{max-width:0;opacity:0;}

/* ── Badge ── */
.isb-bdg{flex-shrink:0;height:17px;min-width:17px;padding:0 4px;border-radius:9px;
  background:var(--status-warn,#F97316);color:#fff;
  font-family:var(--font-mono,'JetBrains Mono',monospace);
  font-size:10px;font-weight:700;display:flex;align-items:center;
  justify-content:center;line-height:1;max-width:40px;overflow:hidden;opacity:1;
  transition:max-width .18s,opacity .1s,padding .18s,min-width .18s;}
.iskra-sb.isb-c .isb-bdg{max-width:0;min-width:0;padding:0;opacity:0;}

/* ── Footer ── */
.isb-foot{flex-shrink:0;padding:6px 0;border-top:1px solid var(--line,#30363D);}

/* ── Floating tooltip (shown in collapsed mode after animation settles) ── */
.isb-floatip{position:absolute;left:calc(100% + 10px);transform:translateY(-50%);
  background:var(--panel-soft,#1D2530);border:1px solid var(--line,#30363D);
  color:var(--fg1,#F0F6FC);font-size:12px;font-family:var(--font-ui,'Inter',sans-serif);
  font-weight:400;padding:5px 10px;border-radius:4px;white-space:nowrap;
  pointer-events:none;z-index:999;}
`;

/* ── CSS injection (idempotent) ── */
let _cssReady = false;
function _injectCSS() {
  if (_cssReady || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.dataset.iskraSb = '1';
  el.textContent = _CSS;
  document.head.appendChild(el);
  _cssReady = true;
}

/* ─────────────────────────────────────────────────────────────────────────────
   SVG Icons — 16×16, 1.5px stroke, round caps
   ───────────────────────────────────────────────────────────────────────────── */
function _Icon({ id }) {
  const p = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    viewBox: '0 0 16 16',
    width: '16',
    height: '16',
    'aria-hidden': 'true',
  };
  switch (id) {
    case 'overview':
      return (
        <svg {...p}>
          <rect x="2" y="2" width="5" height="5" rx="1" />
          <rect x="9" y="2" width="5" height="5" rx="1" />
          <rect x="2" y="9" width="5" height="5" rx="1" />
          <rect x="9" y="9" width="5" height="5" rx="1" />
        </svg>
      );
    case 'devices':
      return (
        <svg {...p}>
          <rect x="1.5" y="3" width="13" height="4" rx="1" />
          <rect x="1.5" y="9" width="13" height="4" rx="1" />
          <circle cx="12.5" cy="5" r=".85" fill="currentColor" stroke="none" />
          <circle cx="12.5" cy="11" r=".85" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'topology':
      return (
        <svg {...p}>
          <circle cx="8" cy="3" r="1.5" />
          <circle cx="2.5" cy="12.5" r="1.5" />
          <circle cx="13.5" cy="12.5" r="1.5" />
          <line x1="8" y1="4.5" x2="3.3" y2="11.2" />
          <line x1="8" y1="4.5" x2="12.7" y2="11.2" />
          <line x1="4" y1="12.5" x2="12" y2="12.5" />
        </svg>
      );
    case 'alerts':
      return (
        <svg {...p}>
          <path d="M8 2a4 4 0 0 1 4 4c0 2.5 1 3.5 1 3.5H3S4 9.5 4 6a4 4 0 0 1 4-4z" />
          <path d="M6.5 9.5a1.5 1.5 0 0 0 3 0" />
        </svg>
      );
    case 'apikeys':
      return (
        <svg {...p}>
          <circle cx="5.5" cy="8" r="3" />
          <path d="M8.5 8h5.5m-2.5-1.5v3" />
        </svg>
      );
    case 'log':
      return (
        <svg {...p}>
          <line x1="3" y1="4.5" x2="13" y2="4.5" />
          <line x1="3" y1="8" x2="13" y2="8" />
          <line x1="3" y1="11.5" x2="9" y2="11.5" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...p}>
          <line x1="3" y1="4" x2="13" y2="4" />
          <line x1="3" y1="8" x2="13" y2="8" />
          <line x1="3" y1="12" x2="13" y2="12" />
          <circle cx="6" cy="4" r="1.5" fill="currentColor" />
          <circle cx="10" cy="8" r="1.5" fill="currentColor" />
          <circle cx="7" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'users':
      return (
        <svg {...p}>
          <circle cx="6" cy="6" r="2.5" />
          <path d="M1 14c0-3 2.5-4.5 5-4.5s5 1.5 5 4.5" />
          <path d="M11 4.5a2 2 0 0 1 0 3.5" />
          <path d="M13.5 14c0-2-1.2-3.5-2.5-4" />
        </svg>
      );
    case 'audit':
      return (
        <svg {...p}>
          <path d="M8 1.5 13.5 3.5V8c0 3.5-2.5 5.5-5.5 6.5-3-1-5.5-3-5.5-6.5V3.5Z" />
          <polyline points="5.5,8 7,9.5 10.5,6" />
        </svg>
      );
    case 'system':
      return (
        <svg {...p}>
          <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" />
          <polyline points="4.5,6.5 7,9 4.5,11.5" />
          <line x1="8.5" y1="11.5" x2="11.5" y2="11.5" />
        </svg>
      );
    case 'logout':
      return (
        <svg {...p}>
          <path d="M6 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3" />
          <polyline points="10,5.5 13.5,8 10,10.5" />
          <line x1="6" y1="8" x2="13.5" y2="8" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <circle cx="8" cy="8" r="5" />
        </svg>
      );
  }
}

function _Spark() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" width="20" height="20">
      <path d="M10 1 12.6 7.8 19.5 9.8 12.6 11.9 10 18.7 7.4 11.9.5 9.8 7.4 7.8Z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Nav configuration
   ───────────────────────────────────────────────────────────────────────────── */
const _OP = [
  {
    id: 'monitoring',
    lbl: 'Мониторинг',
    items: [
      { id: 'overview', lbl: 'Обзор', ico: 'overview' },
      { id: 'devices', lbl: 'Устройства', ico: 'devices' },
      { id: 'topology', lbl: 'Топология', ico: 'topology' },
    ],
  },
  {
    id: 'management',
    lbl: 'Управление',
    items: [
      { id: 'alerts', lbl: 'Оповещения', ico: 'alerts' },
      { id: 'apikeys', lbl: 'API-ключи', ico: 'apikeys' },
      { id: 'log', lbl: 'Журнал', ico: 'log' },
    ],
  },
];
const _AD = [
  ..._OP,
  {
    id: 'admin',
    lbl: 'Администрирование',
    items: [
      { id: 'users', lbl: 'Пользователи', ico: 'users' },
      { id: 'audit', lbl: 'Аудит', ico: 'audit' },
      { id: 'system', lbl: 'Система', ico: 'system' },
    ],
  },
];
const _FT = [
  { id: 'settings', lbl: 'Настройки', ico: 'settings' },
  { id: 'logout', lbl: 'Выход', ico: 'logout' },
];

/* ─────────────────────────────────────────────────────────────────────────────
   NavItem
   ───────────────────────────────────────────────────────────────────────────── */
function _Item({ id, lbl, ico, active, badge, onHover, onLeave, onClick }) {
  return (
    <button
      className={'isb-item' + (active ? ' isb-on' : '')}
      title={lbl}
      onMouseEnter={onHover ? (e) => onHover(e, lbl) : undefined}
      onMouseLeave={onLeave}
      onClick={onClick}
      type="button"
      aria-current={active ? 'page' : undefined}
    >
      <span className="isb-ico">
        <_Icon id={ico} />
      </span>
      <span className="isb-lbl">{lbl}</span>
      {badge > 0 && (
        <span className="isb-bdg" aria-label={`${lbl}: ${badge} уведомлений`}>
          {badge}
        </span>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Sidebar — public export
   ───────────────────────────────────────────────────────────────────────────── */
export function Sidebar({
  collapsed = false,
  onToggle,
  activeItem = 'overview',
  onNavigate,
  variant = 'operator',
  theme = '',
  badges = {},
  className = '',
}) {
  _injectCSS();

  const [tip, setTip] = React.useState(null); // { lbl, top }
  const [tipRdy, setTipRdy] = React.useState(false); // true after collapse anim settles
  const sbRef = React.useRef(null);

  /* Enable tooltips only after the collapse transition finishes */
  React.useEffect(() => {
    setTipRdy(false);
    setTip(null);
    if (!collapsed) return;
    const t = setTimeout(() => setTipRdy(true), 210);
    return () => clearTimeout(t);
  }, [collapsed]);

  const showTip = React.useCallback(
    (e, lbl) => {
      if (!tipRdy || !sbRef.current) return;
      const ir = e.currentTarget.getBoundingClientRect();
      const sr = sbRef.current.getBoundingClientRect();
      setTip({ lbl, top: ir.top - sr.top + ir.height / 2 });
    },
    [tipRdy],
  );

  const hideTip = React.useCallback(() => setTip(null), []);

  const sections = variant === 'admin' ? _AD : _OP;

  const rootCls = [
    'iskra-sb',
    collapsed && 'isb-c',
    collapsed && tipRdy && 'isb-tip-rdy',
    theme,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hoverHandlers = collapsed ? { onHover: showTip, onLeave: hideTip } : {};

  return (
    <aside className={rootCls} ref={sbRef} role="navigation" aria-label="Навигация платформы">
      {/* ── Logo bar ── */}
      <div className="isb-logo">
        <span className="isb-spark">
          <_Spark />
        </span>
        <span className="isb-wmark">ИСКРА.DCI</span>
        <button
          className="isb-collapser"
          type="button"
          onClick={onToggle}
          aria-expanded={!collapsed}
          aria-label={collapsed ? 'Развернуть боковую панель' : 'Свернуть боковую панель'}
        >
          <svg
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="7,2 4,5 7,8" />
          </svg>
        </button>
      </div>

      {/* ── Main navigation ── */}
      <div className="isb-scroll">
        {sections.map(({ id, lbl, items }) => (
          <div key={id} className="isb-grp">
            <div className="isb-sec" aria-hidden="true">
              {lbl}
            </div>
            {items.map((item) => (
              <_Item
                key={item.id}
                id={item.id}
                lbl={item.lbl}
                ico={item.ico}
                active={activeItem === item.id}
                badge={badges[item.id]}
                onClick={() => onNavigate?.(item.id)}
                {...hoverHandlers}
              />
            ))}
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div className="isb-foot">
        {_FT.map((item) => (
          <_Item
            key={item.id}
            id={item.id}
            lbl={item.lbl}
            ico={item.ico}
            active={activeItem === item.id}
            badge={badges[item.id]}
            onClick={() => onNavigate?.(item.id)}
            {...hoverHandlers}
          />
        ))}
      </div>

      {/* ── Tooltip overlay (positioned inside sidebar, overflows via isb-tip-rdy) ── */}
      {tip && (
        <div className="isb-floatip" style={{ top: tip.top }}>
          {tip.lbl}
        </div>
      )}
    </aside>
  );
}
