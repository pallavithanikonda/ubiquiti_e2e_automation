const { test, expect } = require('@playwright/test');

test.describe('Login Tests', () => {
  test('Locked out user cannot login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page.locator('.error-message-container')).toBeVisible();
  });

  test('Standard user can login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page.locator('.inventory_list')).toBeVisible();
  });
});
