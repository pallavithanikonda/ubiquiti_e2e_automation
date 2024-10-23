const { test, expect } = require('@playwright/test');

test.describe('Verify Header, Footer, and Social Media Icons', () => {
  test('Check header, footer, and social media logos after login', async ({ page }) => {
    // Login
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Verify the header (logo, shopping cart, and title)
    const header = page.locator('.header_secondary_container');
    await expect(header).toBeVisible();

    // Verify Swag Labs logo
    const logo = page.locator('.app_logo');
    await expect(logo).toBeVisible(); 

    // Verify shopping cart icon
    const cartIcon = page.locator('.shopping_cart_link');
    await expect(cartIcon).toBeVisible(); 

    const pageTitle = page.locator('.title');
    await expect(pageTitle).toHaveText('Products'); // Verify title text

    // Verify footer
    const footer = page.locator('footer');
    await expect(footer).toBeVisible(); // Footer should be visible

    const footerText = page.locator('footer .footer_copy');
    await expect(footerText).toContainText('© 2024 Sauce Labs'); // Verify footer text

    // Verify social media icons
    const twitterIcon = page.locator('.social_twitter a');
    await expect(twitterIcon).toHaveAttribute('href', 'https://twitter.com/saucelabs'); // Verify Twitter icon

    const facebookIcon = page.locator('.social_facebook a');
    await expect(facebookIcon).toHaveAttribute('href', 'https://www.facebook.com/saucelabs'); // Verify Facebook icon

    const linkedInIcon = page.locator('.social_linkedin a');
    await expect(linkedInIcon).toHaveAttribute('href', 'https://www.linkedin.com/company/sauce-labs/'); // Verify LinkedIn icon
  });
});
