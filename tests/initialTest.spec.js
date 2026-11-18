const {test,expect} = require('@playwright/test')

test ('Initial test - go to baseUrl', async ({page}) => {
    await page.goto("/");
})