describe('password recovery page', () => {
  beforeEach(() => {
    cy.visit('/reset-password');
  });
  it('should render password recovery page', () => {
    cy.get('h1').should('contain', 'New Password');
    cy.get('[data-testId="back-btn"]').should('exist');
    cy.get('form').within(() => {
      cy.get('input[name="new-password"]').should('exist');
      cy.get('input[name="confirm-password"]').should('exist');
      cy.get('button[type="submit"]').should('exist');
    });
  });
  it('should display error message when submitting empty form', () => {
    cy.get('button[type="submit"]').click();
    cy.get('[data-testId="error-message"]').should('be.visible');
  });
  it('should display error message when submitting invalid new password', () => {
    cy.get('input[name="new-password"]').type('aaaaaaaa');
    cy.get('button[type="submit"]').click();
    cy.get('[data-testId="error-message"]').should('be.visible');
  });
  it('should display error message when submitting invalid confirm password', () => {
    cy.get('input[name="new-password"]').type('aaaaaaA!');
    cy.get('input[name="confirm-password"]').type('aaaaaaaa');
    cy.get('button[type="submit"]').click();
    cy.get('[data-testId="error-message"]').should('be.visible');
  });
  it('should display error message when confirm password not match', () => {
    cy.get('input[name="new-password"]').type('aaaaaaA!');
    cy.get('input[name="confirm-password"]').type('bbbbbbB@');
    cy.get('button[type="submit"]').click();
    cy.get('[data-testId="error-message"]').should('be.visible');
  });
  it('should hide error message when submitting valid form', () => {
    cy.get('input[name="new-password"]').type('aaaaaaA!');
    cy.get('input[name="confirm-password"]').type('aaaaaaA!');
    cy.get('button[type="submit"]').click();
    cy.get('[data-testId="error-message"]').should('not.exist');
  });
});

export {};
