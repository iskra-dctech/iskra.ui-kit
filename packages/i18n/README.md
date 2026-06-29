# @iskra-ui/i18n

Framework-agnostic internationalization for Iskra UIKit — locale catalogs and message resolution.

## Usage

```ts
import { getMessages, createTranslator, mergeMessages } from '@iskra-ui/i18n';

const t = createTranslator(getMessages('en'));
t('common.close'); // "Close"
t('widget.expandLabel', { title: 'CPU' }); // "Expand chart CPU"
```

React and Vue apps should use `IskraProvider` from `@iskra-ui/react` or `@iskra-ui/vue` instead of calling this package directly in components.

## Locales

- `en` — default
- `ru` — Russian

Import catalogs directly for tree-shaking:

```ts
import { enMessages } from '@iskra-ui/i18n/locales/en';
```
