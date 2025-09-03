// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// Cypress.Commands.add('loginByGoogleApi', () => {
//     cy.task('getGoogleToken').then((tokens: any) => {
//       // Exchange access_token with your backend for a session
//       // cy.request('POST', `${Cypress.env('API_URL')}/auth/google`, {
//       cy.request('POST', 'https://demo.spikerz.com/api/auth/google', {
//         access_token: tokens.access_token,
//       }).then((res) => {
//         // Set cookie so Cypress is logged in without UI
//         // cy.setCookie('session', res.body.sessionToken);
//       });
//     });
// });

Cypress.Commands.add('loginByGoogleApi', () => {
    cy.task('getGoogleToken').then((token: any) => {
      // You can now use the access_token to hit your backend login endpoint
      cy.request({
        method: 'POST',
        // url: `${Cypress.env('API_URL')}/auth/google`, // 🔑 your backend endpoint
        url: `https://demo.spikerz.com/collect`, // 🔑 your backend endpoint
        body: {
          access_token: token.access_token,
        },
        failOnStatusCode: false,
      }).then((res) => {
        // Example: store session cookie
        //  cy.setCookie('session', res.body.sessionToken);
  
        Cypress.log({
          name: 'loginByGoogleApi',
          message: `Logged in as Google user`,
        });
      });
    });
});

Cypress.Commands.add('assertVisible', (selector: string, message?: string) => {
  cy.get(selector).should(($el) => {
    expect(
      $el.is(':visible'),
      message || `Expected ${selector} to be visible`
    ).to.be.true;
  });
});

Cypress.Commands.add('assertContainsTextVisible', (tag: string, selector: string, message?: string) => {
  cy.get(tag).contains(selector).should(($el) => {
    expect(
      $el.is(':visible'),
      message || `Expected ${tag} : ${selector} to be visible`
    ).to.be.true;
  });
});
  
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })