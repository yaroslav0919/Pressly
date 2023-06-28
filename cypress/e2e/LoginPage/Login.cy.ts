describe('login page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  it('should render login page', () => {
    cy.get('h1').should('contain', 'Welcome back');
    cy.get('form').within(() => {
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name="password"]').should('exist');
      cy.get('button[type="submit"]').should('exist');
      cy.get('button').contains('Sign in with Google').should('exist');
      cy.get('input[name="remember"]').should('exist');
      cy.get('a[href="/password-recovery"]').should('exist');
      cy.get('a[href="/signup"]').should('exist');
    });
  });
  it('should navigate to signup page when clicking on signup link', () => {
    cy.get('a[href="/signup"]').click();
    cy.url().should('include', '/signup');
  });
  it('should navigate to password recovery page when clicking on password recovery link', () => {
    cy.get('a[href="/password-recovery"]').click();
    cy.url().should('include', '/password-recovery');
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
  it('should display error message when submitting invalid email or password', () => {
    cy.get('#email').type('test@gmail.com');
    cy.get('#password').type('invalid-password');
    cy.get('button[type="submit"]').click();
    cy.get('[data-testId="error-message"]').should('be.visible');
  });
});
