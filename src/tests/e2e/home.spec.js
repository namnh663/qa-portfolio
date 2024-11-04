import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test('homepage has correct title and main sections', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle(/Brian/);
    
    // Verify main sections are present
    await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Work Experience' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Skills' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Certificates' })).toBeVisible();
  });

  test('navigation links work correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check navbar links
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Resources' })).toBeVisible();
  });

  test('footer contains correct social links', async ({ page }) => {
    await page.goto('/');
    
    // Verify social links
    await expect(page.getByRole('link', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'GitHub' })).toBeVisible();
  });

  test('content sections load data correctly', async ({ page }) => {
    await page.goto('/');
    
    // Wait for and verify dynamic content
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#skills')).toBeVisible();
    await expect(page.locator('#projects')).toBeVisible();
  });
});
