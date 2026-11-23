const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/dashboardPage');

const users = {
  valid: {
    username: process.env.STANDARD_USER,
    password: process.env.PASSWORD,
  },
  invalid: {
    username: process.env.INVALID_USER,
    password: process.env.PASSWORD,
  },
  locked: { username: process.env.LOCKED_USER, password: process.env.PASSWORD },
};

let loginPage;
let dashboardPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  await loginPage.goto();
});

test('Login with a valid user and see the inventory', async () => {
  await loginPage.login(users.valid.username, users.valid.password);
  await expect(dashboardPage.page).toHaveURL(dashboardPage.path);
  await expect(dashboardPage.inventoryList).toBeVisible();
});

test('Login attempt with an invalid user', async () => {
  await loginPage.login(users.invalid.username, users.invalid.password);
  await expect(loginPage.alert).toContainText(
    'Epic sadface: Username and password do not match any user in this service',
  );
});

test('Login attempt with a lockout user', async () => {
  await loginPage.login(users.locked.username, users.locked.password);
  await expect(loginPage.alert).toContainText(
    'Epic sadface: Sorry, this user has been locked out.',
  );
});
