# Чеклист ревью компонентов — @iskra-ui/react

Каждый компонент должен удовлетворять Definition of Done до публикации changeset.

## Чеклист на компонент

- [ ] **API contract** — типизированные props; enums для `variant`/`size`; controlled **и** uncontrolled для stateful-компонентов; `ref` на primary DOM node где уместно; rest props на root element.
- [ ] **Native semantics** — корректный нативный элемент/role (`button`, `input`, `dialog`, `tablist`…); без «div soup».
- [ ] **Tokens only** — все цвета/отступы/radius/motion из CSS-переменных; без сырых hex/px вне `var(--x, fallback)` (проверяется `scripts/check-adherence.mjs`).
- [ ] **Theming** — проверено в `dark` (default), `theme-cold`, `theme-warm`.
- [ ] **Accessibility (WCAG 2.2 AA / WAI-ARIA APG)** — labels/`aria-*`; видимый focus ring; keyboard (Tab/Enter/Space/Arrows/Esc); чистый `vitest-axe`.
- [ ] **States** — hover / focus-visible / active / disabled / loading / error где применимо.
- [ ] **Stories** — минимум default + ключевые варианты + edge states в Storybook.
- [ ] **Tests** — Vitest behaviour test(s) + a11y assertion.
- [ ] **Docs** — JSDoc на компоненте: intent и a11y expectations.
- [ ] **Changeset** — добавлен с корректным SemVer bump.

## Статус покрытия

| Компонент          | Stories | Tests | a11y test | Native el.                | Keyboard                 |
| ------------------ | :-----: | :---: | :-------: | ------------------------- | ------------------------ |
| Icon               |   ✅    |  ✅   |    ✅     | `svg`                     | —                        |
| Button             |   ✅    |  ✅   |    ✅     | `button`                  | Enter/Space              |
| IconButton         |   ✅    |  ✅   |    ✅     | `button`                  | Enter/Space              |
| TextField          |   ✅    |  ✅   |    ✅     | `input`                   | native                   |
| Textarea           |   ✅    |  ✅   |     —     | `textarea`                | native                   |
| Checkbox           |   ✅    |  ✅   |    ✅     | `input[checkbox]`         | native                   |
| Radio / RadioGroup |   ✅    |  ✅   |    ✅     | `input[radio]`            | native                   |
| Switch             |   ✅    |  ✅   |    ✅     | `input[role=switch]`      | native                   |
| Badge / Tag        |   ✅    |  ✅   |     —     | `span`                    | —                        |
| Avatar             |   ✅    |  ✅   |     —     | `span[role=img]`          | —                        |
| Card               |   ✅    |  ✅   |     —     | `div`                     | focusable if interactive |
| Skeleton           |   ✅    |  ✅   |     —     | `div[aria-hidden]`        | —                        |
| Spinner            |   ✅    |  ✅   |     —     | `div[role=status]`        | —                        |
| FormField          |   ✅    |  ✅   |     —     | `label` + control         | —                        |
| Alert              |   ✅    |  ✅   |     —     | `div[role=alert/status]`  | —                        |
| EmptyState         |   ✅    |  ✅   |     —     | `div`                     | —                        |
| Modal              |   ✅    |  ✅   |     —     | `div[role=dialog]`        | Tab trap / Esc           |
| Tabs               |   ✅    |  ✅   |     —     | `tablist/tab/tabpanel`    | Arrows/Home/End          |
| Table              |   ✅    |  ✅   |     —     | `table`                   | —                        |
| Toast              |   ✅    |  ✅   |     —     | `region` + `status/alert` | —                        |
| Sidebar            |   ✅    |  ✅   |     —     | `nav`                     | Tab                      |

Легенда: ✅ есть · — не применимо / кандидат на доработку. a11y также проверяется глобально
в Storybook через `@storybook/addon-a11y` (`a11y.test = 'error'`) и в CI.
