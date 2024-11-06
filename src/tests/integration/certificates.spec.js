import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DataHelper } from '../helpers/DataHelper';

test.describe('Home Page Certificates Section Tests', () => {
    let dbData;
    let homePage;

    test.beforeAll(async () => {
        dbData = await DataHelper.fetchAllData();
    });

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('certificates section displays all certificates', async () => {
        const displayedCertificatesCount = await homePage.verifyCertificates(dbData.certificates);
        expect(displayedCertificatesCount).toBe(dbData.certificates.length);
    });
});