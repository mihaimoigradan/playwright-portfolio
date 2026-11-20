# Playwright Portfolio

End-to-end tests written with [Playwright](https://playwright.dev) (JavaScript) against the demo app [Swag Labs](https://www.saucedemo.com).

> Work in progress. This README is temporary.

## What's covered so far

- Login with a valid user
- Login with an invalid user
- Login with a locked-out user

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
