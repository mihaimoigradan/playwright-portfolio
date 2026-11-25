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
}

module.exports = { CheckoutPage };
