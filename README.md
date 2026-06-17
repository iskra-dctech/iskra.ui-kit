# ИСКРА.DCI — Design System

**Искра** (_Iskra_, "spark") **.DCI** — _Data Center Interface_ — is a vendor‑neutral
platform for managing data‑center infrastructure. It sits as a single control plane on top
of a heterogeneous fleet (multiple hardware vendors, each with its own API), turning
opaque, error‑prone direct management into an observable, auditable, **desired‑state** model.

The product is built around a reconciliation loop: the user declares a **Desired State**, the
platform observes the **Observed State**, and a **reconciler engine** surfaces and resolves the
**drift** between them — diffed the way a GitHub pull request is. Every change flows through
`API → owner services → reconciler → driver broker`, is gated by role + policy (deny‑by‑default),
and is written to an immutable audit log.

> Design ideology (from the brief): **технический минимализм** — technical minimalism,
> right angles, dark colors, a single accent hue, strictness and simplicity.

---

## Products / surfaces represented

| Surface | What it is | Status |
|---|---|---|
| **User WebUI** | The operator‑facing console: Dashboard (Fleet Intelligence), Inventory (grid/table), Device Detail (Command Center). The primary product. | Active |
| **Presentation / deck** | A 16:9 + A4 HTML deck template explaining the product. Dark slides with paper (light) data panels. | Provided |
| **Бит (Bit)** | Pixel‑art mascot used only in non‑critical states (loading, empty, error, onboarding). | Spec'd |

There is **one core product** (User WebUI) plus a **slide template**. The UI kit recreates the
User WebUI; sample slides recreate the deck.

---

## Sources given to build this system

These are the inputs this design system was reverse‑engineered from. The reader may not have
access — they are recorded here for provenance.

- `design/nda-design-guide.md` — **Дизайн‑гайд v2.0** (the canonical spec: color, type, grid,
  components, system states, mascot, CLI‑first, a11y). NDA.
- `design/design-audit-2026-04-21.md` — design‑system audit (scores + P0/P1 gaps).
- `design/iskra-light-themes.html` (also `uploads/iskra-light-themes.html`) — warm + cold light
  theme comparison with real components (topbar, pulse, device cards, badges, buttons, toasts).
- `design/presentation.html` — A4 print deck.
- `design/presentation16-9.html` — 16:9 deck (slide types: hero, contents, value table,
  boundaries, architecture flow, capability, runtime contract, journey timeline, operations,
  controls).

Referenced inside the guide but **not provided** (flagged for the user): `nda-design-guide-light.md`,
`frontend-architecture-principles-v1.md`, `ui-shell-visual-contract.md`, `theme.ts`.

---

## CONTENT FUNDAMENTALS

The product is bilingual **Russian‑first, English‑technical**. Russian is used for prose, labels
and human‑facing copy; English is reserved for technical nouns that are also CLI/API tokens —
`Force Sync`, `Drift`, `Reconciler`, `Desired State`, `root/admin/operator/viewer`, `Kernel Panic`.
The two never compete: a button reads **«⟳ Force Sync»**, a status reads **«Drift обнаружен»**.

**Tone.** Calm, precise, industrial. It speaks like infrastructure documentation, not marketing.
Sentences are declarative and short; the product never over‑promises (the guide explicitly forbids
"false promises" about availability). Errors are treated as **data, not failures** — every error is
copyable, traceable, and explained.

