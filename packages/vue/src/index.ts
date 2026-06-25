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
export { default as ContextMenu } from './components/ContextMenu.vue';
export { default as ContextMenuTrigger } from './components/ContextMenuTrigger.vue';
export { default as ContextMenuContent } from './components/ContextMenuContent.vue';
export { default as ContextMenuItem } from './components/ContextMenuItem.vue';
export { default as ContextMenuSeparator } from './components/ContextMenuSeparator.vue';
export type { ContextMenuTriggerOn } from './composables/contextMenu.js';
export {
  default as AppHeader,
  type AppHeaderIndicatorDot,
  type AppHeaderStatusDot,
} from './components/AppHeader.vue';
export { default as Sidebar, type SidebarTheme } from './components/Sidebar.vue';
export { default as SidebarItem } from './components/SidebarItem.vue';
export { default as SidebarGroup } from './components/SidebarGroup.vue';
export { default as SidebarSection } from './components/SidebarSection.vue';
export { default as SidebarDivider } from './components/SidebarDivider.vue';
export { default as SidebarFooter } from './components/SidebarFooter.vue';
export { default as SidebarBrand } from './components/SidebarBrand.vue';
export { default as SidebarBody } from './components/SidebarBody.vue';
export { default as MobileNav } from './components/MobileNav.vue';
export { default as AppNavigation } from './components/AppNavigation.vue';
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
  DCI_ADMIN_EXTRA,
  DCI_FOOTER_NAV,
  NOTIFIER_NAV,
  getDciOperatorNav,
  getDciAdminNav,
  getDciAdminExtra,
  getDciFooterNav,
  getNotifierNav,
  resolveSidebarGroups,
  flattenSidebarItems,
  resolvePrimaryNavItems,
  type SidebarNavGroup,
  type SidebarNavItem,
  type SidebarVariant,
} from '@iskra-ui/core';
export {
  IskraProvider,
  IskraLocalePlugin,
  useIskraLocale,
  useIskraT,
  type IskraLocaleContextValue,
  type IskraLocalePluginOptions,
} from './i18n/index.js';
export { default as Drawer, type DrawerSide } from './components/Drawer.vue';
export { default as Sheet, type SheetSnap } from './components/Sheet.vue';
export { default as DataList, type DataListDensity } from './components/DataList.vue';
export {
  useMediaQuery,
  useBreakpoint,
  type UseMediaQueryOptions,
} from './composables/useMediaQuery.js';
export {
  BP_SM,
  BP_MD,
  BP_LG,
  BP_XL,
  MEDIA_BELOW_MD,
  MEDIA_MD_UP,
  mediaQueryForBreakpoint,
  type BreakpointName,
} from './responsive/breakpoints.js';
