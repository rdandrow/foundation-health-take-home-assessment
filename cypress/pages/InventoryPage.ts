import * as INVENTORY_PAGE from '../constants/Inventory.const';

export class InventoryPage {
  // Header and navigation
  readonly appLogo = '[data-test="app-logo"]';
  readonly primaryHeader = '[data-test="primary-header"]';
  readonly burgerMenuBtn = '#react-burger-menu-btn';
  readonly burgerMenuCloseBtn = '#react-burger-cross-btn';
  readonly navMenuAllItemsLink = '[data-test="inventory-sidebar-link"]';
  readonly navMenuAboutLink = '[data-test="about-sidebar-link"]';
  readonly navMenuLogoutLink = '[data-test="logout-sidebar-link"]';
  readonly navMenuResetLink = '[data-test="reset-sidebar-link"]';
  readonly shoppingCartLink = '[data-test="shopping-cart-link"]';
  readonly shoppingCartBadge = '[data-test="shopping-cart-badge"]';

  // Secondary Header / Sorting
  readonly secondaryHeader = '[data-test="secondary-header"]';
  readonly pageTitle = '[data-test="title"]';
  readonly sortDropdown = '[data-test="product-sort-container"]';

  // Inventory List
  readonly inventoryContainer = '[data-test="inventory-container"]';
  readonly inventoryList = '[data-test="inventory-list"]';
  readonly inventoryItem = '[data-test="inventory-item"]';
  readonly inventoryItemName = '[data-test="inventory-item-name"]';
  readonly inventoryItemDesc = '[data-test="inventory-item-desc"]';
  readonly inventoryItemPrice = '[data-test="inventory-item-price"]';
  readonly inventoryItemImage = '[data-test="inventory-item-img-link"]';

  // Footer
  readonly footer = '[data-test="footer"]';
  readonly footerTwitterLink = '[data-test="social-twitter"]';
  readonly footerFacebookLink = '[data-test="social-facebook"]';
  readonly footerLinkedinLink = '[data-test="social-linkedin"]';
  readonly footerCopy = '[data-test="footer-copy"]';

  // Navigate directly to the inventory page.
  visit() {
    cy.visit(INVENTORY_PAGE.INVENTORY_PAGE_URL);
    return this;
  }

  // Assert the inventory page has loaded with all key elements visible.
  assertPageVisible() {
    cy.get(this.inventoryContainer).should('be.visible');
    cy.get(this.pageTitle).should('be.visible').and('have.text', INVENTORY_PAGE.INVENTORY_PAGE_TITLE);
    cy.url().should('include', INVENTORY_PAGE.INVENTORY_PAGE_URL);
    return this;
  }

  // Assert the expected number of products are rendered.
  assertProductCount(count: number = INVENTORY_PAGE.TOTAL_PRODUCT_COUNT) {
    cy.get(this.inventoryItem).should('have.length', count);
    return this;
  }

  // Assert that a product with the given name is visible in the list.
  assertProductVisible(name: string) {
    cy.get(this.inventoryItemName).contains(name).should('be.visible');
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

  // Assert that product names are sorted A → Z.
  assertSortedByNameAsc() {
    cy.get(this.inventoryItemName).then(($items) => {
      const names = [...$items].map((el) => el.innerText);
      expect(names).to.deep.equal([...names].sort());
    });
    return this;
  }

  // Assert that product names are sorted Z → A.
  assertSortedByNameDesc() {
    cy.get(this.inventoryItemName).then(($items) => {
      const names = [...$items].map((el) => el.innerText);
      expect(names).to.deep.equal([...names].sort().reverse());
    });
    return this;
  }

  // Assert that product prices are sorted low → high.
  assertSortedByPriceAsc() {
    cy.get(this.inventoryItemPrice).then(($prices) => {
      const prices = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')));
      expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
    });
    return this;
  }

  // Assert that product prices are sorted high → low.
  assertSortedByPriceDesc() {
    cy.get(this.inventoryItemPrice).then(($prices) => {
      const prices = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')));
      expect(prices).to.deep.equal([...prices].sort((a, b) => b - a));
    });
    return this;
  }

  // Click the Add to Cart button for a specific product.
  addToCart(addToCartSelector: string) {
    cy.get(`[data-test="${addToCartSelector}"]`).click();
    return this;
  }

  // Click the Remove button for a specific product.
  removeFromCart(removeSelector: string) {
    cy.get(`[data-test="${removeSelector}"]`).click();
    return this;
  }

  // Assert the Add to Cart button is visible for a product (i.e. not in cart).
  assertAddToCartVisible(addToCartSelector: string) {
    cy.get(`[data-test="${addToCartSelector}"]`).should('be.visible');
    return this;
  }

  // Assert the Remove button is visible for a product (i.e. it is in the cart).
  assertRemoveVisible(removeSelector: string) {
    cy.get(`[data-test="${removeSelector}"]`).should('be.visible');
    return this;
  }

  // Select a sort option by its value attribute.
  sortBy(value: string) {
    cy.get(this.sortDropdown).select(value);
    return this;
  }

  // Click the shopping cart icon.
  clickCart() {
    cy.get(this.shoppingCartLink).click();
    return this;
  }

  // Click on a product name to navigate to its detail page.
  clickProductName(name: string) {
    cy.get(this.inventoryItemName).contains(name).click();
    return this;
  }

  // Open the burger nav menu.
  openBurgerMenu() {
    cy.get(this.burgerMenuBtn).click();
    return this;
  }

  // Close the burger nav menu.
  closeBurgerMenu() {
    cy.get(this.burgerMenuCloseBtn).click();
    return this;
  }

  // Click Logout from the burger menu.
  logout() {
    this.openBurgerMenu();
    cy.get(this.navMenuLogoutLink).click();
    return this;
  }

  // Click Reset App State from the burger menu.
  resetAppState() {
    this.openBurgerMenu();
    cy.get(this.navMenuResetLink).click();
    this.closeBurgerMenu();
    return this;
  }
}
