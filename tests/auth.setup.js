const { test: setup, expect } = require('../fixtures/pages');

const authFile = 'playwright/.auth/user.json';

setup('log in as standard user', async ({ page, loginPage, dashboardPage }) => {
  await loginPage.goto();
  await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD);
  await expect(dashboardPage.inventoryList).toBeVisible();

  await page.context().storageState({ path: authFile });
});
