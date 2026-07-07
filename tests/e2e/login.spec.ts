import { test, expect } from '@playwright/test'

test.describe('Login Sanity', () => {
  test('Successfull login', async ({ page }) => {
    await page.goto('https://zdelka.mk/login')
    await expect(page.locator('login page')).toContainText('page loads successfully')
    await page.fill('email field', 'test@testyn.com')
    await page.fill('password field', 'Password123.')
    await page.check('terms and conditions checkbox')
    await page.click('Login button')
    await expect(page.locator('user dashboard or home page')).toContainText('user is logged in successfully')
  })

  test('Unsuccessfull login', async ({ page }) => {
    await page.goto('https://zdelka.mk/login')
    await expect(page.locator('login page')).toContainText('page loads successfully')
    await page.fill('email field', 'invalid@testyn.com')
    await page.fill('password field', 'Passd123')
    await page.check('terms and conditions checkbox')
    await page.click('Login button')
    await expect(page.locator('login page or error message')).toContainText('user is not logged in and remains on the login page or an error message is displayed')
  })

  test('Unsuccessfull login without checking the terms and conditions', async ({ page }) => {
    await page.goto('https://zdelka.mk/login')
    await expect(page.locator('login page')).toContainText('page loads successfully')
    await page.fill('email field', 'test@testyn.com')
    await page.fill('password field', 'Passd123')
    await page.click('Login button')
    await expect(page.locator('user is not logged in')).toContainText('user remains on the login page and is not logged in successfully')
    await expect(page.locator('error message')).toContainText('error message is visible indicating terms and conditions must be accepted')
  })
})
