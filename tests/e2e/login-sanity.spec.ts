import { test, expect } from '@playwright/test'

test.describe('Login Sanity', () => {
  test('Successfull login', async ({ page }) => {
    await page.goto('https://zdelka.mk/login')
    await expect(page.locator('login page')).toContainText('page should load successfully')
    await page.fill('email field', 'test@testyn.com')
    await page.fill('password field', 'Password123.')
    await page.check('terms and conditions checkbox')
    await page.click('Login button')
    await expect(page.locator('user dashboard or authenticated page')).toContainText('user should be logged in successfully')
  })

  test('Unsuccessfull login', async ({ page }) => {
    await page.goto('https://zdelka.mk/login')
    await expect(page.locator('login page')).toContainText('page should load successfully')
    await page.fill('email field', 'invalid@testyn.com')
    await page.fill('password field', 'Passd123')
    await page.check('terms and conditions checkbox')
    await page.click('Login button')
    await expect(page.locator('login page or error message')).toContainText('user should not be logged in and should remain on the login page or see an error')
  })

  test('Unsuccessfull login without checking the terms and conditions', async ({ page }) => {
    await page.goto('https://zdelka.mk/login')
    await expect(page.locator('login page')).toContainText('page should load successfully')
    await page.fill('email field', 'test@testyn.com')
    await page.fill('password field', 'Passd123')
    await page.click('Login button')
    await expect(page.locator('user should not be logged in')).toContainText('user should not be logged in successfully')
    await expect(page.locator('error message')).toContainText('an error message should be visible indicating terms and conditions must be accepted')
  })
})
