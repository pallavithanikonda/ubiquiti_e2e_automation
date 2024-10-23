const { test, expect } = require('@playwright/test');

test.describe('Add to Cart Flow', () => {
  test('Add products to the cart', async ({ page }) => {
    // Login
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Sort by price (low to high) and add the last product to the cart
    await page.selectOption('.product_sort_container', 'lohi');
    const products = await page.locator('.inventory_item');
    const lastProduct = products.nth(await products.count() - 1);
    await lastProduct.locator('button').click();  // Add last product to cart

    // Sort by name (A to Z) and add the first product to the cart
    await page.selectOption('.product_sort_container', 'az');
    await products.nth(0).locator('button').click();  // Add first product to cart

    // Verify cart items count
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });
});
