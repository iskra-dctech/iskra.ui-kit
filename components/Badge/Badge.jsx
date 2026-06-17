// components/Badge/Badge.jsx
// ИСКРА.DCI — Badge (status signal) + Tag (mono technical label).
// Badge tints its border/background from currentColor via color-mix, so a single
// rule set adapts to both the dark and cold themes. Self-injects .ik-bdg CSS.

const _BDG_CSS = `
.ik-bdg{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-ui,'Inter',system-ui,sans-serif);
  font-weight:500;line-height:1;white-space:nowrap;border:1px solid;border-radius:3px;
  border-color:color-mix(in srgb, currentColor 38%, transparent);
  background:color-mix(in srgb, currentColor 12%, transparent);}
.ik-bdg-m{font-size:12px;padding:5px 10px;}
.ik-bdg-s{font-size:11px;padding:3px 7px;gap:5px;}
.ik-bdg-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;background:currentColor;}
.ik-bdg-s .ik-bdg-dot{width:5px;height:5px;}

.ik-bdg-success{color:var(--status-ok,#00FFC2);}
.ik-bdg-warning{color:var(--status-warn,#F97316);}
.ik-bdg-error{color:var(--status-err,#F85149);}
.ik-bdg-info{color:var(--status-info,#58A6FF);}
.ik-bdg-accent{color:var(--accent-safe,#00AA85);}
.ik-bdg-neutral{color:var(--fg2,#8B949E);border-color:var(--line,#30363D);background:var(--panel,#161B22);}

.ik-tag{display:inline-flex;align-items:center;gap:5px;font-family:var(--font-mono,'JetBrains Mono',monospace);
  font-size:10px;letter-spacing:.04em;line-height:1.4;color:var(--fg2,#8B949E);
  background:var(--bg,#0D1117);border:1px solid var(--line,#30363D);border-radius:2px;padding:2px 6px;}
.ik-tag-accent{color:var(--accent-safe,#00AA85);background:var(--accent-soft,rgba(0,170,133,.14));border-color:var(--accent-line,rgba(0,170,133,.32));}
.ik-tag-x{display:inline-flex;align-items:center;justify-content:center;border:none;background:transparent;
  color:currentColor;opacity:.65;cursor:pointer;padding:0;margin:-1px -2px -1px 0;border-radius:2px;}
.ik-tag-x:hover{opacity:1;}
.ik-tag-x:focus-visible{outline:none;box-shadow:0 0 0 1px var(--accent,#00FFC2);opacity:1;}
`;

let _bdgCssReady = false;
function _injectBdgCSS() {
  if (_bdgCssReady || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.dataset.ikBdg = '1';
  el.textContent = _BDG_CSS;
  document.head.appendChild(el);
  _bdgCssReady = true;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Badge — status signal pill
   ───────────────────────────────────────────────────────────────────────────── */
export function Badge({
  variant = 'neutral',
  size = 'm',
  dot = false,
  icon,
  children,
  className = '',
  ...rest
}) {
  _injectBdgCSS();
  const cls = ['ik-bdg', 'ik-bdg-' + size, 'ik-bdg-' + variant, className]
    .filter(Boolean)
    .join(' ');
  return (
    <span className={cls} {...rest}>
      {dot && <span className="ik-bdg-dot" aria-hidden="true" />}
      {icon}
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Tag — mono technical label, optionally removable (chip)
   ───────────────────────────────────────────────────────────────────────────── */
export function Tag({
  accent = false,
  onRemove,
  removeLabel = 'Удалить',
  children,
  className = '',
  ...rest
}) {
  _injectBdgCSS();
  const cls = ['ik-tag', accent && 'ik-tag-accent', className].filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      {children}
      {onRemove && (
        <button type="button" className="ik-tag-x" onClick={onRemove} aria-label={removeLabel}>
          <svg
            width="9"
            height="9"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="4" y1="4" x2="12" y2="12" />
            <line x1="12" y1="4" x2="4" y2="12" />
          </svg>
        </button>
      )}
    </span>
  );
}
