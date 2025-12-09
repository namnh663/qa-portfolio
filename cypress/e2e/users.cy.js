describe('User Management Page', () => {
  beforeEach(() => {
    // Visit the User Management page before each test
    cy.visit('/user-management');
  });

  it('should display the User Management page correctly', () => {
    // Check if the page title is correct
    cy.contains('h1', 'User Data Management').should('be.visible');

    // Check if the search input is visible
    cy.get('input#search-users').should('be.visible');

    // View mode toggle buttons should be present
    cy.get('button[aria-label="Grid view"]').should('be.visible');
    cy.get('button[aria-label="List view"]').should('be.visible');
  });

  it('should display a list of users', () => {
    // Check if the user grid/list is visible and has items
    cy.get('main .grid').should('be.visible');
    cy.get('main .grid').children().its('length').should('be.greaterThan', 0);
  });

  it('should filter users based on search input', () => {
    // Type a search term into the search input
    cy.get('input#search-users').type('George Bluth');

    // Check if the filtered user list shows the searched user
    cy.contains('h3', 'George Bluth', { timeout: 10000 }).should('be.visible');
  });

  it('should navigate to the next page of users', () => {
    // Click the "Next" button
    cy.contains('button', 'Next').click();

    // Check if the current page number is updated
    cy.contains('span', 'Page 2 of').should('be.visible');
  });

  it('should display user profile on "View Profile" button click', () => {
    // Click the "View Profile" button of the first user
    cy.contains('button', 'View Profile').first().click();

    // Check if the user profile modal is displayed
    cy.get('#user-profile-modal').should('be.visible');

    // Check if the user profile details are displayed
    cy.get('#user-profile-modal').within(() => {
      cy.contains('h3, h2', 'User Profile').should('be.visible');
      cy.get('button[aria-label="Close profile modal"]').should('be.visible');
    });
  });

  it('should close user profile on "Close Profile" button click', () => {
    // Click the "View Profile" button of the first user
    cy.contains('button', 'View Profile').first().click();

    // Click the "Close Profile" button
    cy.get('#user-profile-modal').find('button[aria-label="Close profile modal"]').first().click();

    // Check if the user profile modal is closed
    cy.get('#user-profile-modal').should('not.exist');
  });
});