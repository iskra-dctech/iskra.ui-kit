# Руководство для контрибьюторов

Спасибо за вклад в дизайн-систему Искра.DCI. Этот документ описывает локальную разработку, проверки CI и процесс релизов.

---

## Требования

| Инструмент | Версия                  |
| ---------- | ----------------------- |
| Node.js    | ≥22 (см. `.nvmrc`)      |
| pnpm       | 11.7.0 (через Corepack) |

```bash
corepack enable
pnpm install
```

---

## Первый запуск

```bash
pnpm install
pnpm build          # собрать все пакеты (tokens → styles → react/vue → …)
pnpm storybook      # Storybook: @iskra-dci/docs-react
pnpm test           # Vitest во всех пакетах
```

Storybook — основной способ визуально проверить компоненты, темы и a11y.

---

## Скрипты корневого `package.json`

| Команда                 | Назначение                                                  |
| ----------------------- | ----------------------------------------------------------- |
| `pnpm build`            | Turbo: сборка всех пакетов (upstream first)                 |
| `pnpm build:tokens`     | Только `@iskra-dci/tokens`                                  |
| `pnpm dev`              | Параллельный watch во всех пакетах                          |
| `pnpm typecheck`        | `tsc` / `vue-tsc` во всех пакетах                           |
| `pnpm lint`             | ESLint по всему репозиторию                                 |
| `pnpm lint:tokens`      | Проверка соблюдения токенов (`scripts/check-adherence.mjs`) |
| `pnpm format`           | Prettier write                                              |
| `pnpm format:check`     | Prettier check (как в CI)                                   |
| `pnpm test`             | Vitest                                                      |
| `pnpm storybook`        | Dev Storybook                                               |
| `pnpm build-storybook`  | Статическая сборка Storybook                                |
| `pnpm changeset`        | Записать intent-to-release                                  |
| `pnpm version-packages` | `changeset version` — bump версий + changelog               |
| `pnpm release`          | Сборка пакетов + `changeset publish`                        |

Фильтр по одному пакету:

```bash
pnpm --filter @iskra-dci/react build
pnpm --filter @iskra-dci/react test
```

---

## Структура монорепозитория

```
packages/           # publishable @iskra-dci/*
  tokens/           # DTCG → CSS + TS
  styles/           # глобальные стили + шрифты
  icons/            # SVG-глифы
  core/             # headless-логика
  react/            # React UI
  vue/              # Vue UI
  dci-react/        # доменные React-компоненты
  eslint-config/    # private
  tsconfig/         # private
apps/
  docs-react/       # Storybook + Playwright visual tests
scripts/            # adherence check, legacy codemod
docs/               # FOUNDATIONS.md, PACKAGES.md
```

**Оркестрация:** [Turbo](https://turbo.build/) — `build`, `typecheck`, `test` зависят от `^build` (сначала зависимости).

**Версии зависимостей:** общий [catalog](pnpm-workspace.yaml) в `pnpm-workspace.yaml`.

---

## CI

На каждый push/PR в `master` (`.github/workflows/ci.yml`):

1. ESLint — `pnpm lint`
2. Token adherence — `pnpm lint:tokens`
3. Prettier — `pnpm format:check`
4. Typecheck — `pnpm typecheck`
5. Тесты — `pnpm test` (unit + a11y через vitest-axe)
6. Сборка — `pnpm build` (включая Storybook static)

Убедитесь, что все шаги проходят локально перед отправкой PR.

---

## Добавление React-компонента

1. Создайте компонент в `packages/react/src/components/<Name>/`.
2. Следуйте [COMPONENT_CHECKLIST.md](packages/react/COMPONENT_CHECKLIST.md) — Definition of Done.
3. Добавьте stories в `apps/docs-react/` (или рядом с компонентом, если настроен glob).
4. Экспортируйте из `packages/react/src/index.ts`.
5. Запустите `pnpm changeset` с корректным SemVer bump.

**Ключевые правила DoD:**

- Только CSS-переменные токенов (без сырых hex/px)
- Нативная семантика DOM (`button`, `input`, `dialog`, …)
- WCAG 2.2 AA: focus ring, keyboard, `vitest-axe`
- Проверка в `dark`, `theme-cold`, `theme-warm`
- Stories: default + варианты + edge states

Vue-паритет — отдельная задача в `packages/vue/` по мере готовности React-версии.

---

## Версионирование и релизы

Проект использует [Changesets](https://github.com/changesets/changesets).

### Когда нужен changeset

Любое изменение публичного API, токенов или CSS-контракта в publishable-пакете.

### SemVer для дизайн-системы

| Bump      | Когда                                                                                  |
| --------- | -------------------------------------------------------------------------------------- |
| **patch** | Багфиксы без изменения API/токен-контракта (focus ring, aria)                          |
| **minor** | Новые компоненты, варианты, неломающие токены                                          |
| **major** | Breaking: переименование prop, удаление варианта, смена пути токена или CSS-переменной |

Prerelease: теги `next` / `beta` / `rc`.

### Workflow

```bash
pnpm changeset          # описать изменения, выбрать пакеты и bump
# … merge PR …
pnpm version-packages   # локально или через Changesets PR
pnpm release            # build + publish (в CI)
```

**Автоматизация:** push в `master` → `.github/workflows/release.yml` → [changesets/action](https://github.com/changesets/action) создаёт PR «version packages» или публикует на npm с provenance.

Пакет `@iskra-dci/docs-react` в changesets **игнорируется** (не публикуется).

---

## Стиль кода

- TypeScript strict, без `any`
- ESLint: `@iskra-dci/eslint-config`
- Prettier для форматирования
- Имена классов компонентов: префикс `ik-`
- Event handlers: префикс `handle` (`handleClick`, …)

---

## Документация

При изменении публичного API обновляйте:

- JSDoc на компонентах
- Stories в Storybook
- [docs/PACKAGES.md](docs/PACKAGES.md) — при новых пакетах или entry points
- [docs/FOUNDATIONS.md](docs/FOUNDATIONS.md) — при изменении визуального/контентного контракта

---

## См. также

- [README.md](README.md) — обзор и быстрый старт
- [MIGRATION.md](MIGRATION.md) — миграция потребителей с legacy
- [LICENCE.md](LICENCE.md) — лицензии и сторонние компоненты
- [docs/FOUNDATIONS.md](docs/FOUNDATIONS.md) — дизайн-основы
