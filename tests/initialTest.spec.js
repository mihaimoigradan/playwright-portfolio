const {test,expect} = require('@playwright/test')

test ('Login test', async ({page}) => {
    await page.goto("/");
    await page.getByLabel('Username').fill('standard_user');
    await page.getByLabel('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page.getByTestId('inventory-list')).toBeVisible();

})