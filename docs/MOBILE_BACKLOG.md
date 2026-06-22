# Mobile UI Kit — Backlog

Компоненты и задачи вне scope **Mobile V1**. См. [design spec](./superpowers/specs/2026-06-18-mobile-ui-kit-design.md).

| Приоритет | Элемент                                    | Примечание                                               |
| --------- | ------------------------------------------ | -------------------------------------------------------- |
| P1        | `ActionMenu`                               | Compact header overflow; в V1 — `Popover`, для action-меню — `ContextMenu` с `triggerOn="click"` |
| P1        | `ActionBar`                                | Sticky bottom actions; в V1 — CSS-композиция из `Button` |
| P2        | `useShellLayout`                           | После 2–3 продуктов с повторяющейся композицией          |
| P2        | `@iskra-ui/patterns`                       | Publishable npm-пакет recipes                            |
| P2        | DataList virtualization                    | После реальных объёмов данных                            |
| P2        | Sheet drag physics                         | V1: Esc / overlay dismiss достаточно                     |
| P3        | `BottomBar` / TabBar                       | Не выбран для навигации V1                               |
| P3        | `PullToRefresh`, `SwipeActions`            | Consumer-app паттерны                                    |
| P3        | `CommandPalette` mobile fullscreen         | Отдельная поверхность                                    |
| P3        | `SegmentedControl`, `Breadcrumbs` collapse | Нет запроса в V1                                         |
| Domain    | `DeviceList`, `AlertList`, `TaskList`      | В `@iskra-ui/dci-react`, не foundation                   |
