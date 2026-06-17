// components/Switch/Switch.jsx
// ИСКРА.DCI — Switch (toggle) · on/off with sliding knob, optional label +
// description, sizes s·m. Built on a real <input type="checkbox" role=switch>.
// Self-injects .ik-sw CSS. Filled track uses --accent-safe per token rules.

const _SW_CSS = `
.ik-sw{display:inline-flex;align-items:flex-start;gap:10px;cursor:pointer;
  font-family:var(--font-ui,'Inter',system-ui,sans-serif);color:var(--fg1,#F0F6FC);
  user-select:none;position:relative;}
.ik-sw.is-disabled{cursor:not-allowed;opacity:.5;}
.ik-sw-input{position:absolute;opacity:0;width:1px;height:1px;margin:0;}
.ik-sw-track{position:relative;flex-shrink:0;background:var(--line,#30363D);
  transition:background .15s;margin-top:1px;}
.ik-sw-knob{position:absolute;border-radius:50%;background:#F0F6FC;
  box-shadow:0 0 0 1px rgba(0,0,0,.06);transition:transform .15s cubic-bezier(.2,.6,.2,1);}

.ik-sw-m .ik-sw-track{width:34px;height:19px;border-radius:10px;}
.ik-sw-m .ik-sw-knob{width:15px;height:15px;top:2px;left:2px;}
.ik-sw-m .ik-sw-input:checked + .ik-sw-track .ik-sw-knob{transform:translateX(15px);}
.ik-sw-s .ik-sw-track{width:30px;height:17px;border-radius:9px;}
.ik-sw-s .ik-sw-knob{width:13px;height:13px;top:2px;left:2px;}
.ik-sw-s .ik-sw-input:checked + .ik-sw-track .ik-sw-knob{transform:translateX(13px);}

.ik-sw-input:checked + .ik-sw-track{background:var(--accent-safe,#00AA85);}
.ik-sw-input:focus-visible + .ik-sw-track{box-shadow:0 0 0 1px var(--bg,#0D1117),0 0 0 2px var(--accent,#00FFC2);}

.ik-sw-textwrap{display:flex;flex-direction:column;}
.ik-sw-text{font-size:13px;line-height:1.45;}
.ik-sw-s .ik-sw-text{font-size:12px;}
.ik-sw-desc{font-size:11px;line-height:1.4;color:var(--fg2,#8B949E);margin-top:2px;}
`;

let _swCssReady = false;
function _injectSwCSS() {
  if (_swCssReady || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.dataset.ikSw = '1';
  el.textContent = _SW_CSS;
  document.head.appendChild(el);
  _swCssReady = true;
}

let _swId = 0;

/* ─────────────────────────────────────────────────────────────────────────────
   Switch — public export
   ───────────────────────────────────────────────────────────────────────────── */
export function Switch({
  checked,
  defaultChecked,
  disabled = false,
  size = 'm',
  label,
  description,
  onChange,
  id,
  className = '',
  ...rest
}) {
  _injectSwCSS();
  const reactId = React.useMemo(() => id || `ik-sw-${++_swId}`, [id]);
  const cls = ['ik-sw', 'ik-sw-' + size, disabled && 'is-disabled', className]
    .filter(Boolean).join(' ');

  return (
    <label className={cls} htmlFor={reactId}>
      <input
        id={reactId}
        type="checkbox"
        role="switch"
        className="ik-sw-input"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />
      <span className="ik-sw-track" aria-hidden="true"><span className="ik-sw-knob" /></span>
      {(label || description) && (
        <span className="ik-sw-textwrap">
          {label && <span className="ik-sw-text">{label}</span>}
          {description && <span className="ik-sw-desc">{description}</span>}
        </span>
      )}
    </label>
  );
}
