import { expect } from '@playwright/test';

export class HomePage {
    constructor(page) {
        this.page = page;

        // Define selectors
        this.aboutHeading = page.getByRole('heading', { name: 'About Me' });
        this.workExperienceHeading = page.getByRole('heading', { name: 'Work Experience' });
        this.skillsHeading = page.getByRole('heading', { name: 'Skills' });
        this.projectsHeading = page.getByRole('heading', { name: 'Projects' });
        this.certificatesHeading = page.getByRole('heading', { name: 'Certificates' });

        // Content sections
        this.aboutContent = page.getByTestId('about-content');
        this.skillsContainer = page.locator('div[data-testid^="skill-item-"]');
        this.experienceDates = page.locator('#experience .text-sm');

        // Dynamic test id patterns
        this.skillItem = (id) => page.getByTestId(`skill-item-${id}`);
        this.projectTitle = (id) => page.getByTestId(`project-title-${id}`);
        this.projectDescription = (id) => page.getByTestId(`project-description-${id}`);
        this.projectItem = page.getByTestId(/^project-item-/);
        this.experienceRole = (id) => page.getByTestId(`experience-role-${id}`);
        this.experienceDate = (id) => page.getByTestId(`experience-date-${id}`);
        this.experienceDescription = (id) => page.getByTestId(`experience-description-${id}`);
        this.experienceItem = page.getByTestId(/^experience-item-/);
        this.certificateName = (id) => page.getByTestId(`certificate-name-${id}`);
        this.certificateOrg = (id) => page.getByTestId(`certificate-org-${id}`);
        this.certificateItem = page.getByTestId(/^certificate-item-/);

        // Navigation links
        this.homeLink = page.getByRole('link', { name: 'Home' });
        this.blogLink = page.getByRole('link', { name: 'Blog' });
        this.learningLink = page.getByRole('link', { name: 'Learning' });
        this.toolsButton = page.getByRole('button', { name: 'Tools ▼' });
        this.airportCalculatorLink = page.locator('a[href="/airport"]'); // Changed to CSS selector
        this.jsonViewerLink = page.locator('a[href="/json-viewer"]'); // Changed to CSS selector
        this.resourcesLink = page.locator('a[href="/resources"]'); // Changed to CSS selector

        // Social links
        this.emailLink = page.getByRole('link', { name: 'Email' });
        this.linkedInLink = page.getByRole('link', { name: 'LinkedIn' });
        this.githubLink = page.getByRole('link', { name: 'GitHub' });
    }

    async goto() {
        await this.page.goto('/');
    }

    async verifyMainSections() {
        await Promise.all([
            expect(this.aboutHeading).toBeVisible(),
            expect(this.workExperienceHeading).toBeVisible(),
            expect(this.skillsHeading).toBeVisible(),
            expect(this.projectsHeading).toBeVisible(),
            expect(this.certificatesHeading).toBeVisible()
        ]);
    }

    async verifyNavigationLinks() {
        await Promise.all([
            expect(this.homeLink).toBeVisible(),
            expect(this.blogLink).toBeVisible(),
            expect(this.learningLink).toBeVisible(),
            expect(this.toolsButton).toBeVisible()
        ]);

        // Click Tools dropdown to verify its menu items
        await this.toolsButton.click();

        await Promise.all([
            expect(this.airportCalculatorLink).toBeVisible({ timeout: 10000 }),
            expect(this.jsonViewerLink).toBeVisible({ timeout: 10000 }),
            expect(this.resourcesLink).toBeVisible({ timeout: 10000 })
        ]);
    }

    async verifySocialLinks() {
        await Promise.all([
            expect(this.emailLink).toBeVisible(),
            expect(this.linkedInLink).toBeVisible(),
            expect(this.githubLink).toBeVisible()
        ]);
    }

    async verifySkills(skills) {
        for (const skill of skills) {
            await expect(this.skillItem(skill.id)).toBeVisible();
            await expect(this.skillItem(skill.id)).toHaveText(skill.skill);
        }
        return await this.skillsContainer.count();
    }

    async verifyProjects(projects) {
        for (const project of projects) {
            await expect(this.projectTitle(project.id)).toBeVisible();
            await expect(this.projectDescription(project.id)).toBeVisible();
            await expect(this.projectTitle(project.id)).toHaveText(project.name);
            await expect(this.projectDescription(project.id)).toHaveText(project.description);
        }
        return await this.projectItem.count();
    }

    async verifyExperience(experience) {
        for (const exp of experience) {
            await expect(this.experienceRole(exp.id)).toBeVisible();
            await expect(this.experienceRole(exp.id)).toHaveText(`${exp.role} at ${exp.company}`);
            await expect(this.experienceDate(exp.id)).toBeVisible();
            await expect(this.experienceDescription(exp.id)).toBeVisible();
        }
        return await this.experienceItem.count();
    }

    async verifyCertificates(certificates) {
        for (const cert of certificates) {
            await expect(this.certificateName(cert.id)).toBeVisible();
            await expect(this.certificateOrg(cert.id)).toBeVisible();
            await expect(this.certificateName(cert.id)).toHaveText(cert.name);
            await expect(this.certificateOrg(cert.id)).toContainText(cert.issuing_org);
        }
        return await this.certificateItem.count();
    }

    async verifyExperienceDatesOrder() {
        const dates = await this.experienceDates.allTextContents();
        return dates.every((date, index) => {
            if (index === 0) return true;
            const currentDate = new Date(date.split('-')[0]);
            const previousDate = new Date(dates[index - 1].split('-')[0]);
            return currentDate <= previousDate;
        });
    }
}