import { BasePage } from './BasePage';
import * as CART_PAGE from '../constants/Cart.const';

export class CartPage extends BasePage {
  // Cart Content
  readonly cartList = '[data-test="cart-list"]';
  readonly cartContentsContainer = '[data-test="cart-contents-container"]';
  
  // Cart items reuse the inventory-item component
  readonly cartItem = '[data-test="inventory-item"]';
  readonly cartItemQuantity = '[data-test="item-quantity"]';
  readonly cartItemName = '[data-test="inventory-item-name"]';
  readonly cartItemDesc = '[data-test="inventory-item-desc"]';
  readonly cartItemPrice = '[data-test="inventory-item-price"]';
  readonly cartQuantityLabel = '[data-test="cart-quantity-label"]';
  readonly cartDescriptionLabel = '[data-test="cart-desc-label"]';

  // Action Buttons
  readonly continueShoppingBtn = '[data-test="continue-shopping"]';
  readonly checkoutBtn = '[data-test="checkout"]';

  // Navigate directly to the cart page.
  // failOnStatusCode: false is required because saucedemo is a client-side SPA —
  // the server returns 404 for /cart.html but the client-side router handles it correctly.
  visit() {
    cy.visit(CART_PAGE.CART_PAGE_URL, { failOnStatusCode: false });
    return this;
  }

  // Assert the cart page has loaded with all key elements visible.
  assertPageVisible() {
    cy.get(this.cartList).should('be.visible');
    cy.get(this.pageTitle).should('be.visible').and('have.text', CART_PAGE.CART_PAGE_TITLE);
    cy.url().should('include', CART_PAGE.CART_PAGE_URL);
    return this;
  }

  // Assert the correct number of items are present in the cart.
  assertCartItemCount(count: number) {
    cy.get(this.cartItem).should('have.length', count);
    return this;
  }

  // Assert the cart is empty (no cart items rendered).
  assertCartIsEmpty() {
    cy.get(this.cartItem).should('not.exist');
    return this;
  }

  // Assert an item with the given name is present in the cart.
  assertItemInCart(name: string) {
    cy.get(this.cartItemName).contains(name).should('be.visible');
    return this;
  }

  // Assert an item with the given name is NOT present in the cart.
  assertItemNotInCart(name: string) {
    cy.get(this.cartItemName).contains(name).should('not.exist');
    return this;
  }

  // Assert the quantity shown for a cart item.
  assertItemQuantity(name: string, quantity: number) {
    cy.get(this.cartItem)
      .contains(this.cartItemName, name)
      .closest(this.cartItem)
      .find(this.cartItemQuantity)
      .should('have.text', String(quantity));
    return this;
  }

  // Assert the price shown for a cart item.
  assertItemPrice(name: string, price: string) {
    cy.get(this.cartItem)
      .contains(this.cartItemName, name)
      .closest(this.cartItem)
      .find(this.cartItemPrice)
      .should('have.text', price);
    return this;
  }

  // Assert the cart badge displays the expected count.
  assertCartBadge(count: number) {
    cy.get(this.shoppingCartBadge).should('be.visible').and('have.text', String(count));
    return this;
  }

  // Assert the cart badge is not visible (cart is empty).
  assertCartBadgeNotVisible() {
    cy.get(this.shoppingCartBadge).should('not.exist');
    return this;
  }

  // Assert the column header labels are visible.
  assertColumnHeadersVisible() {
    cy.get(this.cartQuantityLabel).should('be.visible').and('have.text', CART_PAGE.CART_QUANTITY_LABEL);
    cy.get(this.cartDescriptionLabel).should('be.visible').and('have.text', CART_PAGE.CART_DESCRIPTION_LABEL);
    return this;
  }

  // Assert the Continue Shopping and Checkout buttons are visible and enabled.
  assertActionButtonsVisible() {
    cy.get(this.continueShoppingBtn).should('be.visible').and('be.enabled');
    cy.get(this.checkoutBtn).should('be.visible').and('be.enabled');
    return this;
  }

  // Click the Remove button for a specific product by its data-test remove selector.
  removeItem(removeSelector: string) {
    cy.get(`[data-test="${removeSelector}"]`).click();
    return this;
  }

  // Click the Continue Shopping button.
  continueShopping() {
    cy.get(this.continueShoppingBtn).click();
    return this;
  }

  // Click the Checkout button.
  proceedToCheckout() {
    cy.get(this.checkoutBtn).click();
    return this;
  }
}
