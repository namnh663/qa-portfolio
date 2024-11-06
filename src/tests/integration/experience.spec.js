import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DataHelper } from '../helpers/DataHelper';

test.describe('Home Page Experience Section Tests', () => {
    let dbData;
    let homePage;

    test.beforeAll(async () => {
        dbData = await DataHelper.fetchAllData();
    });

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('work experience displays correct company and roles', async () => {
        const displayedExperienceCount = await homePage.verifyExperience(dbData.experience);
        expect(displayedExperienceCount).toBe(dbData.experience.length);
    });

    test('data ordering is correct for work experience', async () => {
        const isDescending = await homePage.verifyExperienceDatesOrder();
        expect(isDescending).toBe(true);
    });
});