import { LoginPage } from '../pages/LoginPage';
import * as LOGIN_PAGE from '../constants/Login.const';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Authenticate as standard_user via cy.session().
       * The session is cached for the duration of the spec so the login
       * form only runs once — subsequent tests restore from cache.
       */
      loginAsStandardUser(): void;
    }
  }
}

Cypress.Commands.add('loginAsStandardUser', () => {
  const loginPage = new LoginPage();
  cy.session(
    LOGIN_PAGE.STANDARD_USER_USERNAME,
    () => {
      loginPage.visit();
      loginPage.loginWithCredentials(
        LOGIN_PAGE.STANDARD_USER_USERNAME,
        LOGIN_PAGE.STANDARD_USER_PASSWORD
      );
      loginPage.assertLoginSuccess();
    },
    { cacheAcrossSpecs: false }
  );
});
