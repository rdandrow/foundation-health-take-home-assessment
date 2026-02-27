import * as LOGIN_PAGE from '../constants/Login.const';

export class LoginPage {
  // Form inputs
  readonly usernameInput = '[data-test="username"]';
  readonly passwordInput = '[data-test="password"]';
  readonly loginButton = '[data-test="login-button"]';

  // Page containers
  readonly loginContainer = '[data-test="login-container"]';
  readonly loginCredentialsContainer = '[data-test="login-credentials-container"]';
  readonly loginCredentials = '[data-test="login-credentials"]';
  readonly passwordCredentials = '[data-test="login-password"]';

  // Error states
  readonly errorMessage = '[data-test="error"]';
  readonly errorDismissBtn = '[data-test="error-button"]';

  // Post-login locator (confirms successful navigation)
  readonly inventoryContainer = '[data-test="inventory-container"]';

  // Navigate to the login page.
  visit() {
    cy.visit('/');
    return this;
  }

// Get the username input field.
  getUsernameInput() {
    return cy.get(this.usernameInput)
      .should('be.visible')
      .and('have.attr', 'placeholder', LOGIN_PAGE.USERNAME_INPUT_PLACEHOLDER_TEXT);
  }

  // Get the password input field.
  getPasswordInput() {
    return cy.get(this.passwordInput)
      .should('be.visible')
      .and('have.attr', 'placeholder', LOGIN_PAGE.PASSWORD_INPUT_PLACEHOLDER_TEXT);
  }

  // Get the login button.
  getLoginButton() {
    return cy.get(this.loginButton)
      .should('be.visible')
      .and('have.attr', 'value', LOGIN_PAGE.LOGIN_BUTTON_TITLE);
  }

  // assert against core login form fields
  assertLoginFormFields() {
    this.getUsernameInput();
    this.getPasswordInput();
    this.getLoginButton();
    return this;
  }

  // Assert that core login page elements are visible.
  assertLoginPageVisible() {
    cy.get(this.loginContainer).should('be.visible');
    cy.get(this.usernameInput).should('be.visible');
    cy.get(this.passwordInput).should('be.visible');
    cy.get(this.loginButton).should('be.visible');
    return this;
  }

  // Assert that core login page credentials container is visible.
  assertLoginPageCredentialsVisible() {    
    cy.get(this.loginCredentialsContainer).should('be.visible');
    cy.get(this.loginCredentials).should('be.visible');
    cy.get(this.passwordCredentials).should('be.visible');
    return this;
  }

  // Assert that the login button is enabled.
  assertLoginButtonEnabled() {
    cy.get(this.loginButton).should('be.enabled');
    return this;
  }

  /** 
   * Assert the current value of the username field. 
   * Note: This is used to confirm that the field is empty on load, and can be updated when typing.
  */
  assertUsernameValue(expected: string) {
    cy.get(this.usernameInput).should('have.value', expected);
    return this;
  }

  // Assert that the correct error banner is shown and visible.
  assertErrorMessage(expected: string) {
    cy.get(this.errorMessage).should('be.visible').and('have.text', expected);
    return this;
  }

  // Assert that no error banner is shown.
  assertNoErrorMessage() {
    cy.get(this.errorMessage).should('not.exist');
    return this;
  }

  // Assert that login succeeded by checking for the inventory container.
  assertLoginSuccess() {
    cy.get(this.inventoryContainer).should('be.visible');
    cy.url().should('include', '/inventory.html');
    return this;
  }

  // Type a value into the username field.
  setUsernameValue(username: string) {
    cy.get(this.usernameInput).clear().type(username);
    return this;
  }

  // Type a value into the password field.
  setPasswordValue(password: string) {
    cy.get(this.passwordInput).clear().type(password);
    return this;
  }

  // Click the Login button.
  clickLoginButton() {
    cy.get(this.loginButton).click();
    return this;
  }

  // Perform a login with valid credentials (standard_user / secret_sauce).
  loginWithCredentials(username: string, password: string) {
    this.setUsernameValue(username);
    this.setPasswordValue(password);
    this.clickLoginButton();
    return this;
  }

  // Attempt to login without a username.
  loginWithNoUsername() {
    this.setPasswordValue('secret_sauce');
    this.clickLoginButton();
    this.assertErrorMessage(LOGIN_PAGE.USERNAME_REQUIRED_FORM_ERROR);
    return this;
  }

  // Attempt to login without a password.
  loginWithNoPassword() {
    this.setUsernameValue('standard_user');
    this.clickLoginButton();
    this.assertErrorMessage(LOGIN_PAGE.PASSWORD_REQUIRED_FORM_ERROR)
    return this;
  }

  // Attempt to login with invalid credentials.
  loginWithInvalidCredentials(username: string, password: string) {
    this.setUsernameValue(username);
    this.setPasswordValue(password);
    this.clickLoginButton();
    this.assertErrorMessage(LOGIN_PAGE.INVALID_CREDENTIALS_FORM_ERROR);
    return this;
  }

  // Assert against text within Credentials Container
  assertLoginCredentialsContainerText() {
    cy.get(this.loginCredentials).should('contain.text', LOGIN_PAGE.LOGIN_CREDENTIALS_CONTAINER_TITLE);
    cy.get(this.passwordCredentials).should('contain.text', LOGIN_PAGE.LOGIN_PASSWORD_CONTAINER_TITLE);
    cy.get(this.loginCredentialsContainer).should('contain.text', LOGIN_PAGE.STANDARD_USER_USERNAME);
    cy.get(this.loginCredentialsContainer).should('contain.text', LOGIN_PAGE.LOCKED_OUT_USER_USERNAME);
    cy.get(this.loginCredentialsContainer).should('contain.text', LOGIN_PAGE.PROBLEM_USER_USERNAME);
    cy.get(this.loginCredentialsContainer).should('contain.text', LOGIN_PAGE.PERFORMANCE_GLITCH_USER_USERNAME);
    cy.get(this.loginCredentialsContainer).should('contain.text', LOGIN_PAGE.ERROR_USER_USERNAME);
    cy.get(this.loginCredentialsContainer).should('contain.text', LOGIN_PAGE.VISUAL_USER_USERNAME);
    cy.get(this.loginCredentialsContainer).should('contain.text', LOGIN_PAGE.STANDARD_USER_PASSWORD);
    return this;
  }

  // Assert that the page title is correct.
  assertPageTitle() {
    cy.title().should('eq', LOGIN_PAGE.LOGIN_PAGE_TITLE);
    return this;
  }
}
