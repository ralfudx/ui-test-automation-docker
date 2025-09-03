// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      /**
       * Logs in by fetching a Google OAuth token and setting session cookie.
       * Usage: cy.loginByGoogleApi()
       */
      loginByGoogleApi(): Chainable<void>;
      assertVisible(selector: string, message?: string): Chainable<JQuery<HTMLElement>>;
      assertContainsTextVisible(tag: string, selector: string, message?: string): Chainable<JQuery<HTMLElement>>;
    }
  }
  