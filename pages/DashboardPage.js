class DashboardPage {
  constructor(page) {
    this.page = page;
    this.path = '/inventory.html';
    this.inventoryList = page.getByTestId('inventory-list');
    this.inventoryItems = page.getByTestId('inventory-item');
    this.productNames = page.getByTestId('inventory-item-name');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  async goto() {
    await this.page.goto(this.path);
  }

  getItem(name) {
    return this.inventoryItems.filter({ hasText: name });
  }

  async addToCart(name) {
    await this.getItem(name)
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async removeFromCart(name) {
    await this.getItem(name).getByRole('button', { name: 'Remove' }).click();
  }

  async openProduct(name) {
    await this.getItem(name).getByTestId('inventory-item-name').click();
  }

  async openCart() {
    await this.cartLink.click();
    // Wait for the cart page: it reuses test IDs from the inventory page
    await this.page.waitForURL(/cart\.html/);
  }
}

module.exports = { DashboardPage };
