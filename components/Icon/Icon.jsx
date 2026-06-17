// components/Icon/Icon.jsx
// ИСКРА.DCI — Icon · single shared icon set for the whole UIKit.
// 16×16 grid, 1.5px stroke, round caps, currentColor. Size & color are inherited
// from context (font-size / color) unless overridden via props.

/* ─────────────────────────────────────────────────────────────────────────────
   Icon path table — raw SVG inner markup keyed by name.
   An identical copy lives in Icon/index.html (showcase). Keep the two in sync.
   ───────────────────────────────────────────────────────────────────────────── */
const ICONS = {
  /* ── chevrons & arrows ── */
  'chevron-down': '<polyline points="4,6 8,10 12,6"/>',
  'chevron-up': '<polyline points="4,10 8,6 12,10"/>',
  'chevron-left': '<polyline points="10,4 6,8 10,12"/>',
  'chevron-right': '<polyline points="6,4 10,8 6,12"/>',
  'chevrons-left': '<polyline points="7.5,4 3.5,8 7.5,12"/><polyline points="12,4 8,8 12,12"/>',
  'chevrons-right': '<polyline points="8.5,4 12.5,8 8.5,12"/><polyline points="4,4 8,8 4,12"/>',
  'arrow-up': '<line x1="8" y1="13.5" x2="8" y2="3"/><polyline points="4,7 8,3 12,7"/>',
  'arrow-down': '<line x1="8" y1="2.5" x2="8" y2="13"/><polyline points="4,9 8,13 12,9"/>',
  'arrow-left': '<line x1="13.5" y1="8" x2="3" y2="8"/><polyline points="7,4 3,8 7,12"/>',
  'arrow-right': '<line x1="2.5" y1="8" x2="13" y2="8"/><polyline points="9,4 13,8 9,12"/>',
  'arrow-up-right': '<line x1="4" y1="12" x2="12" y2="4"/><polyline points="5.5,4 12,4 12,10.5"/>',
  external:
    '<path d="M8.5 3H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7.5"/><polyline points="9.5,2.5 13.5,2.5 13.5,6.5"/><line x1="13.5" y1="2.5" x2="7.5" y2="8.5"/>',
  menu: '<line x1="2.5" y1="4.5" x2="13.5" y2="4.5"/><line x1="2.5" y1="8" x2="13.5" y2="8"/><line x1="2.5" y1="11.5" x2="13.5" y2="11.5"/>',
  more: '<circle cx="3.5" cy="8" r="1.1" fill="currentColor" stroke="none"/><circle cx="8" cy="8" r="1.1" fill="currentColor" stroke="none"/><circle cx="12.5" cy="8" r="1.1" fill="currentColor" stroke="none"/>',
  'more-vertical':
    '<circle cx="8" cy="3.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="8" cy="8" r="1.1" fill="currentColor" stroke="none"/><circle cx="8" cy="12.5" r="1.1" fill="currentColor" stroke="none"/>',

  /* ── core actions ── */
  check: '<polyline points="3.5,8.5 6.5,11.5 12.5,4.5"/>',
  close: '<line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/>',
  plus: '<line x1="8" y1="3" x2="8" y2="13"/><line x1="3" y1="8" x2="13" y2="8"/>',
  minus: '<line x1="3" y1="8" x2="13" y2="8"/>',
  'check-circle': '<circle cx="8" cy="8" r="6"/><polyline points="5.3,8.2 7,10 10.7,5.8"/>',
  'x-circle':
    '<circle cx="8" cy="8" r="6"/><line x1="5.7" y1="5.7" x2="10.3" y2="10.3"/><line x1="10.3" y1="5.7" x2="5.7" y2="10.3"/>',
  'plus-circle':
    '<circle cx="8" cy="8" r="6"/><line x1="8" y1="5.3" x2="8" y2="10.7"/><line x1="5.3" y1="8" x2="10.7" y2="8"/>',
  'minus-circle': '<circle cx="8" cy="8" r="6"/><line x1="5.3" y1="8" x2="10.7" y2="8"/>',

  /* ── status (Badge family) ── */
  success: '<circle cx="8" cy="8" r="6"/><polyline points="5.3,8.2 7,10 10.7,5.8"/>',
  warning:
    '<path d="M8 2.2 14.3 13.2a.6.6 0 0 1-.52.9H2.22a.6.6 0 0 1-.52-.9Z"/><line x1="8" y1="6.4" x2="8" y2="9.6"/><circle cx="8" cy="11.6" r=".55" fill="currentColor" stroke="none"/>',
  error:
    '<circle cx="8" cy="8" r="6"/><line x1="5.7" y1="5.7" x2="10.3" y2="10.3"/><line x1="10.3" y1="5.7" x2="5.7" y2="10.3"/>',
  info: '<circle cx="8" cy="8" r="6"/><line x1="8" y1="7.4" x2="8" y2="11"/><circle cx="8" cy="5" r=".55" fill="currentColor" stroke="none"/>',
  help: '<circle cx="8" cy="8" r="6"/><path d="M6.2 6.3a1.85 1.85 0 0 1 3.6.6c0 1.25-1.8 1.55-1.8 2.7"/><circle cx="8" cy="11.5" r=".55" fill="currentColor" stroke="none"/>',

  /* ── find / filter / sync ── */
  search: '<circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14.5" y2="14.5"/>',
  filter: '<path d="M2.5 4h11l-4.2 5v3.8l-2.6-1.3V9z"/>',
  sliders:
    '<line x1="2.5" y1="5" x2="13.5" y2="5"/><line x1="2.5" y1="11" x2="13.5" y2="11"/><circle cx="6" cy="5" r="1.8" fill="var(--bg,#0D1117)"/><circle cx="10.5" cy="11" r="1.8" fill="var(--bg,#0D1117)"/>',
  refresh:
    '<path d="M2.7 8a5.3 5.3 0 0 1 9-3.8l1.6 1.5"/><polyline points="13.3,2.3 13.3,5.7 9.9,5.7"/><path d="M13.3 8a5.3 5.3 0 0 1-9 3.8l-1.6-1.5"/><polyline points="2.7,13.7 2.7,10.3 6.1,10.3"/>',
  sync: '<path d="M3.5 6.5A5 5 0 0 1 12.8 6"/><polyline points="12.5,2.6 13,6 9.6,6.4"/><path d="M12.5 9.5A5 5 0 0 1 3.2 10"/><polyline points="3.5,13.4 3,10 6.4,9.6"/>',
  undo: '<polyline points="5.5,4 2.5,7 5.5,10"/><path d="M2.5 7h6.5a3.5 3.5 0 0 1 0 7H6"/>',
  redo: '<polyline points="10.5,4 13.5,7 10.5,10"/><path d="M13.5 7H7a3.5 3.5 0 0 0 0 7h3"/>',

  /* ── edit / file ops ── */
  trash:
    '<polyline points="3,4.5 13,4.5"/><path d="M5.5 4.5V3.2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V4.5"/><path d="M4.3 4.5 5 13a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1l.7-8.5"/>',
  edit: '<path d="M11 2.5 13.5 5 6 12.5 3 13.5 4 10.5Z"/><line x1="9.5" y1="4" x2="12" y2="6.5"/>',
  copy: '<rect x="5.5" y="5.5" width="8" height="8" rx="1.2"/><path d="M3.5 10.5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>',
  save: '<path d="M3 2.5h8L13.5 5v8.5a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z"/><path d="M5 2.5v3h5v-3"/><rect x="5" y="8.5" width="6" height="4"/>',
  download:
    '<line x1="8" y1="2.5" x2="8" y2="10"/><polyline points="5,7 8,10 11,7"/><path d="M3 11.5v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1"/>',
  upload:
    '<line x1="8" y1="10.5" x2="8" y2="3"/><polyline points="5,6 8,3 11,6"/><path d="M3 11.5v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1"/>',
  share:
    '<circle cx="12" cy="4" r="2"/><circle cx="4" cy="8" r="2"/><circle cx="12" cy="12" r="2"/><line x1="5.7" y1="7" x2="10.3" y2="5"/><line x1="5.7" y1="9" x2="10.3" y2="11"/>',
  link: '<path d="M6.8 9.2a2.6 2.6 0 0 0 3.7 0l2.1-2.1a2.6 2.6 0 0 0-3.7-3.7l-1 1"/><path d="M9.2 6.8a2.6 2.6 0 0 0-3.7 0L3.4 8.9a2.6 2.6 0 0 0 3.7 3.7l1-1"/>',
  clipboard:
    '<rect x="3.5" y="3" width="9" height="11" rx="1.2"/><rect x="6" y="1.8" width="4" height="2.4" rx="0.7"/>',
  folder:
    '<path d="M2.5 4.5a1 1 0 0 1 1-1h2.6l1.2 1.4h4.7a1 1 0 0 1 1 1v6.1a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1Z"/>',
  file: '<path d="M4 2.5h5L12.5 6v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z"/><polyline points="9,2.5 9,6 12.5,6"/>',
  'file-text':
    '<path d="M4 2.5h5L12.5 6v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z"/><polyline points="9,2.5 9,6 12.5,6"/><line x1="5.5" y1="8.5" x2="10" y2="8.5"/><line x1="5.5" y1="11" x2="10" y2="11"/>',

  /* ── visibility ── */
  eye: '<path d="M1.5 8S3.5 3.5 8 3.5 14.5 8 14.5 8 12.5 12.5 8 12.5 1.5 8 1.5 8Z"/><circle cx="8" cy="8" r="2"/>',
  'eye-off':
    '<path d="M3 3l10 10"/><path d="M6.5 6.6A2 2 0 0 0 8 10a2 2 0 0 0 1.4-.6"/><path d="M4.2 4.7C2.6 5.8 1.5 8 1.5 8s2 4.5 6.5 4.5c1 0 1.9-.2 2.7-.6"/><path d="M7 3.6A6 6 0 0 1 8 3.5C12.5 3.5 14.5 8 14.5 8a12 12 0 0 1-1.7 2.3"/>',

  /* ── alerts / security ── */
  bell: '<path d="M8 2a4 4 0 0 1 4 4c0 3 1.2 4 1.2 4H2.8S4 9 4 6a4 4 0 0 1 4-4z"/><path d="M6.4 12.5a1.7 1.7 0 0 0 3.2 0"/>',
  'bell-off':
    '<path d="M5 4.2A4 4 0 0 1 12 6c0 2.2.7 3.4 1 3.8M4.2 6.7C4.1 8.7 3 10 3 10h7.5"/><path d="M6.4 12.5a1.7 1.7 0 0 0 3.2 0"/><line x1="2.5" y1="2.5" x2="13.5" y2="13.5"/>',
  lock: '<rect x="3.5" y="7" width="9" height="6.5" rx="1.2"/><path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7"/>',
  unlock:
    '<rect x="3.5" y="7" width="9" height="6.5" rx="1.2"/><path d="M5.5 7V5.2a2.5 2.5 0 0 1 4.8-.9"/>',
  shield: '<path d="M8 1.7 13 3.5v4.2c0 3.3-2.3 5.6-5 6.6-2.7-1-5-3.3-5-6.6V3.5Z"/>',
  'shield-check':
    '<path d="M8 1.7 13 3.5v4.2c0 3.3-2.3 5.6-5 6.6-2.7-1-5-3.3-5-6.6V3.5Z"/><polyline points="5.7,7.8 7.3,9.4 10.4,5.9"/>',
  key: '<circle cx="5.5" cy="10.5" r="2.6"/><line x1="7.4" y1="8.6" x2="13" y2="3"/><line x1="11" y1="5" x2="12.6" y2="6.6"/><line x1="9.4" y1="6.6" x2="11" y2="8.2"/>',
  zap: '<polygon points="8.5,1.8 3.5,9 7.5,9 7,14.2 12.5,7 8.5,7"/>',
  activity: '<polyline points="1.5,8 5,8 7,3 9.5,13 11.5,8 14.5,8"/>',

  /* ── domain ── */
  settings:
    '<circle cx="8" cy="8" r="2.3"/><path d="M12.6 9.5a1 1 0 0 0 .2 1.1l.05.05a1.2 1.2 0 1 1-1.7 1.7l-.05-.05a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9v.15a1.2 1.2 0 1 1-2.4 0v-.08a1 1 0 0 0-.66-.92 1 1 0 0 0-1.1.2l-.05.05a1.2 1.2 0 1 1-1.7-1.7l.05-.05a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6h-.15a1.2 1.2 0 1 1 0-2.4h.08a1 1 0 0 0 .92-.66 1 1 0 0 0-.2-1.1l-.05-.05a1.2 1.2 0 1 1 1.7-1.7l.05.05a1 1 0 0 0 1.1.2H7a1 1 0 0 0 .6-.9v-.15a1.2 1.2 0 1 1 2.4 0v.08a1 1 0 0 0 .6.92 1 1 0 0 0 1.1-.2l.05-.05a1.2 1.2 0 1 1 1.7 1.7l-.05.05a1 1 0 0 0-.2 1.1V7a1 1 0 0 0 .9.6h.15a1.2 1.2 0 1 1 0 2.4h-.08a1 1 0 0 0-.92.6Z"/>',
  user: '<circle cx="8" cy="5.5" r="2.8"/><path d="M2.5 14c0-3 2.4-4.8 5.5-4.8s5.5 1.8 5.5 4.8"/>',
  users:
    '<circle cx="6" cy="5.5" r="2.4"/><path d="M1.5 13.5c0-2.6 2-4.2 4.5-4.2s4.5 1.6 4.5 4.2"/><path d="M11 3.4a2.4 2.4 0 0 1 0 4.6M14.5 13.5c0-2-1.1-3.4-2.8-4"/>',
  'user-plus':
    '<circle cx="6.5" cy="5.5" r="2.8"/><path d="M1.5 14c0-3 2.2-4.8 5-4.8 1 0 1.9.2 2.6.6"/><line x1="12.5" y1="9.5" x2="12.5" y2="13.5"/><line x1="10.5" y1="11.5" x2="14.5" y2="11.5"/>',
  calendar:
    '<rect x="2.5" y="3.5" width="11" height="10" rx="1.2"/><line x1="2.5" y1="6.5" x2="13.5" y2="6.5"/><line x1="5.5" y1="2" x2="5.5" y2="4.5"/><line x1="10.5" y1="2" x2="10.5" y2="4.5"/>',
  clock: '<circle cx="8" cy="8" r="6"/><polyline points="8,4.5 8,8 10.5,9.5"/>',
  history:
    '<path d="M2.7 8a5.3 5.3 0 1 0 1.6-3.8"/><polyline points="2.4,2.5 2.4,5.7 5.6,5.7"/><polyline points="8,5.2 8,8 10.4,9.4"/>',
  server:
    '<rect x="2.5" y="3" width="11" height="4.2" rx="1"/><rect x="2.5" y="8.8" width="11" height="4.2" rx="1"/><line x1="4.5" y1="5.1" x2="4.55" y2="5.1"/><line x1="4.5" y1="10.9" x2="4.55" y2="10.9"/>',
  database:
    '<ellipse cx="8" cy="4" rx="5" ry="2"/><path d="M3 4v8c0 1.1 2.2 2 5 2s5-.9 5-2V4"/><path d="M3 8c0 1.1 2.2 2 5 2s5-.9 5-2"/>',
  cloud: '<path d="M4.5 12.5a3 3 0 0 1-.3-6A4 4 0 0 1 12 7a2.8 2.8 0 0 1-.3 5.5Z"/>',
  cpu: '<rect x="4.5" y="4.5" width="7" height="7" rx="1"/><rect x="6.7" y="6.7" width="2.6" height="2.6"/><line x1="6.5" y1="2.5" x2="6.5" y2="4.5"/><line x1="9.5" y1="2.5" x2="9.5" y2="4.5"/><line x1="6.5" y1="11.5" x2="6.5" y2="13.5"/><line x1="9.5" y1="11.5" x2="9.5" y2="13.5"/><line x1="2.5" y1="6.5" x2="4.5" y2="6.5"/><line x1="2.5" y1="9.5" x2="4.5" y2="9.5"/><line x1="11.5" y1="6.5" x2="13.5" y2="6.5"/><line x1="11.5" y1="9.5" x2="13.5" y2="9.5"/>',
  globe:
    '<circle cx="8" cy="8" r="6"/><line x1="2" y1="8" x2="14" y2="8"/><path d="M8 2c1.8 1.6 2.8 3.8 2.8 6S9.8 12.4 8 14c-1.8-1.6-2.8-3.8-2.8-6S6.2 3.6 8 2Z"/>',
  wifi: '<path d="M2 6.2a9 9 0 0 1 12 0"/><path d="M4.2 8.6a6 6 0 0 1 7.6 0"/><path d="M6.4 11a3 3 0 0 1 3.2 0"/><circle cx="8" cy="13" r=".7" fill="currentColor" stroke="none"/>',
  terminal:
    '<rect x="2.5" y="3" width="11" height="10" rx="1.2"/><polyline points="5,7 7,8.5 5,10"/><line x1="8.5" y1="10.5" x2="11" y2="10.5"/>',
  code: '<polyline points="6,5 2.5,8 6,11"/><polyline points="10,5 13.5,8 10,11"/>',
  'git-branch':
    '<line x1="4.5" y1="3" x2="4.5" y2="13"/><circle cx="4.5" cy="3" r="1.7"/><circle cx="4.5" cy="13" r="1.7"/><circle cx="11.5" cy="5" r="1.7"/><path d="M11.5 6.7v.8a3 3 0 0 1-3 3H4.5"/>',
  layers:
    '<polygon points="8,2 14,5 8,8 2,5"/><polyline points="2,8 8,11 14,8"/><polyline points="2,11 8,14 14,11"/>',
  grid: '<rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1"/><rect x="9" y="2.5" width="4.5" height="4.5" rx="1"/><rect x="2.5" y="9" width="4.5" height="4.5" rx="1"/><rect x="9" y="9" width="4.5" height="4.5" rx="1"/>',
  list: '<line x1="5.5" y1="4" x2="13.5" y2="4"/><line x1="5.5" y1="8" x2="13.5" y2="8"/><line x1="5.5" y1="12" x2="13.5" y2="12"/><circle cx="2.8" cy="4" r=".8" fill="currentColor" stroke="none"/><circle cx="2.8" cy="8" r=".8" fill="currentColor" stroke="none"/><circle cx="2.8" cy="12" r=".8" fill="currentColor" stroke="none"/>',
  tag: '<path d="M2.6 7.4 7.4 2.6a1 1 0 0 1 .7-.3h4.1a1 1 0 0 1 1 1V7.4a1 1 0 0 1-.3.7l-4.8 4.8a1 1 0 0 1-1.4 0L2.6 8.8a1 1 0 0 1 0-1.4Z"/><circle cx="10.2" cy="5.8" r=".9" fill="currentColor" stroke="none"/>',
  bookmark: '<path d="M4 2.5h8a.5.5 0 0 1 .5.5v10.5L8 11l-4.5 2.5V3a.5.5 0 0 1 .5-.5Z"/>',
  star: '<polygon points="8,2 9.85,5.75 14,6.35 11,9.25 11.7,13.35 8,11.4 4.3,13.35 5,9.25 2,6.35 6.15,5.75"/>',
  pin: '<path d="M8 14s4.5-4 4.5-7.5a4.5 4.5 0 0 0-9 0C3.5 10 8 14 8 14Z"/><circle cx="8" cy="6.5" r="1.7"/>',
  mail: '<rect x="2" y="3.5" width="12" height="9" rx="1.2"/><polyline points="2.5,4.5 8,8.5 13.5,4.5"/>',
  message:
    '<path d="M2.5 4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H6l-3 2.5V11H3.5a1 1 0 0 1-1-1Z"/>',

  /* ── theme / power ── */
  sun: '<circle cx="8" cy="8" r="3"/><path d="M8 1v1.6M8 13.4V15M15 8h-1.6M2.6 8H1M12.95 3.05l-1.13 1.13M4.18 11.82l-1.13 1.13M12.95 12.95l-1.13-1.13M4.18 4.18 3.05 3.05"/>',
  moon: '<path d="M13 9.2A5.5 5.5 0 0 1 6.8 3 5.5 5.5 0 1 0 13 9.2Z"/>',
  power: '<line x1="8" y1="2" x2="8" y2="8"/><path d="M5 4.2a5 5 0 1 0 6 0"/>',
  'log-out':
    '<path d="M6 13.5H3.5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1H6"/><polyline points="10,11 13.5,8 10,5"/><line x1="13.5" y1="8" x2="6" y2="8"/>',
  'log-in':
    '<path d="M10 2.5h2.5a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10"/><polyline points="6,11 9.5,8 6,5"/><line x1="9.5" y1="8" x2="2" y2="8"/>',
};

/* ─────────────────────────────────────────────────────────────────────────────
   Icon — public export
   ───────────────────────────────────────────────────────────────────────────── */
export function Icon({
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
  return (
    <svg
      className={('iskra-icon ' + className).trim()}
      width={px}
      height={px}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title || undefined}
      style={{ display: 'inline-block', flexShrink: 0, verticalAlign: 'middle', ...style }}
      dangerouslySetInnerHTML={{ __html: (title ? `<title>${title}</title>` : '') + inner }}
      {...rest}
    />
  );
}

/** All registered icon names — handy for tooling / showcases. */
export const ICON_NAMES = Object.keys(ICONS);
