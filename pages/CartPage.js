class CartPage {
  constructor(page) {
    this.page = page;
    this.path = '/cart.html';
    this.cartItems = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
    this.checkoutButton = page.getByTestId('checkout');
  }

  getItem(name) {
    return this.cartItems.filter({ hasText: name });
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
    await this.page.waitForURL(/checkout-step-one\.html/);
  }
}

module.exports = { CartPage };
