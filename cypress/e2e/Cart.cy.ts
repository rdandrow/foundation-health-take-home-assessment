import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import * as CART_PAGE from '../constants/Cart.const';
import * as INVENTORY_PAGE from '../constants/Inventory.const';

describe('Cart Page', () => {
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();

  describe('Page load — empty cart', () => {
    beforeEach(() => {
      cy.loginAsStandardUser();
      cartPage.visit();
    });

    it('loads the cart page with all key elements visible', () => {
      cartPage.assertPageVisible();
    });

    it('displays the correct page title', () => {
      cy.get(cartPage.pageTitle)
        .should('be.visible')
        .and('have.text', CART_PAGE.CART_PAGE_TITLE);
    });

    it('shows the QTY and Description column headers', () => {
      cartPage.assertColumnHeadersVisible();
    });

    it('shows the Continue Shopping and Checkout buttons', () => {
      cartPage.assertActionButtonsVisible();
    });

    it('renders an empty cart with no items', () => {
      cartPage.assertCartIsEmpty();
    });

    it('does not show a cart badge when the cart is empty', () => {
      cartPage.assertCartBadgeNotVisible();
    });
  });

  describe('Page load — cart with items', () => {
    beforeEach(() => {
      cy.loginAsStandardUser();
      inventoryPage.visit();
      inventoryPage.addToCart(INVENTORY_PAGE.PRODUCTS.BACKPACK.addToCartSelector);
      inventoryPage.addToCart(INVENTORY_PAGE.PRODUCTS.BIKE_LIGHT.addToCartSelector);
      inventoryPage.clickCart();
    });

    it('loads the cart page correctly after adding items on the inventory page', () => {
      cartPage.assertPageVisible();
    });

    it('displays the correct number of items in the cart', () => {
      cartPage.assertCartItemCount(2);
    });

    it('shows the cart badge with the correct count', () => {
      cartPage.assertCartBadge(2);
    });

    it('displays the correct item names in the cart', () => {
      cartPage.assertItemInCart(INVENTORY_PAGE.PRODUCTS.BACKPACK.name);
      cartPage.assertItemInCart(INVENTORY_PAGE.PRODUCTS.BIKE_LIGHT.name);
    });

    it('displays a quantity of 1 for each item', () => {
      cartPage.assertItemQuantity(INVENTORY_PAGE.PRODUCTS.BACKPACK.name, 1);
      cartPage.assertItemQuantity(INVENTORY_PAGE.PRODUCTS.BIKE_LIGHT.name, 1);
    });
  });

  describe('Remove items', () => {
    beforeEach(() => {
      cy.loginAsStandardUser();
      inventoryPage.visit();
      inventoryPage.addToCart(INVENTORY_PAGE.PRODUCTS.BACKPACK.addToCartSelector);
      inventoryPage.addToCart(INVENTORY_PAGE.PRODUCTS.BIKE_LIGHT.addToCartSelector);
      inventoryPage.clickCart();
    });

    it('removes an item and it no longer appears in the cart', () => {
      cartPage.removeItem(INVENTORY_PAGE.PRODUCTS.BACKPACK.removeSelector);
      cartPage.assertItemNotInCart(INVENTORY_PAGE.PRODUCTS.BACKPACK.name);
    });

    it('decrements the cart badge after removing an item', () => {
      cartPage.removeItem(INVENTORY_PAGE.PRODUCTS.BACKPACK.removeSelector);
      cartPage.assertCartBadge(1);
    });

    it('removes the cart badge when the last item is removed', () => {
      cartPage.removeItem(INVENTORY_PAGE.PRODUCTS.BACKPACK.removeSelector);
      cartPage.removeItem(INVENTORY_PAGE.PRODUCTS.BIKE_LIGHT.removeSelector);
      cartPage.assertCartBadgeNotVisible();
    });

    it('leaving a removed item still shows the remaining item', () => {
      cartPage.removeItem(INVENTORY_PAGE.PRODUCTS.BACKPACK.removeSelector);
      cartPage.assertItemInCart(INVENTORY_PAGE.PRODUCTS.BIKE_LIGHT.name);
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      cy.loginAsStandardUser();
      cartPage.visit();
    });

    it('Continue Shopping button navigates back to the inventory page', () => {
      cartPage.continueShopping();
      cy.url().should('include', INVENTORY_PAGE.INVENTORY_PAGE_URL);
    });

    it('Checkout button navigates to the checkout step one page', () => {
      cartPage.proceedToCheckout();
      cy.url().should('include', '/checkout-step-one.html');
    });

    it('burger menu logout redirects to the login page', () => {
      cartPage.logout();
      cy.url().should('eq', Cypress.config('baseUrl'));
    });

    it('burger menu All Items navigates to the inventory page', () => {
      cartPage.goToAllItems();
      cy.url().should('include', INVENTORY_PAGE.INVENTORY_PAGE_URL);
    });
  });
});
