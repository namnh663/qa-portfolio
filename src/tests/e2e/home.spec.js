import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Homepage Tests', () => {
  /** @type {import('../pages/HomePage').HomePage} */
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('homepage has correct title and main sections', async ({ page }) => {
    await expect(page).toHaveTitle(/Brian/);
    await homePage.verifyMainSections();
  });

  test('navigation links work correctly', async () => {
    await homePage.verifyNavigationLinks();
  });

  test('footer contains correct social links', async () => {
    await homePage.verifySocialLinks();
  });
});