import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DataHelper } from '../helpers/DataHelper';

test.describe('Home Page Data Integration Tests', () => {
    let dbData;
    let homePage;

    test.beforeAll(async () => {
        dbData = await DataHelper.fetchAllData();
    });

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('main sections are visible', async () => {
        await homePage.verifyMainSections();
        await homePage.verifyNavigationLinks();
        await homePage.verifySocialLinks();
    });

    test('about section displays correct content from database', async () => {
        const aboutContent = await homePage.aboutContent.textContent();
        const normalizedContent = aboutContent.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
        const normalizedDbContent = dbData.about.description.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
        expect(normalizedContent).toBe(normalizedDbContent);
    });

    test('skills section displays all skills from database', async () => {
        const displayedSkillsCount = await homePage.verifySkills(dbData.skills);
        expect(displayedSkillsCount).toBe(dbData.skills.length);
    });

    test('projects section displays correct project data', async () => {
        const displayedProjectsCount = await homePage.verifyProjects(dbData.projects);
        expect(displayedProjectsCount).toBe(dbData.projects.length);
    });

    test('work experience displays correct company and roles', async () => {
        const displayedExperienceCount = await homePage.verifyExperience(dbData.experience);
        expect(displayedExperienceCount).toBe(dbData.experience.length);
    });

    test('certificates section displays all certificates', async () => {
        const displayedCertificatesCount = await homePage.verifyCertificates(dbData.certificates);
        expect(displayedCertificatesCount).toBe(dbData.certificates.length);
    });

    test('data ordering is correct for work experience', async () => {
        const isDescending = await homePage.verifyExperienceDatesOrder();
        expect(isDescending).toBe(true);
    });
});