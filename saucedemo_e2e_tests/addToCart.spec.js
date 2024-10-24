const { test, expect } = require('@playwright/test');

test.describe('Add to Cart Flow', () => {
  test('Add products to the cart and list product names', async ({ page }) => {
    // Login
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // List to store added product names
    let addedProductNames = [];

    // Sort by price (low to high) and add the last product to the cart
    await page.selectOption('.product_sort_container', 'lohi');
    const products = await page.locator('.inventory_item');
    const lastProduct = products.nth(await products.count() - 1);
    const lastProductName = await lastProduct.locator('.inventory_item_name').textContent();
    addedProductNames.push(lastProductName);
    await lastProduct.locator('button').click();

    // Sort by name (A to Z) and add the top right product (second in grid) to the cart
    await page.selectOption('.product_sort_container', 'az');
    const topRightProduct = products.nth(1); // Index 1 selects the second product (top right)
    const topRightProductName = await topRightProduct.locator('.inventory_item_name').textContent();
    addedProductNames.push(topRightProductName);
    await topRightProduct.locator('button').click();

    // Verify cart items count
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // Log added product names
    console.log('Products added to the cart:', addedProductNames);
  });
});
