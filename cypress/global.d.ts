/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getClassContain(containString: string): Chainable<JQuery<HTMLElement>>;
  }
}
