describe('password recovery page', () => {
  beforeEach(() => {
    cy.visit('/password-recovery');
  });
  it('should render password recovery page', () => {
    cy.get('h1').should('contain', 'Recover Password');
    cy.get('[data-testId="back-btn"]').should('exist');
  });
  it('should render a password recovery form', () => {
    cy.get('form').within(() => {
      cy.get('input[name="email"]').should('exist');
      cy.get('button[type="submit"]').should('exist');
    });
  });
  it('should display error message when form is empty', () => {
    cy.get('[data-testId="submit-btn"]').click();
    cy.get('[data-testId="error-message"]')
      .should('be.visible')
      .and('contain', 'Please fill in a valid email');
  });
  it('should display error message for invalid email address', () => {
    cy.get('#email').type('invalid-email');
    cy.get('[data-testId="submit-btn"]').click();
    cy.get('[data-testId="error-message"]')
      .should('be.visible')
      .and('contain', 'Please fill in a valid email');
  });
  it('should hide error message when email is valid', () => {
    cy.get('#email').type('invalid-email');
    cy.get('[data-testId="submit-btn"]').click();
    cy.get('[data-testId="error-message"]')
      .should('be.visible')
      .and('contain', 'Please fill in a valid email');
    cy.get('#email').clear().type('validemail@gmail.com');
    cy.get('[data-testId="error-message"]').should('not.exist');
  });
});

export {};
