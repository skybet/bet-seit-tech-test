import {expect, test} from '@playwright/test';
import {getNavLinksText, navigateToReviews} from "../src/helpers";

const url = "https://careers.notarealfluttersite.com/"

test('Top navigation shows expected links', async ({page}) => {
  await page.goto(url)
  const linkTexts = await getNavLinksText(page)
  expect(linkTexts).toStrictEqual(['About Flutter UKI', 'Working Here', 'Our Brands', 'Jobs', 'Teams', 'Early Careers'])
});

test('Can get to the Glass Door reviews of company', async ({page}) => {
  await page.goto(url)
  await navigateToReviews(page)
  expect(page.url()).toBe("https://glassdoor.com/reviews/flutter")
  await expect(page).toHaveTitle('Flutter')
  expect(page.locator(".rating").innerText()).toBe('4.9')
});
