import {Page} from "@playwright/test";

export async function login(page: Page, username: string, password: string) {
  await page.locator('//*[@id="account-controls"]/div/div/a[2]').click()
  await page.locator('#username').fill(username)
  await page.locator('#password').fill(password)
  await page.locator('#login').click()
  console.log(`Logged in as ${username}`)
}

export async function navigateToReviews(page: Page) {
  const reviewsLink = await page.getByRole('link', {name: 'Our Reviews'})
  await reviewsLink.click()
  await page.waitForTimeout(5000)
}

export async function getNavLinksText(page: Page) {
  const linkLocators = await page.locator('//*[@id="topnav"]/ul/li').all()
  return await Promise.all(linkLocators.map((l) => l.innerText()))
}

export async function saveJobToFavourites(page: Page) {
  const jobCards = await page.locator('//*[@id="job-listings"]/form/div/div[3]/div[2]/div').all()
  if (jobCards.length === 0) {
    throw Error('No jobs visible')
  }
  const randomChoice = jobCards[Math.floor(Math.random() * jobCards.length)]
  await randomChoice.locator('button.save-to-favourites').click()
  const chosenName = randomChoice.locator('div.card-title').innerText()
  console.log(`Added ${chosenName} to favourites`)
  return chosenName
}

export async function checkIfJobIsAddedToFavourites(page: Page, plantName: string) {
  await page.locator('#heartBtn').click()
  const jobItemNameLocators = await page.locator('#jobElement ._1g0i4xio ._1vfeuiq > p > a').all()
  const names = await Promise.all(jobItemNameLocators.map((l) => l.textContent()))
  return names.includes(plantName)
}
