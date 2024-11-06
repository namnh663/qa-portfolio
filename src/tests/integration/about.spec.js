import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DataHelper } from '../helpers/DataHelper';

test.describe('Home Page About Section Tests', () => {
    let dbData;
    let homePage;

    test.beforeAll(async () => {
        dbData = await DataHelper.fetchAllData();
    });

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('about section displays correct content from database', async () => {
        const aboutContent = await homePage.aboutContent.textContent();
        const normalizedContent = aboutContent.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
        const normalizedDbContent = dbData.about.description.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
        expect(normalizedContent).toBe(normalizedDbContent);
    });
});