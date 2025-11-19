import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('HomePage Unit Tests', () => {
  /** @type {import('../pages/HomePage').HomePage} */
  let homePage;
  
  let mockPage;

  test.beforeEach(() => {
    mockPage = {
      getByRole: () => ({ click: () => Promise.resolve() }),
      getByTestId: () => ({ isVisible: () => Promise.resolve(true) }),
      locator: () => ({ count: () => Promise.resolve(1) })
    };
    homePage = new HomePage(mockPage);
  });

  test('should verify all heading elements exist', async () => {
    expect(homePage.aboutHeading).toBeDefined();
    expect(homePage.skillsHeading).toBeDefined();
    expect(homePage.certificatesHeading).toBeDefined();
  });

  test('should verify navigation links exist', async () => {
    expect(homePage.homeLink).toBeDefined();
  });
});