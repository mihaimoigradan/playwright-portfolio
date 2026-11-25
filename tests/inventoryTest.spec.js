const { test, expect } = require('../fixtures/pages');

const product = 'Sauce Labs Backpack';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD);
});

test('Add a product to the cart from the inventory', async ({
  dashboardPage,
}) => {
  await dashboardPage.addToCart(product);

  await expect(
    dashboardPage.getItem(product).getByRole('button', { name: 'Remove' }),
  ).toBeVisible();
  await expect(dashboardPage.cartBadge).toHaveText('1');
});

test('Remove a product from the cart from the inventory', async ({
  dashboardPage,
}) => {
  await dashboardPage.addToCart(product);
  await expect(dashboardPage.cartBadge).toHaveText('1');

  await dashboardPage.removeFromCart(product);

  await expect(
    dashboardPage.getItem(product).getByRole('button', { name: 'Add to cart' }),
  ).toBeVisible();
  await expect(dashboardPage.cartBadge).not.toBeVisible();
});

test("Open a product's details page", async ({
  dashboardPage,
  productPage,
}) => {
  await dashboardPage.openProduct(product);

  await expect(productPage.name).toHaveText(product);
});
