class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.stepOnePath = '/checkout-step-one.html';
    this.stepTwoPath = '/checkout-step-two.html';
    this.completePath = '/checkout-complete.html';

    // Step one: your information
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.error = page.getByTestId('error');

    // Step two: overview
    this.itemTotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');

    // Complete
    this.completeHeader = page.getByTestId('complete-header');
  }

  async fillInformation(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  // No URL wait here: with invalid info we expect to stay on step one
  async continueCheckout() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  // Turns a label like "Tax: $2.40" into the number 2.4
  async getAmount(locator) {
    const text = await locator.textContent();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }
}

module.exports = { CheckoutPage };
