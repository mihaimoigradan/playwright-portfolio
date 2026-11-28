const { test, expect } = require('../fixtures/pages');

const product = 'Sauce Labs Backpack';
const customer = { firstName: 'Test', lastName: 'User', postalCode: '12345' };

// Already logged in via the saved session (see tests/auth.setup.js)
// Every test starts on checkout step one ("Your Information") with 1 product
test.beforeEach(async ({ dashboardPage, cartPage }) => {
  await dashboardPage.goto();
  await dashboardPage.addToCart(product);
  await dashboardPage.openCart();
  await cartPage.checkout();
});

test('CHK-01 Complete checkout end-to-end shows confirmation', { tag: '@smoke' }, async ({
  checkoutPage,
}) => {
  await checkoutPage.fillInformation(
    customer.firstName,
    customer.lastName,
    customer.postalCode,
  );
  await checkoutPage.continueCheckout();
  await expect(checkoutPage.page).toHaveURL(/checkout-step-two\.html/);

  await checkoutPage.finish();

  await expect(checkoutPage.page).toHaveURL(/checkout-complete\.html/);
  await expect(checkoutPage.completeHeader).toHaveText(
    'Thank you for your order!',
  );
});

test('CHK-02 Continue with empty information fields shows an error', { tag: '@smoke' }, async ({
  checkoutPage,
}) => {
  await checkoutPage.continueCheckout();

  await expect(checkoutPage.error).toHaveText(
    'Error: First Name is required',
  );
  await expect(checkoutPage.page).toHaveURL(/checkout-step-one\.html/);
});

test('CHK-03 Overview total equals item total + tax', { tag: '@smoke' }, async ({ checkoutPage }) => {
  await checkoutPage.fillInformation(
    customer.firstName,
    customer.lastName,
    customer.postalCode,
  );
  await checkoutPage.continueCheckout();
  // Wait for the overview before reading amounts (getAmount reads once, no retry)
  await expect(checkoutPage.page).toHaveURL(/checkout-step-two\.html/);

  const itemTotal = await checkoutPage.getAmount(checkoutPage.itemTotal);
  const tax = await checkoutPage.getAmount(checkoutPage.tax);
  const total = await checkoutPage.getAmount(checkoutPage.total);

  // toBeCloseTo with 2 digits = compare like money (avoids 0.1 + 0.2 issues)
  expect(total).toBeCloseTo(itemTotal + tax, 2);
});
