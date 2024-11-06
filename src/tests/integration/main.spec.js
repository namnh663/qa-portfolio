import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Home Page Main Structure Tests', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('main sections are visible', async () => {
        await homePage.verifyMainSections();
        await homePage.verifyNavigationLinks();
        await homePage.verifySocialLinks();
    });
});