**Voice / person.** Mostly impersonal/system voice in prose ("Платформа не выполняет изменения вне
модели желаемого состояния"). Direct address ("you" / «вы») appears only in guidance and the
mascot's helper text ("Проверьте VPN или статус сервиса"). The mascot Бит speaks in the **first
person, lightly** and only in non‑critical moments.

**Casing.** Mono UPPERCASE for eyebrows/labels (`FLEET IN SYNC`, `INVENTORY`), letter‑spaced
`.12em`. Sentence case for body and headings (Russian sentence case). Technical tokens keep their
canonical casing (`leaf-07.msk`, `10.0.2.7`).

**Numbers & data.** Always monospaced (JetBrains Mono): IPs, IDs, percentages, latency (`142 ms`),
CIDR ranges (`192.168.1.0/24`). Density is a feature — copy is terse so data dominates.

**Emoji.** None in the product UI. The only glyphic flourishes are functional Unicode/icon marks
(`⟳` sync, `⌕` search, `⎘` copy, `</>` CLI). The mascot is pixel art, not an emoji.

**Sample copy.**
- Empty state: «Ни одного устройства. Нажмите "Добавить" или импортируйте из NetBox.»
- Connection lost overlay: «Connection lost. Retrying...»
- Backoff exhausted: «Кажется, брокер драйверов ушёл на перерыв. Проверьте VPN или статус сервиса.»
- Toast: title «Drift обнаружен» / body «leaf-07.msk расходится с Desired State».
- Mockup rule of thumb: always show **one row highlighted orange (Drift)** — it explains the whole
  product without words.

---

## VISUAL FOUNDATIONS

**Overall feeling — "Hard‑Shell Minimal":** the interface should feel like a rugged industrial
instrument that operates with the ease of a modern SaaS. Information‑dense, strictly hierarchical,
quiet until something needs attention.

**Color.** Dark‑first. Global background is **Anthracite Deep `#0D1117`**; cards/panels/modals are
**Elevated Graphite `#161B22`**; everything is separated by a single **`#30363D`** hairline. Text is
`#F0F6FC` primary / `#8B949E` secondary. Exactly **one accent hue — Cyber Mint `#00FFC2`** — used
*only* as a signal: borders, indicators, focus rings, active state. **Critical rule:** mint never
carries text on dark (contrast ≈1.6:1 fails WCAG) — for accent *text* use the AA‑safe `#00AA85`.
Status is the only other color, and only ever for state: ok mint, warn `#F97316`, error `#F85149`,
inactive `#6E7681`, info `#58A6FF` (used minimally). Two secondary light themes exist — **cold**
off‑white (`#EEF2F7`) and **warm** sand (`#F5F0E8`) — each redefining the same token names.

**Type.** Two families only, **self‑hosted** (variable TTFs in `fonts/`, wired via `@font-face` in
`colors_and_type.css` — no CDN dependency). **Inter** for everything UI + display (H1–H3 at
24/20/18px, weight 600, tight `-.02em`; UI text 14px 400–500). **JetBrains Mono** for all machine
data and mono labels (13px). Root font‑size is an intentional **14px** (not 16) — the product handles huge tables and
logs, and 16px would add noise and scrolling. Line‑height 1.4 for UI, 1.2 for headings.

**Spacing.** Strict **8px grid** (4px allowed for micro‑detail). Card padding 12–24px, modal padding
24px, button horizontal padding 16px, control height 32/36px.

**Backgrounds.** Flat solid fills — no imagery, no photography, no hand illustration in‑product.
The *deck* allows a very subtle single radial mint glow (`rgba(0,170,133,.08)`) top‑left on the dark
canvas, and inverts to **white "paper" panels** for data tables. No repeating textures, no gradients
inside the app shell.

**Corners.** Fixed **4px radius** on *everything* — buttons, cards, inputs, modals (2px for tiny
chips/tags). Right‑angled, strict; never pill‑shaped, never circular except status dots and the
pulse ring.

**Borders & elevation.** **No shadows anywhere.** Depth is communicated purely by the `#30363D`
hairline border and the small step in surface color (`#0D1117` → `#161B22` → `#1D2530`). This is the
single most defining visual rule of the system.

**Cards.** `#161B22` fill, 1px `#30363D` border, 4px radius, no shadow. Device tile = status dot +
name (top), IP in mono, a 24–32px sparkline, grey tags at the bottom. Hover only shifts the border
to mint and reveals `>` / SSH icons.

**Hover states.** Subtle. Buttons fill to a 10–14% accent wash and the contour animates; secondary
controls shift border+text from grey to mint; cards shift border to mint. No lift, no shadow, no
scale.

**Press / active.** Color change only (deeper accent `#00CC9A`) — never a shrink/scale transform.

**Focus.** Always a 1px **mint** ring (`box-shadow:0 0 0 1px #00FFC2`), never blurred, on every
interactive element — this doubles as the a11y focus indicator.

**Motion.** Minimal and functional. `~150ms` ease transitions on color/border. The only "alive"
animation is **Live‑Pulse** — a gentle breathing mint dot, allowed on the Device Detail page only,
and never more than one pulsing element on screen ("anti‑chaos" rule). Mascot animations are 2–3
frame pixel blinks/sways. No bounces, no parallax, no decorative loops.

**Transparency & blur.** Used for two specific jobs: (1) **Static Blur / "ghost data"** — on timeout,
the last‑known‑good data is frozen with `filter:blur(4px) grayscale(50%); opacity:.7` plus a "Connection
lost. Retrying…" spinner, so the user sees the ghost instead of emptiness; (2) accent washes
(`rgba(0,170,133,.08–.14)`) behind active chips/buttons. No frosted‑glass decoration.

**Imagery vibe.** There is essentially none — the product *is* its data. The only brand imagery is
the pixel‑art spark mark and the Бит mascot, both cool/mint on anthracite.

**Layout rules.** Top bar fixed at 40px. Adaptive device grid `repeat(auto-fill, minmax(280px,1fr))`,
cards 280–350px wide; virtual scrolling mandatory past 1000 devices. Device Detail is a fixed 4‑4‑4
three‑column grid (Identity / Reconciler / Control). Toasts pin top‑right with a left status stripe.
KVM/Terminal opens in a bottom drawer that never covers the data.

---

## ICONOGRAPHY

The brand uses **linear (outline) icons, 1.5px stroke, sized 16px or 20px**, drawn from
**Feather Icons / Heroicons (outline)** — the two share the geometric, even‑stroke look the system
wants. Status indicators are the one exception: they are **filled** (solid dots/badges) so signal
reads instantly. Icons are monochrome and inherit text color; on hover an icon shifts to mint.

This repo links **Feather Icons from CDN** (`feather-icons`) as the canonical set — it matches the
guide's 1.5px outline spec exactly. Heroicons‑outline is an acceptable substitute where a glyph is
missing. **Flag:** the source codebase did not ship an icon font/sprite, so icons are pulled from the
Feather CDN rather than copied from product source — swap in the real sprite if one exists.

**Functional Unicode marks** appear inline as lightweight affordances: `⟳` (sync/reconcile), `⌕`
(search), `⎘` (copy), `</>` (CLI / curl), `→ ↔` (architecture flow). These are intentional, not
decorative.

**No emoji** anywhere in the product. The mascot **Бит** is the only illustrative asset — pixel art
at 32×32 (48×48 for empty/error), body `#0D1117` or `#F0F6FC`, eyes/contour `#00FFC2`, with 8 emotional
states (neutral, sad, scared, sleepy, puzzled, guilty, surprised, playful). Bit appears **only** in
non‑critical zones and is always paired with explanatory text (never the sole carrier of meaning).

Brand assets in `assets/`:
- `logo-spark-glow.svg` — **primary** mark: pixel 8‑point spark with mint glow/bloom (for dark surfaces).
- `logo-spark-flat-dark.svg` / `logo-spark-flat-light.svg` — flat (no‑glow) pixel spark for small sizes / either theme.
- `logo-spark-burst-dark.svg` / `logo-spark-burst-light.svg` — thin‑ray "burst" exploration variant.
- `logo-spark.svg` — original simple pixel spark (favicon / legacy).
- `bit-mascot.svg` — Бит, neutral state (draft).

The logo unifies the brand's three threads: the **pixel** motif (shared with Бит), an **8‑point
spark**, and a **mint glow**. A bright white→mint core blooms outward; pixel arms taper along the
cardinals + diagonals with detached "spark" pixels at the tips. On light/small contexts it degrades
to a flat ink‑arm + mint‑core pixel star (no glow). Fonts are self‑hosted in `fonts/`.

---

## DOCUMENTS (A4 print format)

The brand ships a **canonical A4 document template** (`documents/Document Template.html`) used for
introductory/reference docs. It is the print counterpart of the product UI and reuses the same
language on paper:

- **Paper pages** (`210×297mm`, `#FFFFFF`) floated on a light canvas (`#D9DDE3`), each with a fixed
  **dark header band** (`#161B22 → #0F141B` gradient, 9mm) carrying the `ИСКРА.DCI` wordmark and a
  mono `СТР / ТЕМА` meta block top-right.
- **Accent shifts to the AA-safe `#00AA85`** on white (never `#00FFC2`), keeping text legible in print.
- **Section headers** = a mono numeric index chip (`01`, `02`…) in graphite + mint, beside an Inter
  H2. **Hero** block is the one dark, glowing panel per doc (subtle mint radial).
- **Three card flavours:** light `.card` (`#F7F9FB`), `.dark-card` (graphite, inverted text),
  `.signal-card` (faint mint top-gradient). **Tables** have dark graphite header rows + zebra body.
  **Architecture** uses the same boxed nodes + mint `→ ↔` arrows as the deck.
- Same 4px radius, 1px hairlines, JetBrains Mono for all codes/meta, Inter for prose. Print CSS
  (`@page A4`, `print-color-adjust: exact`) tightens spacing so it exports clean to PDF.

Sizes are in **pt** (print), not px — `9.4pt` body, `15pt` H2, `26pt` hero, `7.8pt` mono labels.

---

## React Components

Compiled into `_ds_bundle.js`. Access via `const { X } = window.DCIDesignSystem_2e8fb0`.
Every component **self‑injects its scoped CSS** on first render (no external stylesheet
required) and reads design‑token CSS variables, so all of them work in the **dark** (default)
and **`.theme-cold`** themes. Wrap a subtree in `class="theme-cold"` to switch.

### UIKit — core library

A snack‑uikit‑style component set: small, prop‑driven APIs; text passed in via props
(no hard‑coded language); three control sizes **`s` 28px · `m` 32px · `l` 36px** where height
applies. **Token discipline:** bright mint `--accent #00FFC2` is reserved for borders / focus
rings / indicator dots; **fills** (primary button, checked box, switch‑on) use the AA‑safe
`--accent-safe #00AA85`.

| Component | File | Exports | Gist |
|---|---|---|---|
| **Icon** | `components/Icon/` | `Icon`, `ICON_NAMES` | 32‑glyph set, 16×16 / 1.5px stroke, `currentColor`, `size` defaults to `1em`. |
| **Button** | `components/Button/` | `Button` | `variant` primary·outline·secondary·ghost·destructive; `iconBefore/After`, `iconOnly`, `loading`, `fullWidth`. |
| **TextField** | `components/TextField/` | `TextField` | Label, hint, `error`, `iconBefore`, `clearable`; controlled or uncontrolled. |
| **Checkbox** | `components/Checkbox/` | `Checkbox` | `checked` / `indeterminate` / `disabled`, `label` + `description`, sizes `s·m`. |
| **Radio** | `components/Radio/` | `Radio`, `RadioGroup` | `RadioGroup` takes `options[]` or `<Radio>` children; `orientation`, controlled/uncontrolled. |
| **Switch** | `components/Switch/` | `Switch` | `role="switch"` toggle, `label` + `description`, sizes `s·m`. |
| **Badge** | `components/Badge/` | `Badge`, `Tag` | `Badge` status pill (success·warning·error·info·accent·neutral, `dot`/`icon`); `Tag` mono label, optional `onRemove` chip. |

**Pattern for new components:** create `components/<Name>/` with `<Name>.jsx` (real component,
`export function`, self‑injecting scoped CSS prefixed `.ik-…`), `<Name>.d.ts` (typed props +
JSDoc), and `index.html` (an `@dsCard` showcase). The compiler exposes every capitalized export
on `window.DCIDesignSystem_2e8fb0`.

**Usage:**
```tsx
const { Button, TextField, Checkbox, RadioGroup, Switch, Badge, Tag, Icon } =
  window.DCIDesignSystem_2e8fb0;

<TextField label="Хост" iconBefore={<Icon name="search" />} clearable />
<Button variant="outline" iconBefore={<Icon name="refresh" />}>Force Sync</Button>
<Badge variant="warning" dot>Drift</Badge>
```

### `Sidebar`

**File:** `components/Sidebar/Sidebar.jsx` + `Sidebar.d.ts`
**dsCard:** `components/Sidebar/index.html`

Shared navigation sidebar for **operator** and **admin** frontends.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `collapsed` | `boolean` | `false` | Icon-only narrow mode (52 px) |
| `onToggle` | `() => void` | — | Flip `collapsed` in host state |
| `activeItem` | `string` | `'overview'` | Highlights item + sets `aria-current` |
| `onNavigate` | `(id: string) => void` | — | Called on item click |
| `variant` | `'operator' \| 'admin'` | `'operator'` | Admin adds Пользователи / Аудит / Система |
| `theme` | `'' \| 'theme-cold' \| 'theme-warm'` | `''` | Dark by default |
| `badges` | `Record<string, number>` | `{}` | e.g. `{ alerts: 3 }` |
| `className` | `string` | `''` | Extra class on root `<aside>` |

**Nav item IDs** (use for `activeItem` / `badges`):
`overview`, `devices`, `topology`, `alerts`, `apikeys`, `log`, `settings`, `logout`
Admin-only: `users`, `audit`, `system`

**Usage:**
```tsx
const { Sidebar } = window.DCIDesignSystem_2e8fb0;
const [collapsed, setCollapsed] = React.useState(false);
const [page, setPage] = React.useState('overview');

<Sidebar
  collapsed={collapsed}
  onToggle={() => setCollapsed(c => !c)}
  activeItem={page}
  onNavigate={setPage}
  variant="operator"
  badges={{ alerts: 3 }}
/>
```

The component self-injects scoped CSS on first render — no external stylesheet required.
Tooltips appear in collapsed mode after the width transition settles (210 ms delay).

---

## File index (this folder)

| Path | What |
|---|---|
| `README.md` | This document — context, content + visual foundations, iconography, index. |
| `colors_and_type.css` | All design tokens: dark + cold + warm theme vars, type scale, semantic classes. |
| `SKILL.md` | Agent‑Skill manifest so this system can be used as a Claude Skill. |
| `assets/` | Logo glyphs (`logo-spark-glow`, flat + burst variants) + `bit-mascot.svg`. |
| `fonts/` | Self‑hosted variable fonts: `Inter-VariableFont_opsz_wght.ttf`, `JetBrainsMono_wght_.ttf`. |
| `documents/Document Template.html` | Canonical 6-page **A4 document** template (paper + dark header band). |
| `preview/` | Small HTML specimen cards that populate the Design System tab. |
| `components/Sidebar/` | Sidebar React component (`.jsx` + `.d.ts` + dsCard preview). |
| `components/Icon/` · `Button/` · `TextField/` · `Checkbox/` · `Radio/` · `Switch/` · `Badge/` | Core UIKit components (each `.jsx` + `.d.ts` + dsCard preview). |
| `ui_kits/user-webui/` | High‑fidelity recreation of the User WebUI (Dashboard, Inventory, Device Detail). |
| `slides/` | Sample deck slides (title, contents, value table, architecture, capability, timeline). |

**UI kits:** `ui_kits/user-webui/` — see its own `README.md`.
**Slides:** `slides/index.html`.
