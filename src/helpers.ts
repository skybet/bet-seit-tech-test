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
  // wait for review site to load
  await page.waitForTimeout(5000)
}

export async function getNavLinksText(page: Page) {
  const linkLocators = await page.locator('//*[@id="topnav"]/ul/li').all()
  return await Promise.all(linkLocators.map((l) => l.innerText()))
}

export async function loginNavigateToTopNavPlants(page: Page, username: string, password: string) {
  await page.locator('//*[@id="account-controls"]/div/div/a[2]').click()
  await page.locator('#username').fill(username)
  await page.locator('#password').fill(password)
  await page.locator('#login').click()
  const plantLink = await page.locator('//*[@id="topnav"]/ul/li').getByText('Plants')
  await plantLink.click()
}

export async function addRandomPlantToCart(page: Page) {
  const itemCards = await page.locator('//*[@id="product-listings"]/form/div/div[3]/div[2]/div').all()
  if (itemCards.length === 0) {
    throw Error('Item array empty')
  }
  const randomChoice = itemCards[Math.floor(Math.random()*itemCards.length)]
  await randomChoice.locator('button.add-to-cart').click()
  const chosenName = randomChoice.locator('div.card-title').innerText()
  console.log(`Added ${chosenName} to cart`)
  return chosenName
}

export async function checkIfPlantIsInCart(page: Page, plantName: string) {
  await page.locator('#cartBtn').click()
  const cartItemNameLocators = await page.locator('#cartElement ._1g0i4xio ._1vfeuiq > p > a').all()
  const names = await Promise.all(cartItemNameLocators.map((l) => l.textContent()))
  return names.includes(plantName)
}
