import { BasePage } from './BasePage';
import * as CHECKOUT from '../constants/Checkout.const';

export class CheckoutStepOnePage extends BasePage {
  // Page Container
  readonly checkoutInfoContainer = '[data-test="checkout-info-container"]';

  // Form Fields
  readonly firstNameInput = '[data-test="firstName"]';
  readonly lastNameInput = '[data-test="lastName"]';
  readonly postalCodeInput = '[data-test="postalCode"]';

  // Form Buttons
  readonly continueBtn = '[data-test="continue"]';
  readonly cancelBtn = '[data-test="cancel"]';

  // Error State
  readonly errorMessage = '[data-test="error"]';
  readonly errorDismissBtn = '[data-test="error-button"]';

  /** 
   * Navigate directly to checkout step one.
   * failOnStatusCode: false is required because saucedemo is a client-side SPA —
   * the server returns 404 but the client-side router handles it correctly.
  */
  visit() {
    cy.visit(CHECKOUT.STEP_ONE_PAGE_URL, { failOnStatusCode: false });
    return this;
  }

  // Assert the step one page has loaded with all key elements visible.
  assertPageVisible() {
    cy.get(this.checkoutInfoContainer).should('be.visible');
    cy.get(this.pageTitle).should('be.visible').and('have.text', CHECKOUT.STEP_ONE_PAGE_TITLE);
    cy.url().should('include', CHECKOUT.STEP_ONE_PAGE_URL);
    return this;
  }

  // Assert that the error banner is visible with the expected message.
  assertErrorMessage(expected: string) {
    cy.get(this.errorMessage).should('be.visible').and('have.text', expected);
    return this;
  }

  // Assert that no error banner is shown.
  assertNoErrorMessage() {
    cy.get(this.errorMessage).should('not.exist');
    return this;
  }

  // Fill in the first name field.
  enterFirstName(value: string) {
    cy.get(this.firstNameInput).clear().type(value);
    return this;
  }

  // Fill in the last name field.
  enterLastName(value: string) {
    cy.get(this.lastNameInput).clear().type(value);
    return this;
  }

  // Fill in the postal / zip code field.
  enterPostalCode(value: string) {
    cy.get(this.postalCodeInput).clear().type(value);
    return this;
  }

  // Fill in all checkout information fields at once.
  fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    this.enterFirstName(firstName);
    this.enterLastName(lastName);
    this.enterPostalCode(postalCode);
    return this;
  }

  // Click the Continue button.
  clickContinue() {
    cy.get(this.continueBtn).click();
    return this;
  }

  // Click the Cancel button.
  clickCancel() {
    cy.get(this.cancelBtn).click();
    return this;
  }

  // Fill in checkout info and click Continue.
  submitCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    this.fillCheckoutInfo(firstName, lastName, postalCode);
    this.clickContinue();
    return this;
  }

  // Dismiss the error banner via the × button.
  dismissError() {
    cy.get(this.errorDismissBtn).click();
    return this;
  }
}
