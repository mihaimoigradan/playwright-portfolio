const { test, expect } = require('../fixtures/pages');

const users = {
  valid: {
    username: process.env.STANDARD_USER,
    password: process.env.PASSWORD,
  },
  invalid: {
    username: process.env.INVALID_USER,
    password: process.env.PASSWORD,
  },
  locked: {
    username: process.env.LOCKED_USER,
    password: process.env.PASSWORD,
  },
};

// Login tests must start logged out, so don't load the saved session
test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test('AUTH-01 Login with a valid user shows the inventory', { tag: '@smoke' }, async ({
  loginPage,
  dashboardPage,
}) => {
  await loginPage.login(users.valid.username, users.valid.password);
  await expect(dashboardPage.page).toHaveURL(dashboardPage.path);
  await expect(dashboardPage.inventoryList).toBeVisible();
});

test('AUTH-02 Login with an invalid user shows an error', { tag: '@smoke' }, async ({ loginPage }) => {
  await loginPage.login(users.invalid.username, users.invalid.password);
  await expect(loginPage.alert).toContainText(
    'Epic sadface: Username and password do not match any user in this service',
  );
});

test('AUTH-03 Login with a locked-out user shows an error', { tag: '@smoke' }, async ({ loginPage }) => {
  await loginPage.login(users.locked.username, users.locked.password);
  await expect(loginPage.alert).toContainText(
    'Epic sadface: Sorry, this user has been locked out.',
  );
});
