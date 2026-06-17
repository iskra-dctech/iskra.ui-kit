# Миграция — с legacy-артефакта на `@iskra-dci/*`

Исходная дизайн-система Искра.DCI поставлялась как единый self-injecting бандл
(`_ds_bundle.js`) вместе с файлами `components/*` и таблицей стилей `colors_and_type.css`.
Этот артефакт **снят с поддержки**. Содержимое перенесено в версионируемые
publishable-пакеты:

| Legacy-источник | Новый пакет |
| --------------- | ----------- |
| `_ds_bundle.js`, `components/<Name>/<Name>.jsx` | `@iskra-dci/react` |
| `colors_and_type.css` | `@iskra-dci/styles` (`@iskra-dci/styles/index.css`) |
| разметка иконок внутри `Icon.jsx` | `@iskra-dci/icons` |
| (новое) Vue-порт | `@iskra-dci/vue` |
| (новое) headless state machines | `@iskra-dci/core` |
| (новое) DeviceCard / FleetPulse / DriftToast / CliRow / ApiKeyModal | `@iskra-dci/dci-react` |

## Почему миграция безопасна

- **Имена CSS-переменных не изменились.** DTCG-токены компилируются в те же
  custom properties (`--bg`, `--accent`, `--s1…--s8`, `--radius`, типографическая шкала…),
  что и legacy stylesheet. Переименований токенов в разметке и overrides нет.
- **Имена CSS-классов компонентов не изменились** (`ik-btn`, `ik-tf-field`, …) — app CSS,
  завязанный на них, продолжит работать.
- **Публичные API компонентов совместимы** — миграция в основном сводится к путям импорта.

## Шаги

1. Установите нужные пакеты:

```bash
pnpm add @iskra-dci/react @iskra-dci/styles
# опционально: @iskra-dci/vue @iskra-dci/dci-react
```

2. Подключите стили один раз в entry приложения (заменяет `colors_and_type.css`
   и self-injected стили компонентов):

```ts
import '@iskra-dci/styles/index.css';
import '@iskra-dci/react/styles.css';
```

3. Запустите codemod импортов (сначала dry-run, затем `--write`):

```bash
node scripts/codemod-legacy-imports.mjs ./src
node scripts/codemod-legacy-imports.mjs ./src --write
```

Codemod переписывает импорты `_ds_bundle` / `components/*` на `@iskra-dci/react`,
а `colors_and_type.css` — на `@iskra-dci/styles/index.css`.

## Темы и white-label

- Тёмная тема по умолчанию (`:root`). Добавьте `theme-cold` или `theme-warm` на `<body>`
  для светлых тем.
- White-label бренды подключаются классом `brand-<name>` (например `brand-aurora`) —
  перекрашивает accent hue поверх любой темы. Новые бренды добавляйте в
  `packages/tokens/src/brands/<name>.json`.

## См. также

- [README.md](README.md) — обзор монорепозитория
- [docs/PACKAGES.md](docs/PACKAGES.md) — пакеты и примеры подключения
- [LICENCE.md](LICENCE.md) — лицензии
