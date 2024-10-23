const { test, expect } = require('@playwright/test');

test.describe('Product Purchase Flow', () => {
  test('Complete a product purchase', async ({ page }) => {
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

    // Proceed to checkout
    await page.click('.shopping_cart_link');
    // Validate the added products are available in the cart
    const cartItems = await page.locator('.cart_item');
    expect(await cartItems.count()).toBe(2); // Ensure 2 items are in the cart

    // Verify that the product names in the cart match the added products
    for (let i = 0; i < addedProductNames.length; i++) {
      const cartProductName = await cartItems.nth(i).locator('.inventory_item_name').textContent();
      expect(cartProductName).toBe(addedProductNames[i]); // Fail if names don't match
    }
    
    await page.click('#checkout');
    console.log('Products added to the cart matches with the products added, hence checkout');
    await page.fill('#first-name', 'Pallavi');
    await page.fill('#last-name', 'Thanikonda');
    await page.fill('#postal-code', '12639');
    await page.click('#continue');
    console.log('Registration done');

    // Verify items to purchase matches those in the cart
    const cartItemsToPurchase = await page.locator('.cart_item');
    expect(await cartItemsToPurchase.count()).toBe(2);

    // Complete purchase
    await page.click('#finish');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    console.log('Completed the purchase');

  });
});
