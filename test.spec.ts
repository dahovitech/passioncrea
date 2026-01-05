import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  // Listen for console errors
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Navigate to the page
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });

  // Wait a bit for any async operations
  await page.waitForTimeout(2000);

  // Check page loaded
  await expect(page).toHaveTitle(/Passion/);

  // Log any console errors found
  if (consoleErrors.length > 0) {
    console.log('Console errors found:', consoleErrors);
  }

  // Fail if there are critical errors (ignore some non-critical ones)
  const criticalErrors = consoleErrors.filter(err =>
    !err.includes('favicon') &&
    !err.includes('Download the React DevTools')
  );

  expect(criticalErrors.length).toBe(0);
});
