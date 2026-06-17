# Пакеты `@iskra-ui/*`

Описание publishable-пакетов монорепозитория. Все пакеты в scope `@iskra-ui`, версионируются через [Changesets](../CONTRIBUTING.md#версионирование-и-релизы).

## Схема зависимостей

```mermaid
flowchart LR
  tokens["@iskra-ui/tokens"]
  styles["@iskra-ui/styles"]
  icons["@iskra-ui/icons"]
  core["@iskra-ui/core"]
  react["@iskra-ui/react"]
  vue["@iskra-ui/vue"]
  dciReact["@iskra-ui/dci-react"]

  tokens --> styles
  core --> react
  icons --> react
  core --> vue
  icons --> vue
  react --> dciReact
```

---

## `@iskra-ui/tokens`

**Назначение:** DTCG design tokens → CSS-переменные, JSON и типизированная TS-карта (Style Dictionary).

**Entry points**

| Импорт                          | Содержимое               |
| ------------------------------- | ------------------------ |
| `@iskra-ui/tokens`             | TS API (`dist/index.js`) |
| `@iskra-ui/tokens/tokens.css`  | Только CSS-переменные    |
| `@iskra-ui/tokens/tokens.json` | Плоский JSON токенов     |
| `@iskra-ui/tokens/src/*`       | Исходники DTCG JSON      |

**Исходники:** `packages/tokens/src/` — `primitives/`, `semantic/`, `themes/` (cold, warm), `brands/` (например `aurora.json`).

**Зависимости:** нет runtime-зависимостей.

**Сборка**

```bash
pnpm --filter @iskra-ui/tokens build
```

**Пример**

```ts
import tokens from '@iskra-ui/tokens/tokens.json';
```

Обычно токены потребляются через `@iskra-ui/styles`, а не напрямую.

---

## `@iskra-ui/styles`

**Назначение:** глобальные стили — токены, self-hosted шрифты (Inter, JetBrains Mono), reset, element classes.

**Entry points**

| Импорт                           | Содержимое                   |
| -------------------------------- | ---------------------------- |
| `@iskra-ui/styles/index.css`    | Полный бандл (рекомендуется) |
| `@iskra-ui/styles/tokens.css`   | Только переменные            |
| `@iskra-ui/styles/fonts.css`    | `@font-face`                 |
| `@iskra-ui/styles/reset.css`    | Reset                        |
| `@iskra-ui/styles/elements.css` | Базовые element-классы       |

**Зависимости:** `@iskra-ui/tokens`.

**Сборка**

```bash
pnpm --filter @iskra-ui/styles build
```

**Пример**

```ts
import '@iskra-ui/styles/index.css';
```

Подключайте **один раз** в entry приложения, до компонентных стилей.

---

## `@iskra-ui/icons`

**Назначение:** framework-agnostic набор outline-иконок 16×16, stroke 1.5px.

**Entry point:** `@iskra-ui/icons`

**Экспорты:** `icons`, `iconNames`, `iconSvg()`, тип `IconName`.

**Зависимости:** нет.

**Сборка**

```bash
pnpm --filter @iskra-ui/icons build
```

**Пример**

```ts
import { iconSvg, type IconName } from '@iskra-ui/icons';

const svg = iconSvg('search', { size: 16 });
```

В React/Vue предпочтительнее компонент `Icon` из UI-библиотеки.

---

## `@iskra-ui/core`

**Назначение:** headless-логика, общая для React и Vue — state machines, ARIA helpers, keyboard, focus trap.

**Entry point:** `@iskra-ui/core`

**Основные экспорты:** `createId`, `Keys`, `isActivationKey`, `createTabsIds`, `disclosureReducer`, `createFocusTrap`, `getFocusable`, …

**Зависимости:** нет runtime-зависимостей.

**Сборка и тесты**

```bash
pnpm --filter @iskra-ui/core build
pnpm --filter @iskra-ui/core test
```

Обычно импортируется косвенно через `@iskra-ui/react` / `@iskra-ui/vue`. Прямой импорт — для кастомных компонентов поверх той же логики.

---

## `@iskra-ui/react`

**Назначение:** React 18+ UI-библиотека в стиле Hard-Shell Minimal. Классы `ik-*` сохранены с legacy-бандла.

**Entry points**

| Импорт                        | Содержимое             |
| ----------------------------- | ---------------------- |
| `@iskra-ui/react`            | Компоненты и утилиты   |
| `@iskra-ui/react/styles.css` | Стили всех компонентов |

**Peer dependencies:** `react`, `react-dom` ≥18.

**Зависимости:** `@iskra-ui/core`, `@iskra-ui/icons`.

**Сборка и тесты**

```bash
pnpm --filter @iskra-ui/react build
pnpm --filter @iskra-ui/react test
```

### Быстрый старт (React)

```bash
pnpm add @iskra-ui/react @iskra-ui/styles
```

```tsx
import '@iskra-ui/styles/index.css';
import '@iskra-ui/react/styles.css';
import { Button, TextField, Badge, Icon } from '@iskra-ui/react';

export function Example() {
  return (
    <>
      <TextField label="Хост" iconBefore={<Icon name="search" />} clearable />
      <Button variant="outline" iconBefore={<Icon name="refresh" />}>
        Force Sync
      </Button>
      <Badge variant="warning" dot>
        Drift
      </Badge>
    </>
  );
}
```

### Компоненты по категориям

| Категория   | Компоненты                                                                                                                                            |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Foundations | `Icon`                                                                                                                                                |
| Primitives  | `Button`, `IconButton`, `TextField`, `Textarea`, `Checkbox`, `Radio`, `RadioGroup`, `Switch`, `Badge`, `Tag`, `Avatar`, `Card`, `Skeleton`, `Spinner` |
| Patterns    | `FormField`, `Alert`, `EmptyState`, `Modal`, `Tabs`, `Table`, `Toast`, `Sidebar`                                                                      |
| Utilities   | `cx`                                                                                                                                                  |

Детали props, варианты и a11y — в Storybook (`pnpm storybook`) и JSDoc на компонентах.

**Размеры контролов:** `s` (28px) · `m` (32px) · `l` (36px).

**Sidebar:** общая навигация для operator/admin frontends. Props: `collapsed`, `onToggle`, `activeItem`, `onNavigate`, `variant`, `theme`, `badges`. ID пунктов: `overview`, `devices`, `topology`, `alerts`, `apikeys`, `log`, `settings`, `logout`; admin-only: `users`, `audit`, `system`.

---

## `@iskra-ui/vue`

**Назначение:** Vue 3.4+ компоненты с API-паритетом с React над общим `@iskra-ui/core` и теми же `ik-*` классами.

**Entry points**

| Импорт                      | Содержимое                                |
| --------------------------- | ----------------------------------------- |
| `@iskra-ui/vue`            | Vue SFC-компоненты                        |
| `@iskra-ui/vue/styles.css` | Re-export стилей React (`ik-*` идентичны) |

**Peer dependencies:** `vue` ≥3.4.

**Зависимости:** `@iskra-ui/core`, `@iskra-ui/icons`.

**Сборка и тесты**

```bash
pnpm --filter @iskra-ui/vue build
pnpm --filter @iskra-ui/vue test
```

### Быстрый старт (Vue)

```bash
pnpm add @iskra-ui/vue @iskra-ui/styles
```

```vue
<script setup lang="ts">
import '@iskra-ui/styles/index.css';
import '@iskra-ui/vue/styles.css';
import { Button, TextField, Badge } from '@iskra-ui/vue';
</script>

<template>
  <TextField label="Хост" />
  <Button variant="outline">Force Sync</Button>
  <Badge variant="warning" dot>Drift</Badge>
</template>
```

### Текущий набор компонентов

`Icon`, `Button`, `Badge`, `Spinner`, `Switch`, `Alert`, `Card`, `CardHeader`, `CardBody`, `CardFooter`, `TextField`, `Tabs`.

Остальные компоненты из React-пакета добавляются по мере достижения паритета. Следите за changelog пакета.

---

## `@iskra-ui/dci-react`

**Назначение:** доменные React-компоненты продукта Искра.DCI, построенные на `@iskra-ui/react`.

**Entry points**

| Импорт                            | Содержимое           |
| --------------------------------- | -------------------- |
| `@iskra-ui/dci-react`            | Доменные компоненты  |
| `@iskra-ui/dci-react/styles.css` | Дополнительные стили |

**Peer dependencies:** `react`, `react-dom` ≥18.

**Зависимости:** `@iskra-ui/react`, `@iskra-ui/core`, `@iskra-ui/icons`.

**Сборка и тесты**

```bash
pnpm --filter @iskra-ui/dci-react build
pnpm --filter @iskra-ui/dci-react test
```

### Компоненты

| Компонент     | Назначение                                  |
| ------------- | ------------------------------------------- |
| `DeviceCard`  | Карточка устройства в Inventory             |
| `FleetPulse`  | Сводка состояния флота (Fleet Intelligence) |
| `CliRow`      | Строка CLI/curl с копированием              |
| `DriftToast`  | Toast обнаруженного drift                   |
| `ApiKeyModal` | Модалка создания/управления API-ключами     |

### Пример

```bash
pnpm add @iskra-ui/dci-react @iskra-ui/react @iskra-ui/styles
```

```tsx
import '@iskra-ui/styles/index.css';
import '@iskra-ui/react/styles.css';
import '@iskra-ui/dci-react/styles.css';
import { DeviceCard, DriftToast } from '@iskra-ui/dci-react';

export function FleetView() {
  return (
    <>
      <DeviceCard
        name="leaf-07.msk"
        ip="10.0.2.7"
        status="drift"
        metricLabel="CPU · 24 ч"
        metricValue="88%"
        metricAlert
      />
      <DriftToast
        title="Drift обнаружен"
        description="leaf-07.msk расходится с Desired State"
        variant="drift"
      />
    </>
  );
}
```

---

## Приватные пакеты (не публикуются)

| Пакет                      | Назначение                       |
| -------------------------- | -------------------------------- |
| `@iskra-ui/eslint-config` | Общий ESLint flat config         |
| `@iskra-ui/tsconfig`      | Базовые `tsconfig` для библиотек |

---

## Темы и white-label

```html
<!-- Светлая холодная тема -->
<body class="theme-cold">
  <!-- Светлая тёплая тема -->
  <body class="theme-warm">
    <!-- White-label бренд поверх любой темы -->
    <body class="brand-aurora"></body>
  </body>
</body>
```

Новые бренды добавляются в `packages/tokens/src/brands/<name>.json` и пересобираются через `pnpm build:tokens`.

---

## См. также

- [FOUNDATIONS.md](./FOUNDATIONS.md) — дизайн и контент
- [MIGRATION.md](../MIGRATION.md) — миграция с `_ds_bundle.js`
- [CONTRIBUTING.md](../CONTRIBUTING.md) — разработка в монорепо
- [LICENCE.md](../LICENCE.md) — лицензии
- [COMPONENT_CHECKLIST.md](../packages/react/COMPONENT_CHECKLIST.md) — DoD для React-компонентов
