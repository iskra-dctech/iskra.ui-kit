// Shared design-system stylesheet (tokens + component CSS) — single source of
// truth lives in @iskra-ui/react; Vue reuses the identical `ik-*` class names.
import '@iskra-ui/react/styles.css';

export { default as Icon } from './components/Icon.vue';
export { default as Button, type ButtonVariant, type ButtonSize } from './components/Button.vue';
export { default as Badge, type BadgeVariant, type BadgeSize } from './components/Badge.vue';
export { default as Spinner, type SpinnerSize } from './components/Spinner.vue';
export { default as Switch, type SwitchSize } from './components/Switch.vue';
export { default as Alert, type AlertVariant } from './components/Alert.vue';
export { default as Card, type CardPadding } from './components/Card.vue';
export { default as CardHeader } from './components/CardHeader.vue';
export { default as CardBody } from './components/CardBody.vue';
export { default as CardFooter } from './components/CardFooter.vue';
export { default as TextField, type TextFieldSize } from './components/TextField.vue';
export {
  default as SearchField,
  type SearchFieldSize,
  type SearchFieldVariant,
} from './components/SearchField.vue';
export { default as Tabs, type TabItem } from './components/Tabs.vue';
export {
  default as Avatar,
  type AvatarSize,
  type AvatarShape,
  type AvatarStatus,
  type AvatarStatusDisplay,
} from './components/Avatar.vue';
export { default as Popover, type PopoverPlacement } from './components/Popover.vue';
export {
  default as AppHeader,
  type AppHeaderIndicatorDot,
  type AppHeaderStatusDot,
} from './components/AppHeader.vue';
export { default as Sidebar, type SidebarTheme } from './components/Sidebar.vue';
export { default as EmptyState, type EmptyStateVariant } from './components/EmptyState.vue';
export { default as Modal, type ModalSize } from './components/Modal.vue';
export {
  default as Table,
  type TableColumn,
  type TableSort,
  type TableDensity,
  type TableAlign,
  type SortDirection,
} from './components/Table.vue';
export {
  DCI_OPERATOR_NAV,
  DCI_ADMIN_NAV,
  DCI_FOOTER_NAV,
  NOTIFIER_NAV,
  resolveSidebarGroups,
  type SidebarNavGroup,
  type SidebarNavItem,
  type SidebarVariant,
} from '@iskra-ui/core';
