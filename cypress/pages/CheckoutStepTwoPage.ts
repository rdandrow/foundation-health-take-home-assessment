import { BasePage } from './BasePage';
import * as CHECKOUT from '../constants/Checkout.const';

export class CheckoutStepTwoPage extends BasePage {
  // Page Container
  readonly checkoutSummaryContainer = '[data-test="checkout-summary-container"]';

  // Order Items
  readonly cartList = '[data-test="cart-list"]';
  readonly cartItem = '[data-test="inventory-item"]';
  readonly cartItemName = '[data-test="inventory-item-name"]';
  readonly cartItemDesc = '[data-test="inventory-item-description"]';
  readonly cartItemPrice = '[data-test="inventory-item-price"]';
  readonly cartItemQuantity = '[data-test="item-quantity"]';
  readonly cartQuantityLabel = '[data-test="cart-quantity-label"]';
  readonly cartDescLabel = '[data-test="cart-desc-label"]';

  // Summary Info
  readonly paymentInfoLabel = '[data-test="payment-info-label"]';
  readonly paymentInfoValue = '[data-test="payment-info-value"]';
  readonly shippingInfoLabel = '[data-test="shipping-info-label"]';
  readonly shippingInfoValue = '[data-test="shipping-info-value"]';
  readonly totalInfoLabel = '[data-test="total-info-label"]';
  readonly subtotalLabel = '[data-test="subtotal-label"]';
  readonly taxLabel = '[data-test="tax-label"]';
  readonly totalLabel = '[data-test="total-label"]';

  // Action Buttons
  readonly finishBtn = '[data-test="finish"]';
  readonly cancelBtn = '[data-test="cancel"]';

  /** 
   * Navigate directly to checkout step two.
   * failOnStatusCode: false is required because saucedemo is a client-side SPA —
   * the server returns 404 but the client-side router handles it correctly.
  */

  visit() {
    cy.visit(CHECKOUT.STEP_TWO_PAGE_URL, { failOnStatusCode: false });
    return this;
  }

  // Assert the step two page has loaded with all key elements visible.
  assertPageVisible() {
    cy.get(this.checkoutSummaryContainer).should('be.visible');
    cy.get(this.pageTitle).should('be.visible').and('have.text', CHECKOUT.STEP_TWO_PAGE_TITLE);
    cy.url().should('include', CHECKOUT.STEP_TWO_PAGE_URL);
    return this;
  }

  // Assert the correct number of order items are shown.
  assertOrderItemCount(count: number) {
    cy.get(this.cartItem).should('have.length', count);
    return this;
  }

  // Assert an item with the given name is visible in the order summary.
  assertItemInSummary(name: string) {
    cy.get(this.cartItemName).contains(name).should('be.visible');
    return this;
  }

  // Assert the payment info section is visible.
  assertPaymentInfoVisible() {
    cy.get(this.paymentInfoLabel).should('be.visible');
    cy.get(this.paymentInfoValue).should('be.visible');
    return this;
  }

  // Assert the shipping info section is visible.
  assertShippingInfoVisible() {
    cy.get(this.shippingInfoLabel).should('be.visible');
    cy.get(this.shippingInfoValue).should('be.visible');
    return this;
  }

  // Assert the price summary section (subtotal, tax, total) is visible.
  assertPriceSummaryVisible() {
    cy.get(this.subtotalLabel).should('be.visible');
    cy.get(this.taxLabel).should('be.visible');
    cy.get(this.totalLabel).should('be.visible');
    return this;
  }

  // Assert the Finish and Cancel buttons are visible and enabled.
  assertActionButtonsVisible() {
    cy.get(this.finishBtn).should('be.visible').and('be.enabled');
    cy.get(this.cancelBtn).should('be.visible').and('be.enabled');
    return this;
  }

  // Click the Finish button to complete the order.
  clickFinish() {
    cy.get(this.finishBtn).click();
    return this;
  }

  // Click the Cancel button to return to the cart.
  clickCancel() {
    cy.get(this.cancelBtn).click();
    return this;
  }
}
