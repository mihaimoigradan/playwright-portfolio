# Playwright Portfolio

[![Playwright Tests](https://github.com/mihaimoigradan/playwright-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/mihaimoigradan/playwright-portfolio/actions/workflows/playwright.yml)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Playwright](https://img.shields.io/badge/Playwright-1.65-2EAD33)

End-to-end UI tests for the [Sauce Demo](https://www.saucedemo.com) shop, written with
[Playwright](https://playwright.dev) and JavaScript.

The suite covers the main shopping flow (login, inventory, product details, cart and checkout)
and runs on **Chromium, Firefox and WebKit**, locally and in GitHub Actions.

## ✨ Key Features

| Feature                  | Description                                                        |
| ------------------------ | ------------------------------------------------------------------ |
| **Page Object Model**    | Locators and actions in `pages/`; assertions only in tests         |
| **Custom fixtures**      | Page objects provided to tests via `fixtures/pages.js`             |
| **Session reuse**        | Log in once in a setup project, reuse `storageState` in every test |
| **Multi-browser**        | Chromium, Firefox and WebKit                                       |
| **Test isolation**       | Fresh browser context per test, no shared state or run order       |
| **Parallel execution**   | Fully parallel locally; 1 worker + 2 retries on CI for stability   |
| **Stable navigation**    | Page-changing actions wait for the new URL before continuing       |
| **Business-rule checks** | Cart price vs inventory, total = item total + tax                  |
| **Traceability & tags**  | Scenario IDs in test titles, `@smoke` for high-priority runs       |
| **CI/CD**                | GitHub Actions on every push/PR; credentials from GitHub Secrets   |
| **Reporting**            | HTML report with a trace for every test, uploaded as a CI artifact |

## 🧪 Test Coverage

| ID      | Area           | Scenario                                                  | Type     | Priority |
| ------- | -------------- | --------------------------------------------------------- | -------- | -------- |
| AUTH-01 | Authentication | Login with a valid user shows the inventory               | Positive | High     |
| AUTH-02 | Authentication | Login with an invalid user shows an error                 | Negative | High     |
| AUTH-03 | Authentication | Login with a locked-out user shows an error               | Negative | High     |
| INV-01  | Inventory      | Add a product to the cart from the inventory              | Positive | High     |
| INV-02  | Inventory      | Remove a product from the cart from the inventory         | Positive | Medium   |
| INV-03  | Inventory      | Open a product's details page                             | Positive | Medium   |
| PROD-01 | Product        | Product details show name, description and price          | Positive | Medium   |
| PROD-02 | Product        | Add to cart / Remove from the product details page        | Positive | Medium   |
| PROD-03 | Product        | Back to products returns to the inventory                 | Positive | Low      |
| CART-01 | Cart           | Added products appear in the cart with correct name/price | Positive | High     |
| CART-02 | Cart           | Continue shopping returns to the inventory                | Positive | Low      |
| CHK-01  | Checkout       | Complete checkout end-to-end shows confirmation           | Positive | High     |
| CHK-02  | Checkout       | Continue with empty information fields shows an error     | Negative | High     |
| CHK-03  | Checkout       | Overview total equals item total + tax                    | Positive | High     |

Each test title starts with its ID (e.g. `CHK-03 Overview total equals…`), so a failure in the
report maps straight back to this table. High-priority scenarios are tagged `@smoke`.

📄 Tests: [`tests/`](tests/)

## Out of scope

Deliberately not covered in this suite:

- Sauce Demo's other test users (`problem_user`, `error_user`, `visual_user`, `performance_glitch_user`),
  which simulate specific bugs
- Product sorting, the side menu (logout, reset app state) and multi-product carts
- Visual regression, accessibility and performance testing
- API testing (Sauce Demo has no public API)

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
npx playwright test                       # all tests, all browsers (headless)
npx playwright test --project=chromium    # one browser only
npx playwright test --grep @smoke         # high-priority tests only
npx playwright test --headed              # with a visible browser
npx playwright test --ui                  # interactive UI mode
npx playwright show-report                # open the HTML report
```

## Project structure

```
fixtures/   Custom fixture that provides the page objects to tests
pages/      Page Object Model classes (locators and actions, no assertions)
tests/      Spec files, plus auth.setup.js (logs in once and saves the session)
.github/    GitHub Actions workflow
```

## CI

GitHub Actions runs the full suite on every push and pull request to `main`/`master`.
Credentials come from GitHub Secrets, and the HTML report (with traces) is uploaded as an
artifact for 30 days. On CI, failed tests are retried up to 2 times.
