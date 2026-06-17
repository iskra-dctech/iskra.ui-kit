# Искра.DCI Design System

Монорепозиторий дизайн-системы **Искра.DCI** — UI-библиотеки для платформы управления инфраструктурой центров обработки данных (_Data Center Interface_). Пакеты `@iskra-dci/*` поставляют токены, стили, иконки, headless-логику и компоненты для **React** и **Vue 3**.

Стиль системы — **Hard-Shell Minimal**: тёмный индустриальный интерфейс, один акцентный оттенок, информационная плотность. Принципы дизайна и контента — в [docs/FOUNDATIONS.md](docs/FOUNDATIONS.md).

---

## Пакеты

| Пакет                                                         | Назначение                                                                   |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`@iskra-dci/tokens`](docs/PACKAGES.md#iskra-dcitokens)       | DTCG-токены → CSS-переменные + TypeScript                                    |
| [`@iskra-dci/styles`](docs/PACKAGES.md#iskra-dcistyles)       | Глобальные стили, шрифты, reset                                              |
| [`@iskra-dci/icons`](docs/PACKAGES.md#iskra-dciicons)         | Иконки 16×16, stroke 1.5px                                                   |
| [`@iskra-dci/core`](docs/PACKAGES.md#iskra-dcicore)           | Headless-логика (React + Vue)                                                |
| [`@iskra-dci/react`](docs/PACKAGES.md#iskra-dcireact)         | React-компоненты                                                             |
| [`@iskra-dci/vue`](docs/PACKAGES.md#iskra-dcivue)             | Vue 3-компоненты                                                             |
| [`@iskra-dci/dci-react`](docs/PACKAGES.md#iskra-dcidci-react) | Доменные компоненты: DeviceCard, FleetPulse, CliRow, DriftToast, ApiKeyModal |

Подробное описание каждого пакета — в [docs/PACKAGES.md](docs/PACKAGES.md).

### Архитектура зависимостей

```mermaid
flowchart LR
  tokens["tokens"]
  styles["styles"]
  icons["icons"]
  core["core"]
  react["react"]
  vue["vue"]
  dciReact["dci-react"]

  tokens --> styles
  core --> react
  icons --> react
  core --> vue
  icons --> vue
  react --> dciReact
```

---

## Быстрый старт

### Установка

```bash
pnpm add @iskra-dci/react @iskra-dci/styles
```

Опционально: `@iskra-dci/vue`, `@iskra-dci/dci-react`.

### Подключение (React)

```ts
import '@iskra-dci/styles/index.css';
import '@iskra-dci/react/styles.css';
import { Button, TextField, Badge, Icon } from '@iskra-dci/react';
```

```tsx
<TextField label="Хост" iconBefore={<Icon name="search" />} clearable />
<Button variant="outline" iconBefore={<Icon name="refresh" />}>Force Sync</Button>
<Badge variant="warning" dot>Drift</Badge>
```

Примеры для Vue и доменных компонентов — в [docs/PACKAGES.md](docs/PACKAGES.md).

### Темы

По умолчанию — тёмная тема (`:root`). Светлые темы — классы на `<body>`:

- `theme-cold` — холодная off-white
- `theme-warm` — тёплый sand

White-label: `brand-aurora` (и другие бренды в `packages/tokens/src/brands/`). Подробнее — в [MIGRATION.md](MIGRATION.md#темы-и-white-label).

---

## Разработка в монорепозитории

**Требования:** Node ≥22, pnpm 11.7 (Corepack).

```bash
pnpm install
pnpm build
pnpm storybook    # Storybook на localhost
pnpm test         # Vitest
```

Полное руководство для контрибьюторов — [CONTRIBUTING.md](CONTRIBUTING.md).

### Структура репозитория

```
packages/     # @iskra-dci/* — publishable-библиотеки
apps/         # docs-react — Storybook + visual tests
scripts/      # lint:tokens, codemod legacy-импортов
docs/         # FOUNDATIONS.md, PACKAGES.md
```

---

## Документация

| Документ                                                                       | Содержание                                       |
| ------------------------------------------------------------------------------ | ------------------------------------------------ |
| [docs/FOUNDATIONS.md](docs/FOUNDATIONS.md)                                     | Продукт, контент, визуальные основы, иконография |
| [docs/PACKAGES.md](docs/PACKAGES.md)                                           | Пакеты, API, примеры                             |
| [MIGRATION.md](MIGRATION.md)                                                   | Миграция с legacy `_ds_bundle.js`                |
| [CONTRIBUTING.md](CONTRIBUTING.md)                                             | CI, changesets, добавление компонентов           |
| [LICENCE.md](LICENCE.md)                                                       | Лицензии на код и сторонние компоненты           |
| [packages/react/COMPONENT_CHECKLIST.md](packages/react/COMPONENT_CHECKLIST.md) | Definition of Done для React-компонентов         |

**Storybook** — интерактивная документация компонентов: `pnpm storybook`.

---

## Legacy

Старый self-injecting бандл (`_ds_bundle.js`, `colors_and_type.css`, `window.DCIDesignSystem_*`) **снят с поддержки**. Миграция на npm-пакеты — в [MIGRATION.md](MIGRATION.md). Codemod: `scripts/codemod-legacy-imports.mjs`.
