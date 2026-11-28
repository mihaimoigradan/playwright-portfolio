const { test, expect } = require('../fixtures/pages');

const product = 'Sauce Labs Backpack';

// Already logged in via the saved session (see tests/auth.setup.js)
// Every test starts on the product's details page
test.beforeEach(async ({ dashboardPage, productPage }) => {
  await dashboardPage.goto();
  await dashboardPage.openProduct(product);
  // Wait for the details page before touching its locators
  // (some names, like inventory-item-name, also exist on the inventory page)
  await expect(productPage.page).toHaveURL(/inventory-item\.html/);
});

test('PROD-01 Product details show name, description and price', async ({
  productPage,
}) => {
  await expect(productPage.name).toHaveText(product);

  await expect(productPage.description).toBeVisible();
  await expect(productPage.description).not.toBeEmpty();

  await expect(productPage.price).toBeVisible();
  await expect(productPage.price).not.toBeEmpty();
});

test('PROD-02 Add to cart / Remove from the product details page', async ({
  productPage,
  dashboardPage,
}) => {
  await productPage.addToCart();

  await expect(productPage.removeButton).toBeVisible();
  await expect(dashboardPage.cartBadge).toHaveText('1');

  await productPage.removeFromCart();

  await expect(productPage.addToCartButton).toBeVisible();
  await expect(dashboardPage.cartBadge).not.toBeVisible();
});

test('PROD-03 Back to products returns to the inventory', async ({
  productPage,
  dashboardPage,
}) => {
  await productPage.backToProducts();

  await expect(dashboardPage.page).toHaveURL(/inventory\.html/);
  await expect(dashboardPage.inventoryList).toBeVisible();
});
