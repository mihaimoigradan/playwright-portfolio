const { test, expect } = require('../fixtures/pages');

const product = 'Sauce Labs Backpack';

// Already logged in via the saved session (see tests/auth.setup.js)
test.beforeEach(async ({ dashboardPage }) => {
  await dashboardPage.goto();
});

test('Added products appear in the cart with correct name/price', async ({
  dashboardPage,
  cartPage,
}) => {
  await dashboardPage.addToCart(product);
  // Remember the price shown on the inventory, before we leave the page
  const inventoryPrice = await dashboardPage
    .getItem(product)
    .getByTestId('inventory-item-price')
    .textContent();

  await dashboardPage.openCart();

  const cartItem = cartPage.getItem(product);
  await expect(cartItem).toBeVisible();
  await expect(cartItem.getByTestId('inventory-item-name')).toHaveText(product);
  await expect(cartItem.getByTestId('inventory-item-price')).toHaveText(
    inventoryPrice,
  );
});

test('Continue shopping returns to the inventory', async ({
  dashboardPage,
  cartPage,
}) => {
  await dashboardPage.openCart();

  await cartPage.continueShopping();

  await expect(dashboardPage.page).toHaveURL(/inventory\.html/);
  await expect(dashboardPage.inventoryList).toBeVisible();
});
