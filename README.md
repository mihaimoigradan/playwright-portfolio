# Playwright Portfolio

End-to-end tests written with [Playwright](https://playwright.dev) (JavaScript).

> Work in progress. This README is temporary.

## 🧪 Test Coverage

| ID      | Area           | Scenario                                                   | Type     | Priority | Status |
|---------|----------------|------------------------------------------------------------|----------|----------|--------|
| AUTH-01 | Authentication | Login with a valid user shows the inventory               | Positive | High     | ✅     |
| AUTH-02 | Authentication | Login with an invalid user shows an error                 | Negative | High     | ✅     |
| AUTH-03 | Authentication | Login with a locked-out user shows an error               | Negative | High     | ✅     |
| INV-01  | Inventory      | Add a product to the cart from the inventory              | Positive | High     | ✅     |
| INV-02  | Inventory      | Remove a product from the cart from the inventory         | Positive | Medium   | ✅     |
| INV-03  | Inventory      | Open a product's details page                             | Positive | Medium   | ✅     |
| PROD-01 | Product        | Product details show name, description and price          | Positive | Medium   | ⬜     |
| PROD-02 | Product        | Add to cart / Remove from the product details page        | Positive | Medium   | ⬜     |
| PROD-03 | Product        | Back to products returns to the inventory                 | Positive | Low      | ⬜     |
| CART-01 | Cart           | Added products appear in the cart with correct name/price | Positive | High     | ⬜     |
| CART-02 | Cart           | Continue shopping returns to the inventory                | Positive | Low      | ⬜     |
| CHK-01  | Checkout       | Complete checkout end-to-end shows confirmation           | Positive | High     | ⬜     |
| CHK-02  | Checkout       | Continue with empty information fields shows an error     | Negative | High     | ⬜     |
| CHK-03  | Checkout       | Overview total equals item total + tax                    | Positive | High     | ⬜     |

📄 Tests: [`tests/`](tests/)

## Setup

```bash
npm ci
npx playwright install --with-deps
```

Copy `.env.example` to `.env` in the project root (`.env` is gitignored) and fill in the values:

```bash
cp .env.example .env
```

Variables used by the tests:

```
STANDARD_USER=<standard user name>
LOCKED_USER=<locked out user name>
INVALID_USER=<any non-existent user name>
PASSWORD=<password>
```

## Run the tests

```bash
npx playwright test            # headless
npx playwright test --headed   # with browser
npx playwright show-report     # open the HTML report
```

## Project structure

```
pages/    Page Object Model classes (locators and actions, no assertions)
tests/    Spec files
```

## CI

GitHub Actions runs the tests on every push and pull request to `main`/`master`.
Credentials come from GitHub Secrets, and the HTML report is uploaded as an artifact.
