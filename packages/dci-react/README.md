# @iskra-ui/dci-react

Domain React components for **Искра.DCI** — built on `@iskra-ui/react`.

Components: `DeviceCard`, `FleetPulse`, `CliRow`, `DriftToast`, `ApiKeyModal`.

## Install

```bash
pnpm add @iskra-ui/dci-react @iskra-ui/react @iskra-ui/styles
```

## Usage

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

## Docs

https://github.com/iskra-dctech/iskra.ui-kit/blob/master/docs/PACKAGES.md#iskra-uidci-react
