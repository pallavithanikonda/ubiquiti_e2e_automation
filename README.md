# Saucedemo E2E Tests
Repository to host e2e automation test suite for https://www.saucedemo.com/


This project contains end-to-end tests for the login and purchase flows on [Saucedemo](https://www.saucedemo.com/).

## Setup

1. Install dependencies

```bash
npm install
```

2. Set Up Playwright
```bash
npm init playwright@latest
```

3. Run the tests
```bash
npx playwright test
```

## How to run the tests:

Inside that directory, you can run several commands:
```bash
npx playwright test
#Runs the end-to-end tests.

npx playwright test --ui
#Starts the interactive UI mode.

npx playwright test --project=chromium
#Runs the tests only on Desktop Chrome.

npx playwright test login
#Runs the tests in a specific file.

npx playwright test --debug
#Runs the tests in debug mode.

#I suggest that you begin by typing:
npx playwright test

```
## Features
- **Login Flow:** Verifies standard and locked-out users.
- **Purchase Flow:** Sort products, add to cart, and complete a purchase.
- **UI Tests:** Verifies header and footer.

## Bonus
Additional smoke tests are included to verify essential UI elements.
