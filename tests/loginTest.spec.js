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

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test('Login with a valid user and see the inventory', async ({
  loginPage,
  dashboardPage,
}) => {
  await loginPage.login(users.valid.username, users.valid.password);
  await expect(dashboardPage.page).toHaveURL(dashboardPage.path);
  await expect(dashboardPage.inventoryList).toBeVisible();
});

test('Login attempt with an invalid user', async ({ loginPage }) => {
  await loginPage.login(users.invalid.username, users.invalid.password);
  await expect(loginPage.alert).toContainText(
    'Epic sadface: Username and password do not match any user in this service',
  );
});

test('Login attempt with a lockout user', async ({ loginPage }) => {
  await loginPage.login(users.locked.username, users.locked.password);
  await expect(loginPage.alert).toContainText(
    'Epic sadface: Sorry, this user has been locked out.',
  );
});
