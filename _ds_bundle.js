/* @ds-bundle: {"format":3,"namespace":"DCIDesignSystem_2e8fb0","components":[{"name":"Badge","sourcePath":"components/Badge/Badge.jsx"},{"name":"Tag","sourcePath":"components/Badge/Badge.jsx"},{"name":"Button","sourcePath":"components/Button/Button.jsx"},{"name":"Checkbox","sourcePath":"components/Checkbox/Checkbox.jsx"},{"name":"Icon","sourcePath":"components/Icon/Icon.jsx"},{"name":"ICON_NAMES","sourcePath":"components/Icon/Icon.jsx"},{"name":"Radio","sourcePath":"components/Radio/Radio.jsx"},{"name":"RadioGroup","sourcePath":"components/Radio/Radio.jsx"},{"name":"Sidebar","sourcePath":"components/Sidebar/Sidebar.jsx"},{"name":"Switch","sourcePath":"components/Switch/Switch.jsx"},{"name":"TextField","sourcePath":"components/TextField/TextField.jsx"}],"sourceHashes":{"components/Badge/Badge.jsx":"ae5835e13ee5","components/Button/Button.jsx":"0de14723fb30","components/Checkbox/Checkbox.jsx":"6f558fa5218c","components/Icon/Icon.jsx":"c4c62818e502","components/Radio/Radio.jsx":"7aafee392d46","components/Sidebar/Sidebar.jsx":"a7c4fa37ece8","components/Switch/Switch.jsx":"520b60e1dd42","components/TextField/TextField.jsx":"ae8fab534770","design-canvas.jsx":"bd8746af6e58","logo/marks.js":"c9cf5a74a791","ui_kits/user-webui/Shell.jsx":"d795c4e8d28f","ui_kits/user-webui/data.jsx":"50797b632917","ui_kits/user-webui/primitives.jsx":"d2cad7e04067"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DCIDesignSystem_2e8fb0 = window.DCIDesignSystem_2e8fb0 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/Badge/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Badge({
  variant = 'neutral',
  size = 'm',
  dot = false,
  icon,
  children,
  className = '',
  ...rest
}) {
  _injectBdgCSS();
  const cls = ['ik-bdg', 'ik-bdg-' + size, 'ik-bdg-' + variant, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    className: "ik-bdg-dot",
    "aria-hidden": "true"
  }), icon, children);
}

/* ─────────────────────────────────────────────────────────────────────────────
   Tag — mono technical label, optionally removable (chip)
   ───────────────────────────────────────────────────────────────────────────── */
function Tag({
  accent = false,
  onRemove,
  removeLabel = 'Удалить',
  children,
  className = '',
  ...rest
}) {
  _injectBdgCSS();
  const cls = ['ik-tag', accent && 'ik-tag-accent', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ik-tag-x",
    onClick: onRemove,
    "aria-label": removeLabel
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "9",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "4",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "4",
    x2: "4",
    y2: "12"
  }))));
}
Object.assign(__ds_scope, { Badge, Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Badge/Badge.jsx", error: String((e && e.message) || e) }); }

// components/Button/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Button({
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
  const cls = ['ik-btn', 'ik-btn-' + variant, 'ik-btn-' + size, iconOnly && 'ik-btn-io', fullWidth && 'ik-btn-fw', loading && 'ik-btn-loading', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    disabled: disabled || loading
  }, rest), loading && /*#__PURE__*/React.createElement("span", {
    className: "ik-btn-spinner",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ik-btn-content"
  }, iconBefore, !iconOnly && children != null && /*#__PURE__*/React.createElement("span", null, children), iconOnly && children, iconAfter));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Button/Button.jsx", error: String((e && e.message) || e) }); }

