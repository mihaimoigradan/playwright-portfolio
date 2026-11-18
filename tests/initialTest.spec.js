const {test,expect} = require('@playwright/test')

test('Login with a valid user and see the inventory', async ({page}) => {
    await page.goto("/");
    await page.getByLabel('Username').fill('standard_user');
    await page.getByLabel('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();

    await expect (page).toHaveURL('/inventory.html')
    await expect(page.getByTestId('inventory-list')).toBeVisible();

})

test('Login attempt with an incorrect password', async ({page}) => {
    await page.goto("/");
    await page.getByLabel('Username').fill('standard_user');
    await page.getByLabel('Password').fill('wrong_password');
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page.getByRole('alert'))
        .toContainText('Epic sadface: Username and password do not match any user in this service');
})