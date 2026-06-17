// components/Checkbox/Checkbox.jsx
// ИСКРА.DCI — Checkbox · supports checked / indeterminate / disabled, optional
// label + description, sizes s·m. Built on a real <input type="checkbox"> for
// full accessibility and keyboard support. Self-injects .ik-cb CSS.

const _CB_CSS = `
.ik-cb{display:inline-flex;align-items:flex-start;gap:9px;cursor:pointer;
  font-family:var(--font-ui,'Inter',system-ui,sans-serif);color:var(--fg1,#F0F6FC);
  user-select:none;position:relative;}
.ik-cb.is-disabled{cursor:not-allowed;opacity:.5;}
.ik-cb-input{position:absolute;opacity:0;width:1px;height:1px;margin:0;}
.ik-cb-box{flex-shrink:0;display:flex;align-items:center;justify-content:center;box-sizing:border-box;
  border:1px solid var(--line,#30363D);border-radius:3px;background:var(--bg,#0D1117);
  color:#0D1117;transition:background .12s,border-color .12s,box-shadow .12s;margin-top:1px;}
.ik-cb-s .ik-cb-box{width:14px;height:14px;}
.ik-cb-m .ik-cb-box{width:16px;height:16px;}
.ik-cb:not(.is-disabled):hover .ik-cb-box{border-color:var(--accent,#00FFC2);}
.ik-cb-check,.ik-cb-dash{display:none;}
.ik-cb-input:checked + .ik-cb-box,
.ik-cb-input:indeterminate + .ik-cb-box{background:var(--accent-safe,#00AA85);border-color:var(--accent-safe,#00AA85);}
.ik-cb-input:checked + .ik-cb-box .ik-cb-check{display:block;}
.ik-cb-input:indeterminate + .ik-cb-box .ik-cb-check{display:none;}
.ik-cb-input:indeterminate + .ik-cb-box .ik-cb-dash{display:block;}
.ik-cb-input:focus-visible + .ik-cb-box{box-shadow:0 0 0 1px var(--bg,#0D1117),0 0 0 2px var(--accent,#00FFC2);}
.ik-cb-textwrap{display:flex;flex-direction:column;}
.ik-cb-text{font-size:13px;line-height:1.45;}
.ik-cb-s .ik-cb-text{font-size:12px;}
.ik-cb-desc{font-size:11px;line-height:1.4;color:var(--fg2,#8B949E);margin-top:2px;}
`;

let _cbCssReady = false;
function _injectCbCSS() {
  if (_cbCssReady || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.dataset.ikCb = '1';
  el.textContent = _CB_CSS;
  document.head.appendChild(el);
  _cbCssReady = true;
}

let _cbId = 0;

/* ─────────────────────────────────────────────────────────────────────────────
   Checkbox — public export
   ───────────────────────────────────────────────────────────────────────────── */
export function Checkbox({
  checked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  size = 'm',
  label,
  description,
  onChange,
  id,
  className = '',
  ...rest
}) {
  _injectCbCSS();

  const ref = React.useRef(null);
  const reactId = React.useMemo(() => id || `ik-cb-${++_cbId}`, [id]);

  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate, checked]);

  const cls = ['ik-cb', 'ik-cb-' + size, disabled && 'is-disabled', className]
    .filter(Boolean).join(' ');

  return (
    <label className={cls} htmlFor={reactId}>
      <input
        ref={ref}
        id={reactId}
        type="checkbox"
        className="ik-cb-input"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />
      <span className="ik-cb-box" aria-hidden="true">
        <svg className="ik-cb-check" width="11" height="11" viewBox="0 0 16 16" fill="none"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3.5,8.5 6.5,11.5 12.5,4.5" />
        </svg>
        <svg className="ik-cb-dash" width="11" height="11" viewBox="0 0 16 16" fill="none"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <line x1="3.5" y1="8" x2="12.5" y2="8" />
        </svg>
      </span>
      {(label || description) && (
        <span className="ik-cb-textwrap">
          {label && <span className="ik-cb-text">{label}</span>}
          {description && <span className="ik-cb-desc">{description}</span>}
        </span>
      )}
    </label>
  );
}
