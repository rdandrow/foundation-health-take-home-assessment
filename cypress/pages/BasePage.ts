// BasePage contains locators and methods shared across all authenticated pages
// (header, nav menu, cart badge, footer). All page classes extend this.

export abstract class BasePage {
  // Header elements visible on all authenticated pages 
  readonly appLogo = '[data-test="app-logo"]';
  readonly primaryHeader = '[data-test="primary-header"]';
  readonly secondaryHeader = '[data-test="secondary-header"]';
  readonly pageTitle = '[data-test="title"]';

  // Burger Nav Menu elements visible on all authenticated pages
  readonly burgerMenuBtn = '#react-burger-menu-btn';
  readonly burgerMenuCloseBtn = '#react-burger-cross-btn';
  readonly navMenuAllItemsLink = '[data-test="inventory-sidebar-link"]';
  readonly navMenuAboutLink = '[data-test="about-sidebar-link"]';
  readonly navMenuLogoutLink = '[data-test="logout-sidebar-link"]';
  readonly navMenuResetLink = '[data-test="reset-sidebar-link"]';

  // Cart elements visible on all authenticated pages 
  readonly shoppingCartLink = '[data-test="shopping-cart-link"]';
  readonly shoppingCartBadge = '[data-test="shopping-cart-badge"]';

  // Footer elements visible on all authenticated pages
  readonly footer = '[data-test="footer"]';
  readonly footerTwitterLink = '[data-test="social-twitter"]';
  readonly footerFacebookLink = '[data-test="social-facebook"]';
  readonly footerLinkedinLink = '[data-test="social-linkedin"]';
  readonly footerCopy = '[data-test="footer-copy"]';

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

  // Click the shopping cart icon to navigate to the cart page.
  clickCart() {
    cy.get(this.shoppingCartLink).click();
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

  // Click All Items from the burger menu.
  goToAllItems() {
    this.openBurgerMenu();
    cy.get(this.navMenuAllItemsLink).click();
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
