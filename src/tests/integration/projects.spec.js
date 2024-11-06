import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DataHelper } from '../helpers/DataHelper';

test.describe('Home Page Projects Section Tests', () => {
    let dbData;
    let homePage;

    test.beforeAll(async () => {
        dbData = await DataHelper.fetchAllData();
    });

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('projects section displays correct project data', async () => {
        const displayedProjectsCount = await homePage.verifyProjects(dbData.projects);
        expect(displayedProjectsCount).toBe(dbData.projects.length);
    });
});