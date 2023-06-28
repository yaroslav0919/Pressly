describe('login page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });
  it('should render login page', () => {
    cy.get('h1').should('contain', 'Create an account');
    cy.get('form').within(() => {
      cy.get('input[name="name"]').should('exist');
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name="password"]').should('exist');
      cy.get('button[type="submit"]').should('exist');
      cy.get('button').contains('Sign up with Google').should('exist');
      cy.get('a[href="/login"]').should('exist');
    });
  });
  it('should navigate to login page when clicking on login link', () => {
    cy.get('a[href="/login"]').click();
    cy.url().should('include', '/login');
  });
  it('should display error message when submitting empty form', () => {
    cy.get('button[type="submit"]').click();
    cy.get('[data-testId="error-message"]').should('be.visible');
  });
  it('should display error message when submitting invalid email', () => {
    cy.get('#email').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.get('[data-testId="error-message"]')
      .should('be.visible')
      .and('contain', 'Please fill in a valid email');
  });
  it('should display error message when submitting invalid password', () => {
    cy.get('#password').type('invalid-password');
    cy.get('button[type="submit"]').click();
    cy.get('[data-testId="error-message"]').should('be.visible');
  });
});