// components/Checkbox/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
.ik-cb-box{flex-shrink:0;display:flex;align-items:center;justify-content:center;
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
function Checkbox({
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
  const cls = ['ik-cb', 'ik-cb-' + size, disabled && 'is-disabled', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("label", {
    className: cls,
    htmlFor: reactId
  }, /*#__PURE__*/React.createElement("input", _extends({
    ref: ref,
    id: reactId,
    type: "checkbox",
    className: "ik-cb-input",
    checked: checked,
    defaultChecked: defaultChecked,
    disabled: disabled,
    onChange: onChange
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ik-cb-box",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "ik-cb-check",
    width: "11",
    height: "11",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "3.5,8.5 6.5,11.5 12.5,4.5"
  })), /*#__PURE__*/React.createElement("svg", {
    className: "ik-cb-dash",
    width: "11",
    height: "11",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "3.5",
    y1: "8",
    x2: "12.5",
    y2: "8"
  }))), (label || description) && /*#__PURE__*/React.createElement("span", {
    className: "ik-cb-textwrap"
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "ik-cb-text"
  }, label), description && /*#__PURE__*/React.createElement("span", {
    className: "ik-cb-desc"
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Checkbox/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/Icon/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// components/Icon/Icon.jsx
// ИСКРА.DCI — Icon · single shared icon set for the whole UIKit.
// 16×16 grid, 1.5px stroke, round caps, currentColor. Size & color are inherited
// from context (font-size / color) unless overridden via props.

/* ─────────────────────────────────────────────────────────────────────────────
   Icon path table — raw SVG inner markup keyed by name.
   Identical copy lives in Icon/index.html (showcase). Keep in sync.
   ───────────────────────────────────────────────────────────────────────────── */
const ICONS = {
  // navigation / chevrons
  'chevron-down': '<polyline points="4,6 8,10 12,6"/>',
  'chevron-up': '<polyline points="4,10 8,6 12,10"/>',
  'chevron-left': '<polyline points="10,4 6,8 10,12"/>',
  'chevron-right': '<polyline points="6,4 10,8 6,12"/>',
  'arrow-right': '<line x1="2.5" y1="8" x2="13" y2="8"/><polyline points="9,4 13,8 9,12"/>',
  'arrow-left': '<line x1="13.5" y1="8" x2="3" y2="8"/><polyline points="7,4 3,8 7,12"/>',
  // actions
  'check': '<polyline points="3.5,8.5 6.5,11.5 12.5,4.5"/>',
  'close': '<line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/>',
  'plus': '<line x1="8" y1="3" x2="8" y2="13"/><line x1="3" y1="8" x2="13" y2="8"/>',
  'minus': '<line x1="3" y1="8" x2="13" y2="8"/>',
  'search': '<circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14.5" y2="14.5"/>',
  'filter': '<polygon points="2,3.5 14,3.5 9.5,8.5 9.5,13 6.5,11.5 6.5,8.5"/>',
  'refresh': '<path d="M2.5 8a5.5 5.5 0 0 1 9.4-3.9L13.5 5.5"/><polyline points="13.5,2.5 13.5,5.5 10.5,5.5"/><path d="M13.5 8a5.5 5.5 0 0 1-9.4 3.9L2.5 10.5"/><polyline points="2.5,13.5 2.5,10.5 5.5,10.5"/>',
  'trash': '<polyline points="3,4.5 13,4.5"/><path d="M5.5 4.5V3.2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V4.5"/><path d="M4.3 4.5 5 13a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1l.7-8.5"/>',
  'copy': '<rect x="5.5" y="5.5" width="8" height="8" rx="1.2"/><path d="M3.5 10.5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>',
  'edit': '<path d="M11 2.5 13.5 5 6 12.5 3 13.5 4 10.5Z"/><line x1="9.5" y1="4" x2="12" y2="6.5"/>',
  'download': '<line x1="8" y1="2.5" x2="8" y2="10"/><polyline points="5,7 8,10 11,7"/><path d="M3 11.5v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1"/>',
  'upload': '<line x1="8" y1="10.5" x2="8" y2="3"/><polyline points="5,6 8,3 11,6"/><path d="M3 11.5v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1"/>',
  'external': '<path d="M8.5 3H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7.5"/><polyline points="9.5,2.5 13.5,2.5 13.5,6.5"/><line x1="13.5" y1="2.5" x2="7.5" y2="8.5"/>',
  // visibility
  'eye': '<path d="M1.5 8S3.5 3.5 8 3.5 14.5 8 14.5 8 12.5 12.5 8 12.5 1.5 8 1.5 8Z"/><circle cx="8" cy="8" r="2"/>',
  'eye-off': '<path d="M3 3l10 10"/><path d="M6.5 6.6A2 2 0 0 0 8 10a2 2 0 0 0 1.4-.6"/><path d="M4.2 4.7C2.6 5.8 1.5 8 1.5 8s2 4.5 6.5 4.5c1 0 1.9-.2 2.7-.6"/><path d="M7 3.6A6 6 0 0 1 8 3.5C12.5 3.5 14.5 8 14.5 8a12 12 0 0 1-1.7 2.3"/>',
  // status / signal
  'info': '<circle cx="8" cy="8" r="6"/><line x1="8" y1="7.2" x2="8" y2="11"/><circle cx="8" cy="4.9" r=".55" fill="currentColor" stroke="none"/>',
  'warning': '<path d="M8 2 14.5 13.5H1.5Z"/><line x1="8" y1="6.4" x2="8" y2="9.4"/><circle cx="8" cy="11.4" r=".55" fill="currentColor" stroke="none"/>',
  'error': '<circle cx="8" cy="8" r="6"/><line x1="5.5" y1="5.5" x2="10.5" y2="10.5"/><line x1="10.5" y1="5.5" x2="5.5" y2="10.5"/>',
  'success': '<circle cx="8" cy="8" r="6"/><polyline points="5.3,8.2 7,10 10.7,5.8"/>',
  // objects
  'settings': '<circle cx="8" cy="8" r="2.2"/><path d="M8 1.5v1.8M8 12.7v1.8M14.5 8h-1.8M3.3 8H1.5M12.6 3.4l-1.3 1.3M4.7 11.3l-1.3 1.3M12.6 12.6l-1.3-1.3M4.7 4.7 3.4 3.4"/>',
  'user': '<circle cx="8" cy="5.5" r="2.8"/><path d="M2.5 14c0-3 2.4-4.8 5.5-4.8s5.5 1.8 5.5 4.8"/>',
  'calendar': '<rect x="2.5" y="3.5" width="11" height="10" rx="1.2"/><line x1="2.5" y1="6.5" x2="13.5" y2="6.5"/><line x1="5.5" y1="2" x2="5.5" y2="4.5"/><line x1="10.5" y1="2" x2="10.5" y2="4.5"/>',
  'clock': '<circle cx="8" cy="8" r="6"/><polyline points="8,4.5 8,8 10.5,9.5"/>',
  'lock': '<rect x="3.5" y="7" width="9" height="6.5" rx="1.2"/><path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7"/>',
  'bell': '<path d="M8 2a4 4 0 0 1 4 4c0 3 1.2 4 1.2 4H2.8S4 9 4 6a4 4 0 0 1 4-4z"/><path d="M6.4 12.5a1.7 1.7 0 0 0 3.2 0"/>',
  'more': '<circle cx="3.5" cy="8" r="1.1" fill="currentColor" stroke="none"/><circle cx="8" cy="8" r="1.1" fill="currentColor" stroke="none"/><circle cx="12.5" cy="8" r="1.1" fill="currentColor" stroke="none"/>'
};

/* ─────────────────────────────────────────────────────────────────────────────
   Icon — public export
   ───────────────────────────────────────────────────────────────────────────── */
function Icon({
  name,
  size = '1em',
  strokeWidth = 1.5,
  title,
  className = '',
  style,
  ...rest
}) {
  const inner = ICONS[name];
  if (!inner) {
    if (typeof console !== 'undefined') console.warn(`Icon: unknown name "${name}"`);
    return null;
  }
  const px = typeof size === 'number' ? `${size}px` : size;
  return /*#__PURE__*/React.createElement("svg", _extends({
    className: ('iskra-icon ' + className).trim(),
    width: px,
    height: px,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    role: title ? 'img' : undefined,
    "aria-hidden": title ? undefined : 'true',
    "aria-label": title || undefined,
    style: {
      display: 'inline-block',
      flexShrink: 0,
      verticalAlign: 'middle',
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: (title ? `<title>${title}</title>` : '') + inner
    }
  }, rest));
}

/** All registered icon names — handy for tooling / showcases. */
const ICON_NAMES = Object.keys(ICONS);
Object.assign(__ds_scope, { Icon, ICON_NAMES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Icon/Icon.jsx", error: String((e && e.message) || e) }); }

// components/Radio/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
.ik-rd-circle{flex-shrink:0;display:flex;align-items:center;justify-content:center;
  border:1px solid var(--line,#30363D);border-radius:50%;background:var(--bg,#0D1117);
  transition:border-color .12s,box-shadow .12s;margin-top:1px;}
.ik-rd-s .ik-rd-circle{width:14px;height:14px;}
.ik-rd-m .ik-rd-circle{width:16px;height:16px;}
.ik-rd:not(.is-disabled):hover .ik-rd-circle{border-color:var(--accent,#00FFC2);}
.ik-rd-dot{border-radius:50%;background:var(--accent,#00FFC2);transform:scale(0);
  transition:transform .12s cubic-bezier(.2,.6,.2,1);}
.ik-rd-s .ik-rd-dot{width:6px;height:6px;}
.ik-rd-m .ik-rd-dot{width:7px;height:7px;}
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
function Radio({
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
  const cls = ['ik-rd', 'ik-rd-' + size, disabled && 'is-disabled', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("label", {
    className: cls,
    htmlFor: reactId
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: reactId,
    type: "radio",
    className: "ik-rd-input",
    value: value,
    name: name,
    checked: checked,
    defaultChecked: defaultChecked,
    disabled: disabled,
    onChange: onChange
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ik-rd-circle",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ik-rd-dot"
  })), (label || description) && /*#__PURE__*/React.createElement("span", {
    className: "ik-rd-textwrap"
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "ik-rd-text"
  }, label), description && /*#__PURE__*/React.createElement("span", {
    className: "ik-rd-desc"
  }, description)));
}

/* ─────────────────────────────────────────────────────────────────────────────
   RadioGroup — manages selection across its Radios
   ───────────────────────────────────────────────────────────────────────────── */
function RadioGroup({
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
  const handle = v => {
    if (!controlled) setInternal(v);
    onChange?.(v);
  };
  const cls = ['ik-rdg', 'ik-rdg-' + orientation, className].filter(Boolean).join(' ');
  const renderRadio = (opt, key) => /*#__PURE__*/React.createElement(Radio, {
    key: key,
    name: groupName,
    size: size,
    value: opt.value,
    label: opt.label,
    description: opt.description,
    disabled: disabled || opt.disabled,
    checked: current === opt.value,
    onChange: () => handle(opt.value)
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    role: "radiogroup"
  }, rest), options ? options.map((opt, i) => renderRadio(opt, opt.value ?? i)) : React.Children.map(children, child => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, {
      name: groupName,
      size: child.props.size ?? size,
      checked: current === child.props.value,
      disabled: disabled || child.props.disabled,
      onChange: () => handle(child.props.value)
    });
  }));
}
Object.assign(__ds_scope, { Radio, RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Radio/Radio.jsx", error: String((e && e.message) || e) }); }

// components/Sidebar/Sidebar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function _Icon({
  id
}) {
  const p = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    viewBox: '0 0 16 16',
    width: '16',
    height: '16',
    'aria-hidden': 'true'
  };
  switch (id) {
    case 'overview':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("rect", {
        x: "2",
        y: "2",
        width: "5",
        height: "5",
        rx: "1"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "9",
        y: "2",
        width: "5",
        height: "5",
        rx: "1"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "2",
        y: "9",
        width: "5",
        height: "5",
        rx: "1"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "9",
        y: "9",
        width: "5",
        height: "5",
        rx: "1"
      }));
    case 'devices':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("rect", {
        x: "1.5",
        y: "3",
        width: "13",
        height: "4",
        rx: "1"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "1.5",
        y: "9",
        width: "13",
        height: "4",
        rx: "1"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12.5",
        cy: "5",
        r: ".85",
        fill: "currentColor",
        stroke: "none"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12.5",
        cy: "11",
        r: ".85",
        fill: "currentColor",
        stroke: "none"
      }));
    case 'topology':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("circle", {
        cx: "8",
        cy: "3",
        r: "1.5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "2.5",
        cy: "12.5",
        r: "1.5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "13.5",
        cy: "12.5",
        r: "1.5"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "8",
        y1: "4.5",
        x2: "3.3",
        y2: "11.2"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "8",
        y1: "4.5",
        x2: "12.7",
        y2: "11.2"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "4",
        y1: "12.5",
        x2: "12",
        y2: "12.5"
      }));
    case 'alerts':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("path", {
        d: "M8 2a4 4 0 0 1 4 4c0 2.5 1 3.5 1 3.5H3S4 9.5 4 6a4 4 0 0 1 4-4z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M6.5 9.5a1.5 1.5 0 0 0 3 0"
      }));
    case 'apikeys':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("circle", {
        cx: "5.5",
        cy: "8",
        r: "3"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M8.5 8h5.5m-2.5-1.5v3"
      }));
    case 'log':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("line", {
        x1: "3",
        y1: "4.5",
        x2: "13",
        y2: "4.5"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "3",
        y1: "8",
        x2: "13",
        y2: "8"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "3",
        y1: "11.5",
        x2: "9",
        y2: "11.5"
      }));
    case 'settings':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("line", {
        x1: "3",
        y1: "4",
        x2: "13",
        y2: "4"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "3",
        y1: "8",
        x2: "13",
        y2: "8"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "3",
        y1: "12",
        x2: "13",
        y2: "12"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "6",
        cy: "4",
        r: "1.5",
        fill: "currentColor"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "10",
        cy: "8",
        r: "1.5",
        fill: "currentColor"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "7",
        cy: "12",
        r: "1.5",
        fill: "currentColor"
      }));
    case 'users':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("circle", {
        cx: "6",
        cy: "6",
        r: "2.5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M1 14c0-3 2.5-4.5 5-4.5s5 1.5 5 4.5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M11 4.5a2 2 0 0 1 0 3.5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M13.5 14c0-2-1.2-3.5-2.5-4"
      }));
    case 'audit':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("path", {
        d: "M8 1.5 13.5 3.5V8c0 3.5-2.5 5.5-5.5 6.5-3-1-5.5-3-5.5-6.5V3.5Z"
      }), /*#__PURE__*/React.createElement("polyline", {
        points: "5.5,8 7,9.5 10.5,6"
      }));
    case 'system':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("rect", {
        x: "1.5",
        y: "2.5",
        width: "13",
        height: "11",
        rx: "1.5"
      }), /*#__PURE__*/React.createElement("polyline", {
        points: "4.5,6.5 7,9 4.5,11.5"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "8.5",
        y1: "11.5",
        x2: "11.5",
        y2: "11.5"
      }));
    case 'logout':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("path", {
        d: "M6 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3"
      }), /*#__PURE__*/React.createElement("polyline", {
        points: "10,5.5 13.5,8 10,10.5"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "6",
        y1: "8",
        x2: "13.5",
        y2: "8"
      }));
    default:
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("circle", {
        cx: "8",
        cy: "8",
        r: "5"
      }));
  }
}
function _Spark() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    width: "20",
    height: "20"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 1 12.6 7.8 19.5 9.8 12.6 11.9 10 18.7 7.4 11.9.5 9.8 7.4 7.8Z"
  }));
}

