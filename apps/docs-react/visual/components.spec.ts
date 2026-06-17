import { test, expect } from '@playwright/test';

// Representative stories for pixel-level visual regression. Add an entry here
// when a component's visual contract should be locked. Run with:
//   pnpm --filter @iskra-dci/docs-react test:visual:update   # write baselines
//   pnpm --filter @iskra-dci/docs-react test:visual          # compare
const STORIES = [
  'foundations-icon--all',
  'primitives-button--sizes',
  'primitives-badge--statuses',
  'primitives-card--structured',
  'primitives-textfield--with-icon-and-clear',
  'patterns-alert--variants',
  'patterns-tabs--default',
  'patterns-table--basic',
  'patterns-sidebar--interactive',
];

for (const id of STORIES) {
  test(`visual: ${id}`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${id}&viewMode=story`);
    await page.waitForSelector('#storybook-root');
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot(`${id}.png`, { fullPage: true });
  });
}
