# Основы дизайн-системы Искра.UIKit

Документ описывает продуктовый контекст, правила контента и визуальные принципы дизайн-системы **Искра**. Техническая реализация токенов и компонентов — в пакетах `@iskra-ui/*` (см. [PACKAGES.md](./PACKAGES.md)).

---

## Визуальные основы

**Общее ощущение — Hard-Shell Minimal:** интерфейс как надёжный промышленный прибор с удобством современного SaaS. Информационно плотный, строго иерархичный, тихий, пока не требуется внимание.

### Цвет

Dark-first. Фон — **Anthracite Deep `#0D1117`**; карточки/панели/модалки — **Elevated Graphite `#161B22`**; разделители — hairline `**#30363D**`. Текст: `#F0F6FC` основной / `#8B949E` вторичный. Ровно **один акцент — Cyber Mint `#00FFC2`** — только как сигнал: границы, индикаторы, focus ring, активное состояние.

**Критическое правило:** mint не несёт текст на тёмном (контраст ≈1.6:1, WCAG fail) — для акцентного _текста_ используйте AA-безопасный `#00AA85` (`--accent-safe` в токенах).

Статусные цвета — только для состояния: ok mint, warn `#F97316`, error `#F85149`, inactive `#6E7681`, info `#58A6FF` (минимально). Две светлые темы: **cold** off-white (`#EEF2F7`) и **warm** sand (`#F5F0E8`) — те же имена токенов, другие значения. Темы подключаются классами `theme-cold` / `theme-warm` на корневом элементе.

Токены определены в `@iskra-ui/tokens` и применяются через `@iskra-ui/styles`.

### Типографика

Два семейства, **self-hosted** (без CDN), поставляются пакетом `@iskra-ui/styles`:

- **Inter** — весь UI и display (H1–H3: 24/20/18px, weight 600, `-.02em`; UI 14px 400–500).
- **JetBrains Mono** — машинные данные и mono-метки (13px).

Корневой `font-size` намеренно **14px** (не 16): продукт работает с большими таблицами и логами. Line-height: 1.4 для UI, 1.2 для заголовков.

### Сетка и отступы

Строгая **8px-сетка** (4px — для микродеталей). Padding карточек 12–24px, модалок 24px, кнопок по горизонтали 16px, высота контролов 32/36px.

### Фоны

Плоские заливки — без фотографий и иллюстраций в продукте. В презентационном deck допустим едва заметный radial mint glow; в app shell — без текстур и градиентов.

### Углы

Фиксированный **radius 4px** на всём (2px для мелких chips/tags). Никогда pill/circle, кроме status dots и pulse ring.

### Границы и elevation

**Теней нет.** Глубина — hairline `#30363D` и шаг цвета поверхности (`#0D1117` → `#161B22` → `#1D2530`). Главное визуальное правило системы.

### Карточки

Заливка `#161B22`, border 1px `#30363D`, radius 4px. Device tile: status dot + имя, IP mono, sparkline 24–32px, серые теги. Hover — только смена border на mint и появление `>` / SSH.

### Состояния взаимодействия

- **Hover** — тонкий: 10–14% accent wash на кнопках; border+text grey→mint на вторичных; border mint на карточках. Без lift, shadow, scale.
- **Press / active** — только смена цвета (`#00CC9A`), без transform.
- **Focus** — 1px mint ring (`box-shadow: 0 0 0 1px #00FFC2`), без blur, на каждом интерактиве (a11y).

### Движение

Минимальный и функциональный: `~150ms` ease на color/border. Единственная «живая» анимация — **Live-Pulse** (дышащая mint-точка) только на Device Detail, не более одного пульсирующего элемента на экране. Анимации Бита — 2–3 кадра. Без bounce, parallax, декоративных циклов.

### Прозрачность и размытие

Два сценария: (1) **Static Blur / ghost data** — при таймауте последние данные размыты (`blur(4px) grayscale(50%); opacity:.7`) со спиннером «Connection lost. Retrying…»; (2) accent washes (`rgba(0,170,133,.08–.14)`) за активными chips/кнопками. Без frosted-glass декора.

### Макет

Top bar 40px. Сетка устройств `repeat(auto-fill, minmax(280px,1fr))`, карточки 280–350px; virtual scroll обязателен после 1000 устройств. Device Detail — три колонки 4-4-4 (Identity / Reconciler / Control). Toasts — top-right со status stripe слева. KVM/Terminal — bottom drawer, не перекрывает данные.

### Responsive / Compact

UI Kit поддерживает узкие экраны **composition-first**: примитивы `Drawer`, `Sheet`, `DataList` и responsive utilities (`useMediaQuery`) в `@iskra-ui/react` и `@iskra-ui/vue`. Shell — эталонная композиция в Storybook, не обязательный монолитный компонент.

**Breakpoint compact:** `< 768px` (`bp-md`). CSS отвечает за геометрию (отступы, touch targets 44px, toast position); JS — только за разные представления: `Table` ↔ `DataList`, `Modal` ↔ `Sheet`, inline `Sidebar` ↔ `Drawer`. `Table` не превращается в карточки автоматически.

---

## Иконография

**Линейные (outline) иконки, stroke 1.5px, 16px или 20px** — геометрия Feather Icons / Heroicons (outline). Статусные индикаторы — **filled** (solid dots/badges). Иконки монохромные, `currentColor`; при hover — mint.

В монорепозитории канонический набор — пакет `**@iskra-ui/icons`\*\*: 16×16, stroke 1.5px, framework-agnostic. React-компонент `Icon` из `@iskra-ui/react` использует этот набор.

**Функциональные Unicode-марки** (не декоративные): `⟳` (sync/reconcile), `⌕` (search), `⎘` (copy), `</>` (CLI), `→ ↔` (architecture flow).

**Эмодзи** в продукте нет.

### Маскот Бит

Пиксель-арт 32×32 (48×48 для empty/error), тело `#0D1117` или `#F0F6FC`, глаза/контур `#00FFC2`, 8 эмоций (neutral, sad, scared, sleepy, puzzled, guilty, surprised, playful). Только в некритичных зонах, всегда с поясняющим текстом.

### Бренд-логотип

Логотип объединяет **пиксель**, **8-лучевую искру** и **mint glow**. На тёмных поверхностях — glow; на светлых/малых размерах — плоский pixel star без glow. SVG-ассеты бренда поставляются отдельно от npm-пакетов; в Storybook и продуктовых приложениях используются согласованные варианты spark-mark.

---

## Дисциплина токенов в компонентах

Яркий mint `--accent` (`#00FFC2`) — для границ, focus ring, indicator dots. **Заливки** (primary button, checked checkbox, switch-on) — AA-безопасный `--accent-safe` (`#00AA85`).

Все цвета, отступы, radius и motion в компонентах — только через CSS-переменные токенов. Проверка: `pnpm lint:tokens` (`scripts/check-adherence.mjs`).

Размеры контролов в UI-kit: `**s` 28px · `m` 32px · `l` 36px\*\* (где применимо).

---

## См. также

- [README.md](../README.md) — обзор монорепозитория и быстрый старт
- [PACKAGES.md](./PACKAGES.md) — пакеты и API
- [CONTRIBUTING.md](../CONTRIBUTING.md) — разработка и релизы
- [LICENCE.md](../LICENCE.md) — лицензии
- Storybook (`pnpm storybook`) — живые примеры компонентов, витрина токенов (Foundations) и переключение тем
- [https://iskra-dctech.github.io/iskra.ui-kit/](https://iskra-dctech.github.io/iskra.ui-kit/)
