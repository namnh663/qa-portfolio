import { expect } from '@playwright/test';

export class HomePage {
    constructor(page) {
        this.page = page;

        // Define selectors
        this.aboutHeading = page.getByRole('heading', { name: 'About Me' });
        this.skillsHeading = page.getByRole('heading', { name: 'Skills' });
        this.certificatesHeading = page.getByRole('heading', { name: 'Certificates' });

        // Content sections
        this.aboutContent = page.getByTestId('about-content');
        this.skillsContainer = page.locator('div[data-testid^="skill-item-"]');

        // Dynamic test id patterns
        this.skillItem = (id) => page.getByTestId(`skill-item-${id}`);
        this.projectTitle = (id) => page.getByTestId(`project-title-${id}`);
        this.projectDescription = (id) => page.getByTestId(`project-description-${id}`);
        this.projectItem = page.getByTestId(/^project-item-/);
        this.certificateName = (id) => page.getByTestId(`certificate-name-${id}`);
        this.certificateOrg = (id) => page.getByTestId(`certificate-org-${id}`);
        this.certificateItem = page.getByTestId(/^certificate-item-/);

        // Navigation links
        this.homeLink = page.getByRole('link', { name: 'Home' });
        this.learningLink = page.getByRole('link', { name: 'Learning' });
        this.toolsButton = page.getByRole('button', { name: 'Tools' });
        this.toolsDropdownItems = [
            page.getByRole('link', { name: 'Airport Calculator' }),
            page.getByRole('link', { name: 'User Management' }),
            page.getByRole('link', { name: 'Character Counter' }),
            page.getByRole('link', { name: 'JSON Viewer' }),
            page.getByRole('link', { name: 'XPath Validator' }),
            page.getByRole('link', { name: 'Resources' })
        ];

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
            expect(this.skillsHeading).toBeVisible(),
            expect(this.certificatesHeading).toBeVisible()
        ]);
    }

    async verifyNavigationLinks() {
        await Promise.all([
            expect(this.homeLink).toBeVisible(),
            expect(this.learningLink).toBeVisible(),
            expect(this.toolsButton).toBeVisible()
        ]);

        // Click Tools dropdown to verify its menu items
        await this.toolsButton.click();

        await Promise.all(
            this.toolsDropdownItems.map((link) =>
                expect(link).toBeVisible({ timeout: 10000 })
            )
        );
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

    async verifyCertificates(certificates) {
        for (const cert of certificates) {
            await expect(this.certificateName(cert.id)).toBeVisible();
            await expect(this.certificateOrg(cert.id)).toBeVisible();
            await expect(this.certificateName(cert.id)).toHaveText(cert.name);
            await expect(this.certificateOrg(cert.id)).toContainText(cert.issuing_org);
        }
        return await this.certificateItem.count();
    }
}