/* ─────────────────────────────────────────────────────────────────────────────
   Nav configuration
   ───────────────────────────────────────────────────────────────────────────── */
const _OP = [{
  id: 'monitoring',
  lbl: 'Мониторинг',
  items: [{
    id: 'overview',
    lbl: 'Обзор',
    ico: 'overview'
  }, {
    id: 'devices',
    lbl: 'Устройства',
    ico: 'devices'
  }, {
    id: 'topology',
    lbl: 'Топология',
    ico: 'topology'
  }]
}, {
  id: 'management',
  lbl: 'Управление',
  items: [{
    id: 'alerts',
    lbl: 'Оповещения',
    ico: 'alerts'
  }, {
    id: 'apikeys',
    lbl: 'API-ключи',
    ico: 'apikeys'
  }, {
    id: 'log',
    lbl: 'Журнал',
    ico: 'log'
  }]
}];
const _AD = [..._OP, {
  id: 'admin',
  lbl: 'Администрирование',
  items: [{
    id: 'users',
    lbl: 'Пользователи',
    ico: 'users'
  }, {
    id: 'audit',
    lbl: 'Аудит',
    ico: 'audit'
  }, {
    id: 'system',
    lbl: 'Система',
    ico: 'system'
  }]
}];
const _FT = [{
  id: 'settings',
  lbl: 'Настройки',
  ico: 'settings'
}, {
  id: 'logout',
  lbl: 'Выход',
  ico: 'logout'
}];

