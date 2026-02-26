import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import * as INVENTORY_PAGE from '../constants/Inventory.const';
import * as LOGIN_PAGE from '../constants/Login.const';

describe('Inventory Page', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();

  beforeEach(() => {
    loginPage.visit();
    loginPage.loginWithCredentials(LOGIN_PAGE.STANDARD_USER_USERNAME, LOGIN_PAGE.STANDARD_USER_PASSWORD);
    loginPage.assertLoginSuccess();
  });

  describe('Page load', () => {
    it('displays the inventory page with all key elements', () => {
      inventoryPage.assertPageVisible();
    });

    it('displays the correct page title', () => {
      cy.get(inventoryPage.pageTitle)
        .should('be.visible')
        .and('have.text', INVENTORY_PAGE.INVENTORY_PAGE_TITLE);
    });

    it('renders all six products', () => {
      inventoryPage.assertProductCount(INVENTORY_PAGE.TOTAL_PRODUCT_COUNT);
    });

    it('does not show a cart badge on initial load', () => {
      inventoryPage.assertCartBadgeNotVisible();
    });
  });

  describe('Sorting', () => {
    it('sorts products by name A → Z', () => {
      inventoryPage.sortBy(INVENTORY_PAGE.SORT_NAME_ASC);
      inventoryPage.assertSortedByNameAsc();
    });

    it('sorts products by name Z → A', () => {
      inventoryPage.sortBy(INVENTORY_PAGE.SORT_NAME_DESC);
      inventoryPage.assertSortedByNameDesc();
    });

    it('sorts products by price low → high', () => {
      inventoryPage.sortBy(INVENTORY_PAGE.SORT_PRICE_ASC);
      inventoryPage.assertSortedByPriceAsc();
    });

    it('sorts products by price high → low', () => {
      inventoryPage.sortBy(INVENTORY_PAGE.SORT_PRICE_DESC);
      inventoryPage.assertSortedByPriceDesc();
    });
  });

  describe('Cart interactions', () => {
    it('updates the cart badge to 1 after adding a single item', () => {
      inventoryPage.addToCart(INVENTORY_PAGE.PRODUCTS.BACKPACK.addToCartSelector);
      inventoryPage.assertCartBadge(1);
    });

    it('increments the cart badge when multiple items are added', () => {
      inventoryPage.addToCart(INVENTORY_PAGE.PRODUCTS.BACKPACK.addToCartSelector);
      inventoryPage.addToCart(INVENTORY_PAGE.PRODUCTS.BIKE_LIGHT.addToCartSelector);
      inventoryPage.assertCartBadge(2);
    });

    it('decrements the cart badge after removing an item', () => {
      inventoryPage.addToCart(INVENTORY_PAGE.PRODUCTS.BACKPACK.addToCartSelector);
      inventoryPage.addToCart(INVENTORY_PAGE.PRODUCTS.BIKE_LIGHT.addToCartSelector);
      inventoryPage.removeFromCart(INVENTORY_PAGE.PRODUCTS.BACKPACK.removeSelector);
      inventoryPage.assertCartBadge(1);
    });

    it('shows the Remove button after adding an item to the cart', () => {
      inventoryPage.addToCart(INVENTORY_PAGE.PRODUCTS.BACKPACK.addToCartSelector);
      inventoryPage.assertRemoveVisible(INVENTORY_PAGE.PRODUCTS.BACKPACK.removeSelector);
    });

    it('shows the Add to Cart button again after removing an item', () => {
      inventoryPage.addToCart(INVENTORY_PAGE.PRODUCTS.BACKPACK.addToCartSelector);
      inventoryPage.removeFromCart(INVENTORY_PAGE.PRODUCTS.BACKPACK.removeSelector);
      inventoryPage.assertAddToCartVisible(INVENTORY_PAGE.PRODUCTS.BACKPACK.addToCartSelector);
    });

    it('clears the cart badge when the last item is removed', () => {
      inventoryPage.addToCart(INVENTORY_PAGE.PRODUCTS.BACKPACK.addToCartSelector);
      inventoryPage.removeFromCart(INVENTORY_PAGE.PRODUCTS.BACKPACK.removeSelector);
      inventoryPage.assertCartBadgeNotVisible();
    });
  });

  describe('Navigation', () => {
    it('navigates to the cart page when the cart icon is clicked', () => {
      inventoryPage.clickCart();
      cy.url().should('include', '/cart.html');
    });

    it('navigates to a product detail page when a product name is clicked', () => {
      inventoryPage.clickProductName(INVENTORY_PAGE.PRODUCTS.BACKPACK.name);
      cy.url().should('include', '/inventory-item.html');
    });

    it('logs out via the burger menu and redirects to the login page', () => {
      inventoryPage.logout();
      cy.url().should('eq', Cypress.config('baseUrl'));
    });
  });
});
