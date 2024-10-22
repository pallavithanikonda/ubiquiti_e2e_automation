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


## Tests
- **Login Flow:** Verifies standard and locked-out users.
- **Purchase Flow:** Sort products, add to cart, and complete a purchase.
- **UI Tests:** Verifies header and footer.

## Bonus
Additional smoke tests are included to verify essential UI elements.