/* ─────────────────────────────────────────────────────────────────────────────
   NavItem
   ───────────────────────────────────────────────────────────────────────────── */
function _Item({
  id,
  lbl,
  ico,
  active,
  badge,
  onHover,
  onLeave,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: 'isb-item' + (active ? ' isb-on' : ''),
    title: lbl,
    onMouseEnter: onHover ? e => onHover(e, lbl) : undefined,
    onMouseLeave: onLeave,
    onClick: onClick,
    type: "button",
    "aria-current": active ? 'page' : undefined
  }, /*#__PURE__*/React.createElement("span", {
    className: "isb-ico"
  }, /*#__PURE__*/React.createElement(_Icon, {
    id: ico
  })), /*#__PURE__*/React.createElement("span", {
    className: "isb-lbl"
  }, lbl), badge > 0 && /*#__PURE__*/React.createElement("span", {
    className: "isb-bdg",
    "aria-label": `${lbl}: ${badge} уведомлений`
  }, badge));
}

/* ─────────────────────────────────────────────────────────────────────────────
   Sidebar — public export
   ───────────────────────────────────────────────────────────────────────────── */
function Sidebar({
  collapsed = false,
  onToggle,
  activeItem = 'overview',
  onNavigate,
  variant = 'operator',
  theme = '',
  badges = {},
  className = ''
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
  const showTip = React.useCallback((e, lbl) => {
    if (!tipRdy || !sbRef.current) return;
    const ir = e.currentTarget.getBoundingClientRect();
    const sr = sbRef.current.getBoundingClientRect();
    setTip({
      lbl,
      top: ir.top - sr.top + ir.height / 2
    });
  }, [tipRdy]);
  const hideTip = React.useCallback(() => setTip(null), []);
  const sections = variant === 'admin' ? _AD : _OP;
  const rootCls = ['iskra-sb', collapsed && 'isb-c', collapsed && tipRdy && 'isb-tip-rdy', theme, className].filter(Boolean).join(' ');
  const hoverHandlers = collapsed ? {
    onHover: showTip,
    onLeave: hideTip
  } : {};
  return /*#__PURE__*/React.createElement("aside", {
    className: rootCls,
    ref: sbRef,
    role: "navigation",
    "aria-label": "\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B"
  }, /*#__PURE__*/React.createElement("div", {
    className: "isb-logo"
  }, /*#__PURE__*/React.createElement("span", {
    className: "isb-spark"
  }, /*#__PURE__*/React.createElement(_Spark, null)), /*#__PURE__*/React.createElement("span", {
    className: "isb-wmark"
  }, "\u0418\u0421\u041A\u0420\u0410.DCI"), /*#__PURE__*/React.createElement("button", {
    className: "isb-collapser",
    type: "button",
    onClick: onToggle,
    "aria-expanded": !collapsed,
    "aria-label": collapsed ? 'Развернуть боковую панель' : 'Свернуть боковую панель'
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 10 10",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "7,2 4,5 7,8"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "isb-scroll"
  }, sections.map(({
    id,
    lbl,
    items
  }) => /*#__PURE__*/React.createElement("div", {
    key: id,
    className: "isb-grp"
  }, /*#__PURE__*/React.createElement("div", {
    className: "isb-sec",
    "aria-hidden": "true"
  }, lbl), items.map(item => /*#__PURE__*/React.createElement(_Item, _extends({
    key: item.id,
    id: item.id,
    lbl: item.lbl,
    ico: item.ico,
    active: activeItem === item.id,
    badge: badges[item.id],
    onClick: () => onNavigate?.(item.id)
  }, hoverHandlers)))))), /*#__PURE__*/React.createElement("div", {
    className: "isb-foot"
  }, _FT.map(item => /*#__PURE__*/React.createElement(_Item, _extends({
    key: item.id,
    id: item.id,
    lbl: item.lbl,
    ico: item.ico,
    active: activeItem === item.id,
    badge: badges[item.id],
    onClick: () => onNavigate?.(item.id)
  }, hoverHandlers)))), tip && /*#__PURE__*/React.createElement("div", {
    className: "isb-floatip",
    style: {
      top: tip.top
    }
  }, tip.lbl));
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Sidebar/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/Switch/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Switch({
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
  const cls = ['ik-sw', 'ik-sw-' + size, disabled && 'is-disabled', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("label", {
    className: cls,
    htmlFor: reactId
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: reactId,
    type: "checkbox",
    role: "switch",
    className: "ik-sw-input",
    checked: checked,
    defaultChecked: defaultChecked,
    disabled: disabled,
    onChange: onChange
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ik-sw-track",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ik-sw-knob"
  })), (label || description) && /*#__PURE__*/React.createElement("span", {
    className: "ik-sw-textwrap"
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "ik-sw-text"
  }, label), description && /*#__PURE__*/React.createElement("span", {
    className: "ik-sw-desc"
  }, description)));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Switch/Switch.jsx", error: String((e && e.message) || e) }); }

// components/TextField/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  return /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "4",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "4",
    x2: "4",
    y2: "12"
  }));
}
let _tfId = 0;

/* ─────────────────────────────────────────────────────────────────────────────
   TextField — public export
   ───────────────────────────────────────────────────────────────────────────── */
