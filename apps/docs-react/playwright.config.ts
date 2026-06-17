import { defineConfig, devices } from '@playwright/test';

// Visual regression against a running Storybook. Baselines live next to the spec
// and are generated/updated with `pnpm test:visual:update`. CI compares pixels.
export default defineConfig({
  testDir: './visual',
  snapshotDir: './visual/__snapshots__',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:6006',
    colorScheme: 'dark',
  },
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled' },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
