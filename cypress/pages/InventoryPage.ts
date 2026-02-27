import { BasePage } from './BasePage';
import * as INVENTORY_PAGE from '../constants/Inventory.const';

export class InventoryPage extends BasePage {
  // ─── Secondary Header / Sorting ───────────────────────────────────────────

  readonly sortDropdown = '[data-test="product-sort-container"]';

  // ─── Inventory List ───────────────────────────────────────────────────────

  readonly inventoryContainer = '[data-test="inventory-container"]';
  readonly inventoryList = '[data-test="inventory-list"]';
  readonly inventoryItem = '[data-test="inventory-item"]';
  readonly inventoryItemName = '[data-test="inventory-item-name"]';
  readonly inventoryItemDesc = '[data-test="inventory-item-desc"]';
  readonly inventoryItemPrice = '[data-test="inventory-item-price"]';
  readonly inventoryItemImage = '[data-test="inventory-item-img-link"]';

  // ─── Navigation ───────────────────────────────────────────────────────────

  // Navigate directly to the inventory page.
  // failOnStatusCode: false is required because saucedemo is a client-side SPA —
  // the server returns 404 for /inventory.html but the client-side router handles it correctly.
  visit() {
    cy.visit(INVENTORY_PAGE.INVENTORY_PAGE_URL, { failOnStatusCode: false });
    return this;
  }

  // ─── Page Assertions ──────────────────────────────────────────────────────

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

  // ─── Sorting Assertions ───────────────────────────────────────────────────

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

  // ─── Cart Actions ─────────────────────────────────────────────────────────

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

  // ─── Sort Actions ─────────────────────────────────────────────────────────

  // Select a sort option by its value attribute.
  sortBy(value: string) {
    cy.get(this.sortDropdown).select(value);
    return this;
  }

  // Click on a product name to navigate to its detail page.
  clickProductName(name: string) {
    cy.get(this.inventoryItemName).contains(name).click();
    return this;
  }
}
