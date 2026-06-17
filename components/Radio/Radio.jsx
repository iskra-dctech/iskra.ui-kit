// components/Radio/Radio.jsx
// ИСКРА.DCI — Radio + RadioGroup. Radio is an outline ring with a mint dot
// (indicator → bright --accent is allowed). RadioGroup manages selection and
// wires name/checked/onChange to its items. Self-injects .ik-rd CSS.

const _RD_CSS = `
.ik-rdg{display:flex;font-family:var(--font-ui,'Inter',system-ui,sans-serif);}
.ik-rdg-vertical{flex-direction:column;gap:14px;}
.ik-rdg-horizontal{flex-direction:row;gap:24px;flex-wrap:wrap;}

.ik-rd{display:inline-flex;align-items:flex-start;gap:9px;cursor:pointer;
  color:var(--fg1,#F0F6FC);user-select:none;position:relative;}
.ik-rd.is-disabled{cursor:not-allowed;opacity:.5;}
.ik-rd-input{position:absolute;opacity:0;width:1px;height:1px;margin:0;}
.ik-rd-circle{flex-shrink:0;display:flex;align-items:center;justify-content:center;box-sizing:border-box;
  border:1px solid var(--line,#30363D);border-radius:50%;background:var(--bg,#0D1117);
  transition:border-color .12s,box-shadow .12s;margin-top:1px;}
.ik-rd-s .ik-rd-circle{width:14px;height:14px;}
.ik-rd-m .ik-rd-circle{width:16px;height:16px;}
.ik-rd:not(.is-disabled):hover .ik-rd-circle{border-color:var(--accent,#00FFC2);}
.ik-rd-dot{border-radius:50%;background:var(--accent,#00FFC2);transform:scale(0);
  transition:transform .12s cubic-bezier(.2,.6,.2,1);}
.ik-rd-s .ik-rd-dot{width:6px;height:6px;}
.ik-rd-m .ik-rd-dot{width:8px;height:8px;}
.ik-rd-input:checked + .ik-rd-circle{border-color:var(--accent,#00FFC2);}
.ik-rd-input:checked + .ik-rd-circle .ik-rd-dot{transform:scale(1);}
.ik-rd-input:focus-visible + .ik-rd-circle{box-shadow:0 0 0 1px var(--bg,#0D1117),0 0 0 2px var(--accent,#00FFC2);}
.ik-rd-textwrap{display:flex;flex-direction:column;}
.ik-rd-text{font-size:13px;line-height:1.45;}
.ik-rd-s .ik-rd-text{font-size:12px;}
.ik-rd-desc{font-size:11px;line-height:1.4;color:var(--fg2,#8B949E);margin-top:2px;}
`;

let _rdCssReady = false;
function _injectRdCSS() {
  if (_rdCssReady || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.dataset.ikRd = '1';
  el.textContent = _RD_CSS;
  document.head.appendChild(el);
  _rdCssReady = true;
}

let _rdId = 0;

/* ─────────────────────────────────────────────────────────────────────────────
   Radio — single radio button (usually rendered by RadioGroup)
   ───────────────────────────────────────────────────────────────────────────── */
export function Radio({
  value,
  checked,
  defaultChecked,
  name,
  disabled = false,
  size = 'm',
  label,
  description,
  onChange,
  id,
  className = '',
  ...rest
}) {
  _injectRdCSS();
  const reactId = React.useMemo(() => id || `ik-rd-${++_rdId}`, [id]);
  const cls = ['ik-rd', 'ik-rd-' + size, disabled && 'is-disabled', className]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={cls} htmlFor={reactId}>
      <input
        id={reactId}
        type="radio"
        className="ik-rd-input"
        value={value}
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />
      <span className="ik-rd-circle" aria-hidden="true">
        <span className="ik-rd-dot" />
      </span>
      {(label || description) && (
        <span className="ik-rd-textwrap">
          {label && <span className="ik-rd-text">{label}</span>}
          {description && <span className="ik-rd-desc">{description}</span>}
        </span>
      )}
    </label>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   RadioGroup — manages selection across its Radios
   ───────────────────────────────────────────────────────────────────────────── */
export function RadioGroup({
  name,
  value,
  defaultValue,
  onChange,
  options,
  size = 'm',
  orientation = 'vertical',
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  _injectRdCSS();
  const groupName = React.useMemo(() => name || `ik-rdg-${++_rdId}`, [name]);
  const controlled = value != null;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = controlled ? value : internal;

  const handle = (v) => {
    if (!controlled) setInternal(v);
    onChange?.(v);
  };

  const cls = ['ik-rdg', 'ik-rdg-' + orientation, className].filter(Boolean).join(' ');

  const renderRadio = (opt, key) => (
    <Radio
      key={key}
      name={groupName}
      size={size}
      value={opt.value}
      label={opt.label}
      description={opt.description}
      disabled={disabled || opt.disabled}
      checked={current === opt.value}
      onChange={() => handle(opt.value)}
    />
  );

  return (
    <div className={cls} role="radiogroup" {...rest}>
      {options
        ? options.map((opt, i) => renderRadio(opt, opt.value ?? i))
        : React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;
            return React.cloneElement(child, {
              name: groupName,
              size: child.props.size ?? size,
              checked: current === child.props.value,
              disabled: disabled || child.props.disabled,
              onChange: () => handle(child.props.value),
            });
          })}
    </div>
  );
}
