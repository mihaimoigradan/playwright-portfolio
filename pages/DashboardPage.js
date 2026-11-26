class DashboardPage {
  constructor(page) {
    this.page = page;
    this.path = '/inventory.html';
    this.inventoryList = page.getByTestId('inventory-list');
    this.inventoryItems = page.getByTestId('inventory-item');
    this.productNames = page.getByTestId('inventory-item-name');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
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
}

module.exports = { DashboardPage };