function TextField({
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
  const [hasVal, setHasVal] = React.useState(value != null ? String(value).length > 0 : String(defaultValue ?? '').length > 0);
  const controlled = value != null;
  const showClear = clearable && !disabled && (controlled ? String(value).length > 0 : hasVal);
  const handleChange = e => {
    if (!controlled) setHasVal(e.target.value.length > 0);
    onChange?.(e);
  };
  const handleClear = () => {
    const el = inputRef.current;
    if (el) {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(el, '');
      el.dispatchEvent(new Event('input', {
        bubbles: true
      }));
      el.focus();
    }
    if (!controlled) setHasVal(false);
    onClear?.();
  };
  const errText = typeof error === 'string' ? error : null;
  const isError = !!error;
  const fieldCls = ['ik-tf-field', 'ik-tf-' + size, isError && 'is-error', disabled && 'is-disabled', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: ('ik-tf-wrap ' + wrapClassName).trim()
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "ik-tf-label",
    htmlFor: reactId
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "ik-tf-req",
    "aria-hidden": "true"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: fieldCls
  }, iconBefore && /*#__PURE__*/React.createElement("span", {
    className: "ik-tf-ico"
  }, iconBefore), /*#__PURE__*/React.createElement("input", _extends({
    ref: inputRef,
    id: reactId,
    className: "ik-tf-input",
    disabled: disabled,
    value: value,
    defaultValue: defaultValue,
    onChange: handleChange,
    "aria-invalid": isError || undefined,
    "aria-describedby": errText || hint ? reactId + '-msg' : undefined
  }, rest)), showClear && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ik-tf-clear",
    onClick: handleClear,
    "aria-label": clearLabel
  }, /*#__PURE__*/React.createElement(_ClearGlyph, null))), (errText || hint) && /*#__PURE__*/React.createElement("div", {
    id: reactId + '-msg',
    className: 'ik-tf-msg' + (isError ? ' is-error' : '')
  }, errText || hint));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/TextField/TextField.jsx", error: String((e && e.message) || e) }); }

// design-canvas.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-canvas.jsx", error: String((e && e.message) || e) }); }

