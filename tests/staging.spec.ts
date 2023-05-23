import { test, expect } from '@playwright/test';
import {
  addRandomPlantToCart,
  getNavLinksText,
  login,
  loginNavigateToTopNavPlants,
  navigateToReviews,
  checkIfPlantIsInCart
} from "../src/helpers";

const url = "https://staging.notrealplantshop.com/"

test('Top navigation shows expected links', async ({page}) => {
  await page.goto(url)
  const linkTexts = await getNavLinksText(page)
  // make sure only have links we expect
  expect(linkTexts).toStrictEqual(['House Plants', 'Flowers', 'Pots', 'Plant Care', 'Sale'])
});

test('Can get to reviews of site', async ({page}) => {
  await page.goto(url)
  await navigateToReviews(page)
  // make sure on review page for our shop
  expect(page.url()).toBe("https://plantshopreviews.com/notrealplantshop")
  await expect(page).toHaveTitle('Not Real Plant Shop Reviews')
  // make sure score what we expect
  expect(page.locator(".score").innerText()).toBe('4.9')
});

test('Can login to account', async ({ page }) => {
  await page.goto(url)
  await login(page, 'stagingUsername', 'stagingPassword')
  await expect(page.locator('//*[@id="account-controls"]/div/div/a[2]')).toHaveText('Logout')
});

test('Can add plant to basket', async ({ page }) => {
  await page.goto(url)
  await loginNavigateToTopNavPlants(page, 'stagingUsername', 'stagingPassword')
  const plantName = await addRandomPlantToCart(page)
  expect(checkIfPlantIsInCart(page, plantName)).toBeTruthy()
});
