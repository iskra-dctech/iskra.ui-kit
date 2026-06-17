// components/Button/Button.jsx
// ИСКРА.DCI — Button · variants × sizes × states. Self-injects scoped CSS (.ik-btn).
// Honours the Hard-Shell Minimal system: 1px borders, 4px radius, no shadows,
// single mint accent. Icons are passed as ReactNode (e.g. <Icon name="…" />) and
// scale with the button's font-size.

const _BTN_CSS = `
.ik-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;
  font-family:var(--font-ui,'Inter',system-ui,sans-serif);font-weight:500;
  border:1px solid transparent;border-radius:var(--radius,4px);background:transparent;
  cursor:pointer;white-space:nowrap;text-decoration:none;box-sizing:border-box;
  position:relative;user-select:none;
  transition:background .12s,border-color .12s,color .12s,opacity .12s;}

/* sizes */
.ik-btn-s{height:28px;padding:0 12px;font-size:12px;}
.ik-btn-m{height:32px;padding:0 16px;font-size:13px;}
.ik-btn-l{height:36px;padding:0 18px;font-size:14px;}
.ik-btn-io.ik-btn-s{width:28px;padding:0;}
.ik-btn-io.ik-btn-m{width:32px;padding:0;}
.ik-btn-io.ik-btn-l{width:36px;padding:0;}
.ik-btn-fw{width:100%;}

/* variants */
.ik-btn-primary{background:var(--accent-safe,#00AA85);color:#0D1117;border-color:var(--accent-safe,#00AA85);font-weight:600;}
.ik-btn-primary:not(:disabled):hover{background:var(--accent-hover,#00CC9A);border-color:var(--accent-hover,#00CC9A);}
.ik-btn-primary:not(:disabled):active{background:var(--accent,#00FFC2);border-color:var(--accent,#00FFC2);}

.ik-btn-outline{border-color:var(--accent,#00FFC2);color:var(--accent-safe,#00AA85);}
.ik-btn-outline:not(:disabled):hover{background:var(--accent-soft,rgba(0,170,133,.14));}
.ik-btn-outline:not(:disabled):active{background:var(--accent-line,rgba(0,170,133,.32));}

.ik-btn-secondary{border-color:var(--line,#30363D);color:var(--fg1,#F0F6FC);}
.ik-btn-secondary:not(:disabled):hover{border-color:var(--accent,#00FFC2);color:var(--accent-safe,#00AA85);}

.ik-btn-ghost{color:var(--fg2,#8B949E);}
.ik-btn-ghost:not(:disabled):hover{background:var(--panel-muted,#202A35);color:var(--fg1,#F0F6FC);}

.ik-btn-destructive{border-color:var(--status-err,#F85149);color:var(--status-err,#F85149);}
.ik-btn-destructive:not(:disabled):hover{background:rgba(248,81,73,.12);}

/* focus / disabled */
.ik-btn:focus-visible{outline:none;box-shadow:0 0 0 1px var(--bg,#0D1117),0 0 0 2px var(--accent,#00FFC2);}
.ik-btn:disabled{cursor:not-allowed;opacity:.45;}

/* content / loading */
.ik-btn-content{display:inline-flex;align-items:center;justify-content:center;gap:inherit;}
.ik-btn-loading .ik-btn-content{opacity:0;}
.ik-btn-spinner{position:absolute;width:1em;height:1em;border:2px solid currentColor;
  border-top-color:transparent;border-radius:50%;animation:ik-btn-spin .6s linear infinite;}
@keyframes ik-btn-spin{to{transform:rotate(360deg);}}
`;

let _btnCssReady = false;
function _injectBtnCSS() {
  if (_btnCssReady || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.dataset.ikBtn = '1';
  el.textContent = _BTN_CSS;
  document.head.appendChild(el);
  _btnCssReady = true;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Button — public export
   ───────────────────────────────────────────────────────────────────────────── */
export function Button({
  variant = 'primary',
  size = 'm',
  iconBefore,
  iconAfter,
  iconOnly = false,
  loading = false,
  disabled = false,
  fullWidth = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  _injectBtnCSS();

  const cls = [
    'ik-btn',
    'ik-btn-' + variant,
    'ik-btn-' + size,
    iconOnly && 'ik-btn-io',
    fullWidth && 'ik-btn-fw',
    loading && 'ik-btn-loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={cls} disabled={disabled || loading} {...rest}>
      {loading && <span className="ik-btn-spinner" aria-hidden="true" />}
      <span className="ik-btn-content">
        {iconBefore}
        {!iconOnly && children != null && <span>{children}</span>}
        {iconOnly && children}
        {iconAfter}
      </span>
    </button>
  );
}