// logo/marks.js
try { (() => {
/* ============================================================
   ИСКРА.DCI — Cube + Spark mark generators
   Concept: the isometric CUBE is the "hard shell" / data center,
   the pixel SPARK at its core is Искра. Built from brand tokens.
   ============================================================ */
(function () {
  // ---- isometric cube geometry --------------------------------
  const ISO = s => {
    const k = 0.8660254 * s,
      h = 0.5 * s;
    return {
      T: [0, -s],
      UR: [k, -h],
      LR: [k, h],
      B: [0, s],
      LL: [-k, h],
      UL: [-k, -h],
      C: [0, 0]
    };
  };
  const P = a => `${a[0].toFixed(1)},${a[1].toFixed(1)}`;
  function cubeEdges(s) {
    const v = ISO(s);
    return {
      outer: `M${P(v.T)} L${P(v.UR)} L${P(v.LR)} L${P(v.B)} L${P(v.LL)} L${P(v.UL)} Z`,
      // near corner (center) → the three visible edges
      inner: `M${P(v.C)} L${P(v.UL)} M${P(v.C)} L${P(v.UR)} M${P(v.C)} L${P(v.B)}`,
      v
    };
  }

  // ---- pixel spark (8-point burst) — same DNA as logo-spark ---
  // [col,row,level]; level: w core / b bright / m mint / d dim
  const PX = [[0, 0, 'w'], [0, -1, 'b'], [0, 1, 'b'], [-1, 0, 'b'], [1, 0, 'b'], [0, -2, 'm'], [0, -3, 'm'], [0, 2, 'm'], [0, 3, 'm'], [-2, 0, 'm'], [-3, 0, 'm'], [2, 0, 'm'], [3, 0, 'm'], [0, -5, 'd'], [0, 5, 'd'], [-5, 0, 'd'], [5, 0, 'd'], [1, -1, 'm'], [-1, -1, 'm'], [1, 1, 'm'], [-1, 1, 'm'], [2, -2, 'm'], [-2, -2, 'm'], [2, 2, 'm'], [-2, 2, 'm'], [3, -3, 'd'], [-3, -3, 'd'], [3, 3, 'd'], [-3, 3, 'd'], [1, -4, 'd'], [-1, 4, 'd'], [4, 1, 'd'], [-4, -1, 'd']];
  function sparkRects(cell, map, cx, cy) {
    cx = cx || 0;
    cy = cy || 0;
    return PX.map(([c, r, lv]) => {
      const col = map[lv];
      const x = cx + c * cell - cell / 2;
      const y = cy + r * cell - cell / 2;
      return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${cell}" height="${cell}" fill="${col.f}"${col.o ? ` opacity="${col.o}"` : ''}/>`;
    }).join('');
  }
  function pixelLine(a, b, gap, d, fill, op) {
    const dx = b[0] - a[0],
      dy = b[1] - a[1];
    const n = Math.max(1, Math.round(Math.hypot(dx, dy) / gap));
    let out = '';
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const x = a[0] + dx * t - d / 2,
        y = a[1] + dy * t - d / 2;
      out += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${d}" height="${d}" fill="${fill}"${op ? ` opacity="${op}"` : ''}/>`;
    }
    return out;
  }
  const glowMap = {
    w: {
      f: '#FFFFFF'
    },
    b: {
      f: '#7BFFE0'
    },
    m: {
      f: '#00FFC2'
    },
    d: {
      f: '#00D6AA',
      o: .7
    }
  };
  const coreMap = {
    w: {
      f: '#FFFFFF'
    },
    b: {
      f: '#CFFFF1'
    },
    m: {
      f: '#7BFFE0'
    },
    d: {
      f: '#00FFC2',
      o: .85
    }
  };
  const flatMap = {
    w: {
      f: '#00AA85'
    },
    b: {
      f: '#00AA85'
    },
    m: {
      f: '#0D1117'
    },
    d: {
      f: '#8B949E',
      o: .9
    }
  };
  const inkMap = {
    w: {
      f: '#0D1117'
    },
    b: {
      f: '#0D1117'
    },
    m: {
      f: '#0D1117'
    },
    d: {
      f: '#0D1117',
      o: .55
    }
  };
  const VB = `-110 -110 220 220`;
  function bloom(id, r, color, o0, o1) {
    return `<radialGradient id="${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${color}" stop-opacity="${o0}"/>
      <stop offset="45%" stop-color="${color}" stop-opacity="${o1}"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>`;
  }

  // ============================================================
  // A · GLASS GLOW — glass shell + mint inner cube + glowing core
  //   (closest to the reference image, in brand mint)
  // ============================================================
  function markGlass(id) {
    const out = cubeEdges(92);
    const inn = cubeEdges(50);
    return `<svg viewBox="${VB}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${bloom(id + 'bloom', 0, '#00FFC2', .50, .12)}
        <filter id="${id}soft" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="5.5"/></filter>
        <filter id="${id}edge" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6"/></filter>
      </defs>
      <circle cx="0" cy="0" r="96" fill="url(#${id}bloom)"/>
      <!-- glass shell: dark body stroke + cool edge highlight -->
      <path d="${out.outer}" fill="none" stroke="#2A323C" stroke-width="6.5" stroke-linejoin="round"/>
      <path d="${out.inner}" fill="none" stroke="#222932" stroke-width="5" stroke-linecap="round"/>
      <path d="${out.outer}" fill="none" stroke="#9AA7B2" stroke-width="1.4" stroke-linejoin="round" opacity=".7"/>
      <path d="${out.inner}" fill="none" stroke="#6E7B88" stroke-width="1.2" stroke-linecap="round" opacity=".55"/>
      <!-- inner mint cube -->
      <g filter="url(#${id}soft)" opacity=".7">
        <path d="${inn.outer}" fill="none" stroke="#00FFC2" stroke-width="3" stroke-linejoin="round"/>
        <path d="${inn.inner}" fill="none" stroke="#00FFC2" stroke-width="2.4" stroke-linecap="round"/>
      </g>
      <path d="${inn.outer}" fill="rgba(0,255,194,.06)" stroke="#00FFC2" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="${inn.inner}" fill="none" stroke="#7BFFE0" stroke-width="1.3" stroke-linecap="round"/>
      <!-- spark core -->
      <g filter="url(#${id}soft)" opacity=".9" shape-rendering="crispEdges">${sparkRects(6.5, glowMap)}</g>
      <g filter="url(#${id}edge)" shape-rendering="crispEdges">${sparkRects(6.5, glowMap)}</g>
      <g shape-rendering="crispEdges">${sparkRects(6.5, glowMap)}</g>
    </svg>`;
  }

  // ============================================================
  // B · SIGNAL (mono) — neutral line shell, mint spark = the signal
  //   the most on-brand reading: "colour only as signal"
  // ============================================================
  function markSignal(id, sparkCell) {
    const out = cubeEdges(90);
    sparkCell = sparkCell || 6;
    return `<svg viewBox="${VB}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${bloom(id + 'bloom', 0, '#00FFC2', .40, .10)}
        <filter id="${id}soft" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4.5"/></filter>
        <filter id="${id}edge" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4"/></filter>
      </defs>
      <circle cx="0" cy="0" r="86" fill="url(#${id}bloom)"/>
      <path d="${out.outer}" fill="none" stroke="#30363D" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="${out.inner}" fill="none" stroke="#30363D" stroke-width="1.8" stroke-linecap="round"/>
      <g filter="url(#${id}soft)" opacity=".85" shape-rendering="crispEdges">${sparkRects(sparkCell, glowMap)}</g>
      <g filter="url(#${id}edge)" shape-rendering="crispEdges">${sparkRects(sparkCell, glowMap)}</g>
      <g shape-rendering="crispEdges">${sparkRects(sparkCell, glowMap)}</g>
    </svg>`;
  }

  // ============================================================
  // C · CHARGED — full mint wire cube + white-hot core (active state)
  // ============================================================
  function markCharged(id) {
    const out = cubeEdges(90);
    return `<svg viewBox="${VB}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${bloom(id + 'bloom', 0, '#00FFC2', .55, .16)}
        <filter id="${id}soft" x="-90%" y="-90%" width="280%" height="280%"><feGaussianBlur stdDeviation="5"/></filter>
        <filter id="${id}edge" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6"/></filter>
      </defs>
      <circle cx="0" cy="0" r="100" fill="url(#${id}bloom)"/>
      <g filter="url(#${id}soft)" opacity=".55">
        <path d="${out.outer}" fill="none" stroke="#00FFC2" stroke-width="4" stroke-linejoin="round"/>
        <path d="${out.inner}" fill="none" stroke="#00FFC2" stroke-width="3.2" stroke-linecap="round"/>
      </g>
      <path d="${out.outer}" fill="rgba(0,255,194,.05)" stroke="#00FFC2" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="${out.inner}" fill="none" stroke="#7BFFE0" stroke-width="1.8" stroke-linecap="round"/>
      <g filter="url(#${id}soft)" opacity=".95" shape-rendering="crispEdges">${sparkRects(6.5, coreMap)}</g>
      <g filter="url(#${id}edge)" shape-rendering="crispEdges">${sparkRects(6.5, coreMap)}</g>
      <g shape-rendering="crispEdges">${sparkRects(6.5, coreMap)}</g>
    </svg>`;
  }

  // ============================================================
  // D · PIXEL CUBE — cube edges built from pixels (spark DNA)
  // ============================================================
  function markPixel(id) {
    const {
      v
    } = cubeEdges(88);
    const gap = 11,
      d = 5.4;
    const C = '#00FFC2';
    const outerEdges = [[v.T, v.UR], [v.UR, v.LR], [v.LR, v.B], [v.B, v.LL], [v.LL, v.UL], [v.UL, v.T]];
    const innerEdges = [[v.C, v.UL], [v.C, v.UR], [v.C, v.B]];
    let px = '';
    outerEdges.forEach(([a, b]) => {
      px += pixelLine(a, b, gap, d, C, .55);
    });
    innerEdges.forEach(([a, b]) => {
      px += pixelLine(a, b, gap, d, C, .8);
    });
    return `<svg viewBox="${VB}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${bloom(id + 'bloom', 0, '#00FFC2', .42, .11)}
        <filter id="${id}soft" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4"/></filter>
      </defs>
      <circle cx="0" cy="0" r="92" fill="url(#${id}bloom)"/>
      <g filter="url(#${id}soft)" opacity=".5" shape-rendering="crispEdges">${px}</g>
      <g shape-rendering="crispEdges">${px}</g>
      <g shape-rendering="crispEdges">${sparkRects(5.5, glowMap)}</g>
    </svg>`;
  }

  // ============================================================
  // FLAT — single-weight, for light backgrounds / small sizes
  // ============================================================
  function markFlat(id, mono) {
    const out = cubeEdges(90);
    const map = mono ? inkMap : flatMap;
    const stroke = mono ? '#0D1117' : '#00AA85';
    return `<svg viewBox="${VB}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
      <path d="${out.outer}" fill="none" stroke="${stroke}" stroke-width="2.4" stroke-linejoin="round" opacity="${mono ? .85 : .9}"/>
      <path d="${out.inner}" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" opacity="${mono ? .55 : .6}"/>
      ${mono ? sparkRects(6, {
      w: {
        f: '#0D1117'
      },
      b: {
        f: '#0D1117'
      },
      m: {
        f: '#0D1117'
      },
      d: {
        f: '#0D1117',
        o: .5
      }
    }) : sparkRects(6, {
      w: {
        f: '#00AA85'
      },
      b: {
        f: '#00AA85'
      },
      m: {
        f: '#00AA85'
      },
      d: {
        f: '#00AA85',
        o: .55
      }
    })}
    </svg>`;
  }

  // spark-only (no cube) for the very smallest sizes
  function sparkOnly(id, cell) {
    return `<svg viewBox="${VB}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>${bloom(id + 'bloom', 0, '#00FFC2', .5, .12)}
        <filter id="${id}e" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4"/></filter></defs>
      <circle cx="0" cy="0" r="70" fill="url(#${id}bloom)"/>
      <g filter="url(#${id}e)" shape-rendering="crispEdges">${sparkRects(cell || 9, glowMap)}</g>
      <g shape-rendering="crispEdges">${sparkRects(cell || 9, glowMap)}</g>
    </svg>`;
  }
  window.ISKRA_MARKS = {
    glass: markGlass,
    signal: markSignal,
    charged: markCharged,
    pixel: markPixel,
    flat: markFlat,
    sparkOnly
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "logo/marks.js", error: String((e && e.message) || e) }); }

// ui_kits/user-webui/Shell.jsx
try { (() => {
/* ИСКРА.DCI — App shell: TopBar + SideNav */

function TopBar({
  query,
  onQuery
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 48,
      borderBottom: '1px solid #30363D',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      gap: 14,
      background: '#0D1117',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-spark.svg",
    width: "22",
    height: "22",
    style: {
      imageRendering: 'pixelated'
    },
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 15,
      letterSpacing: '-.04em',
      color: '#F0F6FC'
    }
  }, "\u0418\u0421\u041A\u0420\u0410", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#00FFC2'
    }
  }, ".")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono',monospace",
      fontSize: 9,
      letterSpacing: '.18em',
      color: '#6E7681'
    }
  }, "DCI"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 280,
      height: 30,
      background: '#161B22',
      border: '1px solid #30363D',
      borderRadius: 4,
      padding: '0 10px',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 14,
    color: "#6E7681"
  }), /*#__PURE__*/React.createElement("input", {
    value: query,
    onChange: e => onQuery(e.target.value),
    placeholder: "\u041F\u043E\u0438\u0441\u043A \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432, IP, \u0442\u0435\u0433\u043E\u0432\u2026",
    style: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      width: '100%',
      fontFamily: "'Inter',sans-serif",
      fontSize: 12,
      color: '#F0F6FC'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono'",
      fontSize: 10,
      color: '#6E7681',
      border: '1px solid #30363D',
      borderRadius: 2,
      padding: '1px 5px'
    }
  }, "\u2318K")), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 4,
      background: 'transparent',
      border: '1px solid #30363D',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#8B949E'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 15
  })), /*#__PURE__*/React.createElement("div", {
    style: {
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
      fontFamily: "'Inter'"
    }
  }, "AK"));
}
function SideNav({
  active,
  onNav
}) {
  const items = [{
    id: 'dashboard',
    label: 'Обзор',
    icon: 'activity'
  }, {
    id: 'panels',
    label: 'Панели',
    icon: 'grid'
  }, {
    id: 'inventory',
    label: 'Устройства',
    icon: 'server'
  }, {
    id: 'console',
    label: 'Консоль',
    icon: 'terminal'
  }, {
    id: 'docs',
    label: 'Документация',
    icon: 'book-open'
  }, {
    id: 'storage',
    label: 'Хранилище',
    icon: 'archive'
  }];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      width: 200,
      borderRight: '1px solid #30363D',
      background: '#0D1117',
      display: 'flex',
      flexDirection: 'column',
      padding: '12px 10px',
      gap: 2,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono'",
      fontSize: 10,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: '#6E7681',
      padding: '6px 10px 8px'
    }
  }, "User WebUI"), items.map(it => {
    const on = active === it.id;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onNav(it.id),
      style: {
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
        position: 'relative'
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: -10,
        top: 7,
        bottom: 7,
        width: 2,
        background: '#00FFC2',
        borderRadius: 1
      }
    }), /*#__PURE__*/React.createElement(Icon, {
      name: it.icon,
      size: 16,
      color: on ? '#00FFC2' : '#6E7681'
    }), it.label);
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #30363D',
      paddingTop: 10,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 10px'
    }
  }, /*#__PURE__*/React.createElement(StatusDot, {
    status: "ok",
    size: 7
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono'",
      fontSize: 10,
      color: '#8B949E'
    }
  }, "API \xB7 reconciler \xB7 ok"))));
}
Object.assign(window, {
  TopBar,
  SideNav
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/user-webui/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/user-webui/data.jsx
try { (() => {
/* ИСКРА.DCI — fake fleet data */
const SPARKS = {
  a: [40, 55, 35, 70, 60, 45, 75, 58, 50, 62, 48, 68],
  b: [50, 85, 90, 88, 60, 40, 55, 42, 58, 46, 52, 49],
  c: [30, 42, 38, 48, 52, 45, 40, 55, 50, 44, 47, 41],
  d: [60, 65, 58, 72, 68, 75, 70, 66, 62, 69, 64, 71]
};
const DEVICES = [{
  id: 'spine-01.msk',
  ip: '10.0.1.1',
  status: 'ok',
  tags: ['spine', 'prod'],
  spark: SPARKS.a,
  cpu: 73,
  temp: 41,
  role: 'Spine',
  site: 'MSK-DC1'
}, {
  id: 'leaf-07.msk',
  ip: '10.0.2.7',
  status: 'warn',
  tags: ['leaf', 'drift'],
  spark: SPARKS.b,
  cpu: 88,
  temp: 57,
  role: 'Leaf',
  site: 'MSK-DC1'
}, {
  id: 'spine-02.msk',
  ip: '10.0.1.2',
  status: 'ok',
  tags: ['spine', 'prod'],
  spark: SPARKS.a,
  cpu: 61,
  temp: 39,
  role: 'Spine',
  site: 'MSK-DC1'
}, {
  id: 'leaf-03.msk',
  ip: '10.0.2.3',
  status: 'ok',
  tags: ['leaf', 'prod'],
  spark: SPARKS.c,
  cpu: 54,
  temp: 44,
  role: 'Leaf',
  site: 'MSK-DC1'
}, {
  id: 'border-01.spb',
  ip: '10.1.0.1',
  status: 'err',
  tags: ['border', 'crit'],
  spark: SPARKS.b,
  cpu: 0,
  temp: 0,
  role: 'Border',
  site: 'SPB-DC2'
}, {
  id: 'leaf-09.spb',
  ip: '10.1.2.9',
  status: 'off',
  tags: ['leaf', 'maint'],
  spark: SPARKS.c,
  cpu: 0,
  temp: 0,
  role: 'Leaf',
  site: 'SPB-DC2'
}, {
  id: 'spine-04.spb',
  ip: '10.1.1.4',
  status: 'ok',
  tags: ['spine', 'prod'],
  spark: SPARKS.d,
  cpu: 67,
  temp: 42,
  role: 'Spine',
  site: 'SPB-DC2'
}, {
  id: 'leaf-12.msk',
  ip: '10.0.2.12',
  status: 'warn',
  tags: ['leaf', 'drift'],
  spark: SPARKS.b,
  cpu: 81,
  temp: 53,
  role: 'Leaf',
  site: 'MSK-DC1'
}, {
  id: 'stor-01.msk',
  ip: '10.0.5.1',
  status: 'ok',
  tags: ['storage', 'prod'],
  spark: SPARKS.d,
  cpu: 48,
  temp: 38,
  role: 'Storage',
  site: 'MSK-DC1'
}, {
  id: 'stor-02.msk',
  ip: '10.0.5.2',
  status: 'ok',
  tags: ['storage', 'prod'],
  spark: SPARKS.a,
  cpu: 52,
  temp: 40,
  role: 'Storage',
  site: 'MSK-DC1'
}, {
  id: 'leaf-21.spb',
  ip: '10.1.2.21',
  status: 'ok',
  tags: ['leaf', 'prod'],
  spark: SPARKS.c,
  cpu: 59,
  temp: 43,
  role: 'Leaf',
  site: 'SPB-DC2'
}, {
  id: 'mgmt-01.msk',
  ip: '10.0.0.1',
  status: 'ok',
  tags: ['mgmt', 'prod'],
  spark: SPARKS.d,
  cpu: 35,
  temp: 36,
  role: 'Mgmt',
  site: 'MSK-DC1'
}];
const ISSUES = [{
  id: 'border-01.spb',
  reason: 'Потеря связи с устройством',
  status: 'err'
}, {
  id: 'leaf-07.msk',
  reason: 'Drift: BGP-конфигурация',
  status: 'warn'
}, {
  id: 'leaf-12.msk',
  reason: 'Drift: MTU расходится',
  status: 'warn'
}];
// reconciler diff rows (desired vs observed)
const DIFF = [{
  d: 'hostname: leaf-07.msk',
  o: 'hostname: leaf-07.msk',
  k: 'same'
}, {
  d: 'mtu: 9000',
  o: 'mtu: 1500',
  k: 'drift'
}, {
  d: 'bgp:',
  o: 'bgp:',
  k: 'same'
}, {
  d: '  asn: 65002',
  o: '  asn: 65002',
  k: 'same'
}, {
  d: '  neighbors: [10.0.1.1, 10.0.1.2]',
  o: '  neighbors: [10.0.1.1]',
  k: 'drift'
}, {
  d: 'vlan: 200',
  o: 'vlan: 200',
  k: 'same'
}, {
  d: 'state: synced',
  o: 'state: drift',
  k: 'drift'
}];
Object.assign(window, {
  DEVICES,
  ISSUES,
  DIFF
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/user-webui/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/user-webui/primitives.jsx
try { (() => {
/* ИСКРА.DCI — primitives & icons. Exports to window. */

// Feather icon wrapper (1.5px outline, 16/20px per guide)
function Icon({
  name,
  size = 16,
  color,
  style,
  strokeWidth = 1.5
}) {
  const svg = window.feather && window.feather.icons[name] ? window.feather.icons[name].toSvg({
    width: size,
    height: size,
    'stroke-width': strokeWidth
  }) : '';
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-flex',
      color,
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: svg
    }
  });
}
function StatusDot({
  status = 'ok',
  size = 8,
  pulse = false
}) {
  const map = {
    ok: '#00FFC2',
    warn: '#F97316',
    err: '#F85149',
    off: '#6E7681',
    info: '#58A6FF'
  };
  return /*#__PURE__*/React.createElement("span", {
    className: pulse ? 'iskra-pulse' : '',
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      background: map[status],
      flexShrink: 0,
      display: 'inline-block'
    }
  });
}
function Badge({
  status = 'ok',
  children
}) {
  const map = {
    ok: {
      c: '#00FFC2',
      b: 'rgba(0,255,194,.4)',
      bg: 'rgba(0,255,194,.08)'
    },
    warn: {
      c: '#F97316',
      b: 'rgba(249,115,22,.4)',
      bg: 'rgba(249,115,22,.08)'
    },
    err: {
      c: '#F85149',
      b: 'rgba(248,81,73,.4)',
      bg: 'rgba(248,81,73,.08)'
    },
    off: {
      c: '#8B949E',
      b: '#30363D',
      bg: '#161B22'
    },
    info: {
      c: '#58A6FF',
      b: 'rgba(88,166,255,.4)',
      bg: 'rgba(88,166,255,.08)'
    }
  }[status];
  const dot = {
    ok: '#00FFC2',
    warn: '#F97316',
    err: '#F85149',
    off: '#6E7681',
    info: '#58A6FF'
  }[status];
  return /*#__PURE__*/React.createElement("span", {
    style: {
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
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: dot
    }
  }), children);
}
function Button({
  variant = 'secondary',
  icon,
  children,
  onClick,
  disabled,
  style
}) {
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
    opacity: disabled ? .4 : 1,
    whiteSpace: 'nowrap'
  };
  const variants = {
    primary: {
      borderColor: '#00FFC2',
      color: '#00FFC2',
      background: hover && !disabled ? 'rgba(0,255,194,.12)' : 'transparent'
    },
    secondary: {
      borderColor: hover && !disabled ? '#00FFC2' : '#30363D',
      color: hover && !disabled ? '#00FFC2' : '#F0F6FC'
    },
    destructive: {
      borderColor: '#F85149',
      color: '#F85149',
      background: hover && !disabled ? 'rgba(248,81,73,.1)' : 'transparent'
    },
    ghost: {
      borderColor: 'transparent',
      color: hover && !disabled ? '#00FFC2' : '#8B949E'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 15
  }), children);
}
function Tag({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono',monospace",
      fontSize: 9,
      color: '#8B949E',
      background: '#0D1117',
      border: '1px solid #30363D',
      borderRadius: 2,
      padding: '1px 5px',
      letterSpacing: '.04em'
    }
  }, children);
}
function Sparkline({
  data,
  alert = false,
  height = 28
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      display: 'flex',
      alignItems: 'flex-end',
      gap: 2
    }
  }, data.map((v, i) => {
    const isAlert = alert && v > 78;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        flex: 1,
        borderRadius: 1,
        height: `${v}%`,
        background: isAlert ? '#F97316' : '#00AA85',
        opacity: isAlert ? .85 : v > 65 ? .7 : v > 48 ? .5 : .3
      }
    });
  }));
}
function MonoField({
  value,
  placeholder,
  focus = false,
  mono = true,
  onChange,
  style
}) {
  const [f, setF] = React.useState(focus);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 32,
      background: '#0D1117',
      border: `1px solid ${f ? '#00FFC2' : '#30363D'}`,
      boxShadow: f ? '0 0 0 1px #00FFC2' : 'none',
      borderRadius: 4,
      padding: '0 10px',
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: value,
    placeholder: placeholder,
    onChange: onChange,
    onFocus: () => setF(true),
    onBlur: () => setF(focus),
    style: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      width: '100%',
      fontFamily: mono ? "'JetBrains Mono',monospace" : "'Inter',sans-serif",
      fontSize: mono ? 12 : 13,
      color: '#F0F6FC'
    }
  }));
}
Object.assign(window, {
  Icon,
  StatusDot,
  Badge,
  Button,
  Tag,
  Sparkline,
  MonoField
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/user-webui/primitives.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.TextField = __ds_scope.TextField;

})();
