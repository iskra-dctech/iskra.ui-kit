// components/TextField/TextField.jsx
// ИСКРА.DCI — TextField · single-line text input with label, hint, error,
// leading icon and optional clear button. Sizes s·m·l. Self-injects .ik-tf CSS.

const _TF_CSS = `
.ik-tf-wrap{display:flex;flex-direction:column;gap:6px;width:100%;
  font-family:var(--font-ui,'Inter',system-ui,sans-serif);}
.ik-tf-label{font-size:12px;font-weight:500;color:var(--fg2,#8B949E);}
.ik-tf-label .ik-tf-req{color:var(--status-err,#F85149);margin-left:2px;}

.ik-tf-field{display:flex;align-items:center;gap:8px;box-sizing:border-box;
  background:var(--bg,#0D1117);border:1px solid var(--line,#30363D);
  border-radius:var(--radius,4px);padding:0 10px;color:var(--fg1,#F0F6FC);
  transition:border-color .12s,box-shadow .12s;}
.ik-tf-s{height:28px;font-size:12px;}
.ik-tf-m{height:32px;font-size:13px;}
.ik-tf-l{height:36px;font-size:14px;}
.ik-tf-field:focus-within{border-color:var(--accent,#00FFC2);box-shadow:0 0 0 1px var(--accent,#00FFC2);}

.ik-tf-input{flex:1;min-width:0;border:none;background:transparent;outline:none;
  color:var(--fg1,#F0F6FC);font:inherit;padding:0;height:100%;}
.ik-tf-input::placeholder{color:var(--fg3,#6E7681);}
.ik-tf-input:-webkit-autofill{-webkit-text-fill-color:var(--fg1,#F0F6FC);transition:background-color 5000s;}

.ik-tf-ico{display:flex;align-items:center;color:var(--fg3,#6E7681);flex-shrink:0;}
.ik-tf-clear{display:flex;align-items:center;justify-content:center;flex-shrink:0;
  border:none;background:transparent;color:var(--fg3,#6E7681);cursor:pointer;padding:2px;
  border-radius:2px;transition:color .12s;}
.ik-tf-clear:hover{color:var(--fg1,#F0F6FC);}
.ik-tf-clear:focus-visible{outline:none;box-shadow:0 0 0 1px var(--accent,#00FFC2);color:var(--fg1,#F0F6FC);}

.ik-tf-field.is-error{border-color:var(--status-err,#F85149);}
.ik-tf-field.is-error:focus-within{border-color:var(--status-err,#F85149);box-shadow:0 0 0 1px var(--status-err,#F85149);}
.ik-tf-field.is-disabled{opacity:.5;cursor:not-allowed;}
.ik-tf-field.is-disabled .ik-tf-input{cursor:not-allowed;}

.ik-tf-msg{font-size:11px;line-height:1.4;color:var(--fg3,#6E7681);}
.ik-tf-msg.is-error{color:var(--status-err,#F85149);}
`;

let _tfCssReady = false;
function _injectTfCSS() {
  if (_tfCssReady || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.dataset.ikTf = '1';
  el.textContent = _TF_CSS;
  document.head.appendChild(el);
  _tfCssReady = true;
}

/* tiny built-in clear glyph (no Icon dependency) */
function _ClearGlyph() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="4" y1="4" x2="12" y2="12" />
      <line x1="12" y1="4" x2="4" y2="12" />
    </svg>
  );
}

let _tfId = 0;

/* ─────────────────────────────────────────────────────────────────────────────
   TextField — public export
   ───────────────────────────────────────────────────────────────────────────── */
export function TextField({
  size = 'm',
  label,
  hint,
  error,
  required = false,
  iconBefore,
  clearable = false,
  onClear,
  disabled = false,
  value,
  defaultValue,
  onChange,
  id,
  className = '',
  wrapClassName = '',
  clearLabel = 'Очистить',
  ...rest
}) {
  _injectTfCSS();

  const inputRef = React.useRef(null);
  const reactId = React.useMemo(() => id || `ik-tf-${++_tfId}`, [id]);
  const [hasVal, setHasVal] = React.useState(
    value != null ? String(value).length > 0 : String(defaultValue ?? '').length > 0,
  );

  const controlled = value != null;
  const showClear = clearable && !disabled && (controlled ? String(value).length > 0 : hasVal);

  const handleChange = (e) => {
    if (!controlled) setHasVal(e.target.value.length > 0);
    onChange?.(e);
  };

  const handleClear = () => {
    const el = inputRef.current;
    if (el) {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      ).set;
      setter.call(el, '');
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.focus();
    }
    if (!controlled) setHasVal(false);
    onClear?.();
  };

  const errText = typeof error === 'string' ? error : null;
  const isError = !!error;

  const fieldCls = [
    'ik-tf-field',
    'ik-tf-' + size,
    isError && 'is-error',
    disabled && 'is-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={('ik-tf-wrap ' + wrapClassName).trim()}>
      {label && (
        <label className="ik-tf-label" htmlFor={reactId}>
          {label}
          {required && (
            <span className="ik-tf-req" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <div className={fieldCls}>
        {iconBefore && <span className="ik-tf-ico">{iconBefore}</span>}
        <input
          ref={inputRef}
          id={reactId}
          className="ik-tf-input"
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={isError || undefined}
          aria-describedby={errText || hint ? reactId + '-msg' : undefined}
          {...rest}
        />
        {showClear && (
          <button
            type="button"
            className="ik-tf-clear"
            onClick={handleClear}
            aria-label={clearLabel}
          >
            <_ClearGlyph />
          </button>
        )}
      </div>
      {(errText || hint) && (
        <div id={reactId + '-msg'} className={'ik-tf-msg' + (isError ? ' is-error' : '')}>
          {errText || hint}
        </div>
      )}
    </div>
  );
}
