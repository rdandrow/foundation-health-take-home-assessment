import { BasePage } from './BasePage';
import * as CHECKOUT from '../constants/Checkout.const';

export class CheckoutCompletePage extends BasePage {
  // Page Container
  readonly checkoutCompleteContainer = '[data-test="checkout-complete-container"]';

  // Content
  readonly ponyExpressImage = '[data-test="pony-express"]';
  readonly completeHeader = '[data-test="complete-header"]';
  readonly completeText = '[data-test="complete-text"]';

  // Action Button
  readonly backToProductsBtn = '[data-test="back-to-products"]';

  /** 
   * Navigate directly to the checkout complete page.
   * failOnStatusCode: false is required because saucedemo is a client-side SPA —
   * the server returns 404 but the client-side router handles it correctly.
  */
  visit() {
    cy.visit(CHECKOUT.COMPLETE_PAGE_URL, { failOnStatusCode: false });
    return this;
  }

  // Assert the confirmation page has loaded with all key elements visible.
  assertPageVisible() {
    cy.get(this.checkoutCompleteContainer).should('be.visible');
    cy.get(this.pageTitle).should('be.visible').and('have.text', CHECKOUT.COMPLETE_PAGE_TITLE);
    cy.url().should('include', CHECKOUT.COMPLETE_PAGE_URL);
    return this;
  }

  // Assert the confirmation header text.
  assertCompleteHeader() {
    cy.get(this.completeHeader)
      .should('be.visible')
      .and('have.text', CHECKOUT.COMPLETE_HEADER_TEXT);
    return this;
  }

  // Assert the confirmation body copy.
  assertCompleteBody() {
    cy.get(this.completeText)
      .should('be.visible')
      .and('have.text', CHECKOUT.COMPLETE_BODY_TEXT);
    return this;
  }

  // Assert the Pony Express delivery image is visible.
  assertPonyExpressImageVisible() {
    cy.get(this.ponyExpressImage).should('be.visible');
    return this;
  }

  // Assert the Back to Products button is visible and enabled.
  assertBackToProductsBtnVisible() {
    cy.get(this.backToProductsBtn).should('be.visible').and('be.enabled');
    return this;
  }

  // Click the Back to Products button.
  clickBackToProducts() {
    cy.get(this.backToProductsBtn).click();
    return this;
  }
}
