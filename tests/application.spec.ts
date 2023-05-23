import {expect, test} from '@playwright/test';
import {saveJobToFavourites, checkIfJobIsAddedToFavourites, login} from "../src/helpers";

const url = "https://careers.notarealfluttersite.com/"

test('Can login to account', async ({page}) => {
    await page.goto(url)
    await login(page, 'Username', 'Password')
    await expect(page.locator('//*[@id="account-controls"]/div/div/a[2]')).toHaveText('Logout')
});

test('Can apply for a role, now user is logged in', async ({page}) => {
    const jobTitle = await saveJobToFavourites(page)
    expect(checkIfJobIsAddedToFavourites(page, jobTitle)).toBeTruthy()
});