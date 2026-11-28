const { test, expect } = require('../fixtures/pages');

const product = 'Sauce Labs Backpack';

// Already logged in via the saved session (see tests/auth.setup.js)
test.beforeEach(async ({ dashboardPage }) => {
  await dashboardPage.goto();
});

test('INV-01 Add a product to the cart from the inventory', { tag: '@smoke' }, async ({
  dashboardPage,
}) => {
  await dashboardPage.addToCart(product);

  await expect(
    dashboardPage.getItem(product).getByRole('button', { name: 'Remove' }),
  ).toBeVisible();
  await expect(dashboardPage.cartBadge).toHaveText('1');
});

test('INV-02 Remove a product from the cart from the inventory', async ({
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

test("INV-03 Open a product's details page", async ({
  dashboardPage,
  productPage,
}) => {
  await dashboardPage.openProduct(product);
  await expect(productPage.page).toHaveURL(/inventory-item\.html/);
  await expect(productPage.name).toHaveText(product);
});
