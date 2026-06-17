import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const here = dirname(fileURLToPath(import.meta.url));
const pkg = (p: string) => resolve(here, '../../../packages', p);

const config: StorybookConfig = {
  // Stories are co-located with the components in the react + domain packages.
  stories: [
    '../../../packages/react/src/**/*.stories.@(ts|tsx)',
    '../../../packages/dci-react/src/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: { disableTelemetry: true },
  typescript: { reactDocgen: 'react-docgen-typescript' },
  async viteFinal(config) {
    // Resolve workspace packages to their source so component CSS is bundled and
    // no pre-build of the libraries is required to run Storybook.
    config.resolve ??= {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string> | undefined),
      '@iskra-dci/react': pkg('react/src/index.ts'),
      '@iskra-dci/dci-react': pkg('dci-react/src/index.ts'),
      '@iskra-dci/core': pkg('core/src/index.ts'),
      '@iskra-dci/icons': pkg('icons/src/index.ts'),
    };
    return config;
  },
};

export default config;
