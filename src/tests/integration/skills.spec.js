import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DataHelper } from '../helpers/DataHelper';

test.describe('Home Page Skills Section Tests', () => {
    let dbData;
    let homePage;

    test.beforeAll(async () => {
        dbData = await DataHelper.fetchAllData();
    });

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('skills section displays all skills from database', async () => {
        const displayedSkillsCount = await homePage.verifySkills(dbData.skills);
        expect(displayedSkillsCount).toBe(dbData.skills.length);
    });
});