import { test, expect } from '@playwright/test'

test.describe('Login page loads successfully', () => {
  test('Login page loads successfully', async ({ page }) => {
    // Test Case 1: Login page loads successfully
    await page.goto('https://www.zdelka.mk/login')
    await page.waitForSelector('Page to fully load')
    await expect(page.locator('Page URL in address bar')).toContainText('equals https://www.zdelka.mk/login')
    await expect(page.locator('Browser tab title')).toContainText('contains \'Зделка\'')
    // Test Case 2: Login form elements are visible
    await page.goto('https://www.zdelka.mk/login')
    await page.click('Cookie consent banner dismiss/accept button if present')
    await expect(page.locator('Email input field')).toContainText('is visible and interactable')
    await expect(page.locator('Password input field')).toContainText('is visible and interactable')
    await expect(page.locator('Login submit button')).toContainText('is visible and interactable')
    // Test Case 3: Both page sections are present
    await page.goto('https://www.zdelka.mk/login')
    await page.click('Cookie consent banner dismiss/accept button if present')
    // Scroll down to view the full page
    await expect(page.locator('\'Постоечки корисник\' (Existing User) section')).toContainText('is visible')
    await expect(page.locator('\'Нов Корисник\' (New User) section with Continue button')).toContainText('is visible')
    // Test Case 4: Email field accepts text input
    await page.goto('https://www.zdelka.mk/login')
    await page.click('Email input field with placeholder \'E-mail адреса\'')
    await page.fill('Email input field with placeholder \'E-mail адреса\'', 'test@example.com')
    await expect(page.locator('Email input field')).toContainText('has value \'test@example.com\'')
    // Test Case 5: Password field masks input
    await page.goto('https://www.zdelka.mk/login')
    await page.click('Password input field with placeholder \'Лозинка\'')
    await page.fill('Password input field with placeholder \'Лозинка\'', 'MyPassword123')
    await expect(page.locator('Password input field')).toContainText('has type \'password\' so characters are masked as dots or asterisks')
    // Test Case 6: Forgot password link is present and navigates correctly
    await page.goto('https://www.zdelka.mk/login')
    await expect(page.locator('\'Заборавена Лозинка\' (Forgotten Password) link')).toContainText('is visible')
    await page.click('\'Заборавена Лозинка\' (Forgotten Password) link')
    await expect(page.locator('Page URL in address bar')).toContainText('equals https://www.zdelka.mk/forgotten')
    // Test Case 7: Register link is present and navigates correctly
    await page.goto('https://www.zdelka.mk/login')
    await expect(page.locator('Registration link')).toContainText('is visible')
    await page.click('Registration link')
    await expect(page.locator('Page URL in address bar')).toContainText('equals https://www.zdelka.mk/register')
    // Test Case 8: Login with invalid email and password shows error
    await page.goto('https://www.zdelka.mk/login')
    await page.fill('Email input field', 'wrong@invalid.com')
    await page.fill('Password input field', 'WrongPass123!')
    await page.click('Login submit button')
    await expect(page.locator('Error message indicating invalid credentials')).toContainText('is visible')
    await expect(page.locator('Page URL in address bar')).toContainText('equals https://www.zdelka.mk/login')
    // Test Case 9: Login with correct email format but wrong password shows error
    await page.goto('https://www.zdelka.mk/login')
    await page.fill('Email input field', 'valid.format@example.com')
    await page.fill('Password input field', 'badpassword')
    await page.click('Login submit button')
    await expect(page.locator('Error message indicating incorrect credentials')).toContainText('is visible')
    await expect(page.locator('Page URL in address bar')).toContainText('equals https://www.zdelka.mk/login')
    // Test Case 10: Login with invalid email format shows validation error
    await page.goto('https://www.zdelka.mk/login')
    await page.fill('Email input field', 'notanemail')
    await page.fill('Password input field', 'SomePass1!')
    await page.click('Login submit button')
    await expect(page.locator('Email field validation error or browser-native validation indicator')).toContainText('is visible indicating invalid email format')
    await expect(page.locator('Page URL in address bar')).toContainText('equals https://www.zdelka.mk/login')
    // Test Case 11: Login with empty email field shows error or prevents submission
    await page.goto('https://www.zdelka.mk/login')
    await page.fill('Password input field', 'SomePass1!')
    await page.click('Login submit button')
    await expect(page.locator('Email field required validation error or error message')).toContainText('is visible indicating email field cannot be empty')
    await expect(page.locator('Page URL in address bar')).toContainText('equals https://www.zdelka.mk/login')
    // Test Case 12: Login with empty password field shows error or prevents submission
    await page.goto('https://www.zdelka.mk/login')
    await page.fill('Email input field', 'test@example.com')
    await page.click('Login submit button')
    await expect(page.locator('Password field required validation error or error message')).toContainText('is visible indicating password field cannot be empty')
    await expect(page.locator('Page URL in address bar')).toContainText('equals https://www.zdelka.mk/login')
    // Test Case 13: Login with both fields empty shows error or prevents submission
    await page.goto('https://www.zdelka.mk/login')
    await page.click('Login submit button')
    await expect(page.locator('Validation feedback message or inline field errors')).toContainText('is visible indicating required fields are empty')
    await expect(page.locator('Page URL in address bar')).toContainText('equals https://www.zdelka.mk/login')
    // Test Case 14: Login with whitespace-only email shows error
    await page.goto('https://www.zdelka.mk/login')
    await page.fill('Email input field', '     ')
    await page.fill('Password input field', 'SomePass1!')
    await page.click('Login submit button')
    await expect(page.locator('Error message indicating invalid or empty email')).toContainText('is visible')
    await expect(page.locator('Page URL in address bar')).toContainText('equals https://www.zdelka.mk/login')
    // Test Case 15: SQL injection payload in email field does not cause server error
    await page.goto('https://www.zdelka.mk/login')
    await page.fill('Email input field', '\' OR \'1\'=\'1')
    await page.fill('Password input field', 'anypassword')
    await page.click('Login submit button')
    await expect(page.locator('Authentication error message')).toContainText('is visible and no 500 server error page or blank page is shown')
    await expect(page.locator('Page URL in address bar')).toContainText('equals https://www.zdelka.mk/login')
    // Test Case 16: XSS payload in email field is not executed
    await page.goto('https://www.zdelka.mk/login')
    await page.fill('Email input field', '<script>alert(\'xss\')</script>')
    await page.fill('Password input field', 'somepassword')
    await page.click('Login submit button')
    await expect(page.locator('JavaScript alert dialog')).toContainText('is not present — no XSS alert has been triggered')
    await expect(page.locator('Standard error message on the login page')).toContainText('is visible')
    await expect(page.locator('Page URL in address bar')).toContainText('equals https://www.zdelka.mk/login')
    // Test Case 17: Successful login redirects away from login page
    await page.goto('https://www.zdelka.mk/login')
    await page.fill('Email input field', 'valid_account_email@example.com')
    await page.fill('Password input field', 'ValidAccountPassword')
    await page.click('Login submit button')
    await expect(page.locator('Page URL in address bar')).toContainText('does not equal https://www.zdelka.mk/login — user has been redirected to account dashboard or homepage')
    await expect(page.locator('Error message')).toContainText('is not present')
    // Test Case 18: Login form is visible on mobile viewport (375 x 812)
    // Set browser viewport to 375 x 812 px using developer tools or viewport emulation
    await page.goto('https://www.zdelka.mk/login')
    await page.click('Cookie consent banner dismiss/accept button if present')
    await expect(page.locator('Email input field')).toContainText('is fully visible without horizontal scrolling at 375px viewport width')
    await expect(page.locator('Password input field')).toContainText('is fully visible without horizontal scrolling at 375px viewport width')
    await expect(page.locator('Login submit button')).toContainText('is fully visible without horizontal scrolling at 375px viewport width')
    // Test Case 19: Login form is visible on tablet viewport (768 x 1024)
    // Set browser viewport to 768 x 1024 px using developer tools or viewport emulation
    await page.goto('https://www.zdelka.mk/login')
    await page.click('Cookie consent banner dismiss/accept button if present')
    await expect(page.locator('Email input field')).toContainText('is fully visible and correctly laid out without horizontal scrolling at 768px viewport width')
    await expect(page.locator('Password input field')).toContainText('is fully visible and correctly laid out without horizontal scrolling at 768px viewport width')
    await expect(page.locator('Login submit button')).toContainText('is fully visible and correctly laid out without horizontal scrolling at 768px viewport width')
  })
})
