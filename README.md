# Foundation Health Take-Home Assessment

An end-to-end test suite built with [Cypress](https://www.cypress.io/) for [saucedemo.com](https://www.saucedemo.com).

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher (bundled with Node.js)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/rdandrow/foundation-health-take-home-assessment.git
cd foundation-health-take-home-assessment
npm install
```

## Running Tests

### Interactive Mode (Cypress App)

Opens the Cypress Test Runner UI, which lets you watch tests execute in a real browser:

```bash
npm run cy:open
```

### Headless Mode (CI)

Runs all tests headlessly from the command line (ideal for CI pipelines):

```bash
npm run cy:run
```

## Test Suite Overview
This Cypress suite currently contains 5 spec files:
- `Cart.cy.ts` with 19 passing tests.
- `Checkout-e2e.cy.ts` with 1 passing test.  This is the core e2e test that fulfils the task.
- `Checkout.cy.ts` with 25 passing tests.
- `Inventory.cy.ts` with 17 passing tests.
- `Login.cy.ts` with 11 passing tests.

I've verified that all specs pass via both the test runner and in headless mode in ~58 seconds.

I know that I went a little above and beyond with my coverage here, but I was having fun going through this exercise and just wanted to keep adding more.

## Project Structure

```
.
├── cypress/
│   ├── constants/              # Exported string/selector constants per page
│   │   ├── Login.const.ts
│   │   ├── Inventory.const.ts
│   │   ├── Cart.const.ts
│   │   └── Checkout.const.ts
│   ├── e2e/                    # Test spec files
│   │   ├── Login.cy.ts
│   │   ├── Inventory.cy.ts
│   │   ├── Cart.cy.ts
│   │   ├── Checkout.cy.ts
│   │   └── Checkout-e2e.cy.ts
│   ├── fixtures/               # Static test data (JSON)
│   ├── pages/                  # Page Object Model classes
│   │   ├── BasePage.ts         # Abstract base class — shared locators & methods
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutStepOnePage.ts
│   │   ├── CheckoutStepTwoPage.ts
│   │   └── CheckoutCompletePage.ts
│   └── support/                # Custom commands and global configuration
├── cypress.config.js           # Cypress configuration
└── package.json
```

## Configuration

Cypress settings such as base URL and timeouts are managed in `cypress.config.js`.

Refer to the [Cypress configuration docs](https://docs.cypress.io/app/references/configuration) for all available options.

## Cypress Version

This project uses **Cypress 15.11.0**.

---

## Best Practices & Design Patterns

### Page Object Model (POM)

Every page in the application has a dedicated TypeScript class in `cypress/pages/`. Each class owns all locators and interaction methods for its page. Spec files never reference raw selectors or construct URLs directly — they only call page object methods. This means selector changes require a single update in one file rather than hunting through every spec.

```typescript
// GOOD - Spec calls a method — doesn't know or care about selectors
stepOnePage.submitCheckoutInfo(firstName, lastName, postalCode);

// BAD - Anti-pattern — selector leaking into the spec
cy.get('[data-test="firstName"]').type(firstName);
```

---

### Abstract BasePage

All authenticated page classes extend an abstract `BasePage` that provides every shared locator and method (header, burger menu, cart badge, footer). Page-specific classes only define what is unique to them. This eliminates duplication and ensures shared behaviour (e.g. `logout()`, `assertCartBadge()`) is maintained in one place.

```
BasePage (abstract)
├── InventoryPage
├── CartPage
├── CheckoutStepOnePage
├── CheckoutStepTwoPage
└── CheckoutCompletePage
```

---

### Fluent Interface (Method Chaining)

Every page method returns `this`, allowing assertion and action calls to be chained for concise, readable test flows without sacrificing clarity.

```typescript
stepOnePage
  .enterFirstName(firstName)
  .enterLastName(lastName)
  .enterPostalCode(postalCode)
  .clickContinue();
```

---

### Constants Files

All string values — page titles, URLs, error messages, placeholder text, product names, button labels — are exported from per-page constants files in `cypress/constants/`. Specs and page objects import these constants rather than hardcoding strings, so a copy change in the application requires updating only the constants file.

```typescript
// GOOD - Value lives in one place
cy.get(this.pageTitle).should('have.text', CHECKOUT.STEP_ONE_PAGE_TITLE);

// BAD - Anti-pattern — brittle hardcoded string
cy.get(this.pageTitle).should('have.text', 'Checkout: Your Information');
```

---

### `data-test` Attribute Selectors

All locators target `[data-test="..."]` attributes rather than CSS classes, element tags, or text content. These attributes exist solely for testing and are immune to styling refactors or markup restructuring.

```typescript
readonly continueBtn = '[data-test="continue"]';
```

---

### `cy.loginAsStandardUser()` Custom Command

The `cy.session()`-backed login flow is registered as a Cypress custom command in `cypress/support/commands.ts`. Any spec that requires an authenticated state calls a single line instead of repeating the session setup boilerplate. The `cy.session()` cache means the login form runs only once per spec — subsequent tests restore the session from cache, cutting redundant network round-trips.

```typescript
beforeEach(() => {
  cy.loginAsStandardUser();
});
```

---

### `beforeEach` for Page Setup

All `describe` blocks use `beforeEach` rather than `before` to set up page state. Cypress's default `testIsolation: true` clears browser state between every test, so `before` would only reliably set up state for the first `it` in a block. `beforeEach` ensures a clean, consistent starting point for every test regardless of execution order.

---

### TypeScript Throughout

The entire project — page objects, constants, specs, support files, and custom command declarations — is written in TypeScript with `strict: true`. The `declare global` block in `commands.ts` provides full IDE autocompletion and compile-time type checking for custom commands, catching errors before the browser ever opens.

---

## Test Coverage

### Login Page — `cypress/e2e/Login.cy.ts`

#### Page Load
| # | Test | Status |
|---|------|--------|
| 1 | Displays all login form elements on initial page load | `COMPLETED` |
| 2 | Displays the accepted credentials container on page load | `COMPLETED` |
| 3 | Verifies that the `Login` button is enabled by default | `COMPLETED` |
| 4 | Verifies that the `Username` field is empty on page load | `COMPLETED` |
| 5 | Verifies that no error banner shown on initial page load | `COMPLETED` |
| 6 | Verifies that `Username` and `password` fields display correct placeholder text | `COMPLETED` |
| 7 | Verifies that `Page title` is correct | `COMPLETED` |

#### Unsuccessful Login Validation
| # | Test | Status |
|---|------|--------|
| 8 | Submitting with no username value shows the correct error message | `COMPLETED` |
| 9 | Submitting with no password value shows the correct error message | `COMPLETED` |
| 10 | Submitting with invalid credentials shows the correct error message | `COMPLETED` |

#### Successful Login
| # | Test | Status |
|---|------|--------|
| 11 | Standard user logs in and is redirected to the inventory page | `COMPLETED` |

#### TODOs — remaining items for full test coverage
- [ ] Error banner can be dismissed via the × button
- [ ] Dismissing the error banner re-enables form interaction cleanly
- [ ] Locked-out user sees the correct error message on login attempt
- [ ] Password field obscures input (type="password")
- [ ] Form submits correctly on Enter key press
- [ ] All accepted usernames (problem_user, performance_glitch_user, error_user, visual_user) can log in successfully

---

### Inventory Page — `cypress/e2e/Inventory.cy.ts`

> Session caching via `cy.session()` is used across all describe blocks so that the login flow executes once per block and is restored from cache for subsequent tests, avoiding redundant form interactions.

#### Page Load
| # | Test | Status |
|---|------|--------|
| 1 | Inventory container, title, and URL are visible and correct | `COMPLETED` |
| 2 | Page title reads "Products" | `COMPLETED` |
| 3 | All six products are rendered | `COMPLETED` |
| 4 | Cart badge is not shown on initial load | `COMPLETED` |

#### Sorting
| # | Test | Status |
|---|------|--------|
| 5 | Sort by Name A → Z produces correct order | `COMPLETED` |
| 6 | Sort by Name Z → A produces correct order | `COMPLETED` |
| 7 | Sort by Price low → high produces correct order | `COMPLETED` |
| 8 | Sort by Price high → low produces correct order | `COMPLETED` |

#### Cart Interactions
| # | Test | Status |
|---|------|--------|
| 9 | Adding one item updates badge to 1 | `COMPLETED` |
| 10 | Adding two items increments badge to 2 | `COMPLETED` |
| 11 | Removing one of two items decrements badge to 1 | `COMPLETED` |
| 12 | Remove button is shown after adding an item | `COMPLETED` |
| 13 | Add to Cart button reappears after removing an item | `COMPLETED` |
| 14 | Cart badge disappears after the last item is removed | `COMPLETED` |

#### Navigation
| # | Test | Status |
|---|------|--------|
| 15 | Cart icon click navigates to `/cart.html` | `COMPLETED` |
| 16 | Product name click navigates to `/inventory-item.html` | `COMPLETED` |
| 17 | Burger menu logout redirects to the login page | `COMPLETED` |

#### TODOs — remaining items for full test coverage
- [ ] Each product card displays a name, description, price, and image
- [ ] All product prices are prefixed with `$` and are valid numbers
- [ ] Sort dropdown label updates to reflect the active sort option
- [ ] Sort order persists after navigating back from a product detail page
- [ ] Adding all 6 products updates the cart badge to 6
- [ ] Cart state persists after a page reload (session storage)
- [ ] Reset App State via burger menu clears the cart badge
- [ ] Cart icon navigates to cart and all added items are listed correctly
- [ ] Burger menu "All Items" link returns to the inventory from another page
- [ ] Burger menu "About" link navigates to the Sauce Labs marketing site
- [ ] Burger menu closes when the × button is clicked
- [ ] Product image click navigates to the correct product detail page
- [ ] `problem_user` — broken product images are visible
- [ ] `performance_glitch_user` — page load is delayed but ultimately succeeds
- [ ] `locked_out_user` — redirected back to login when attempting to access inventory directly

---

### Cart Page — `cypress/e2e/Cart.cy.ts`

> Session caching via `cy.session()` is used across all describe blocks so that the login flow executes once per block and is restored from cache for subsequent tests, avoiding redundant form interactions.

#### Page Load — Empty Cart
| # | Test | Status |
|---|------|--------|
| 1 | Loads the cart page with all key elements visible | `COMPLETED` |
| 2 | Displays the correct page title | `COMPLETED` |
| 3 | Shows the QTY and Description column headers | `COMPLETED` |
| 4 | Shows the Continue Shopping and Checkout buttons | `COMPLETED` |
| 5 | Renders an empty cart with no items | `COMPLETED` |
| 6 | Does not show a cart badge when the cart is empty | `COMPLETED` |

#### Page Load — Cart with Items
| # | Test | Status |
|---|------|--------|
| 7 | Loads the cart page correctly after adding items on the inventory page | `COMPLETED` |
| 8 | Displays the correct number of items in the cart | `COMPLETED` |
| 9 | Shows the cart badge with the correct count | `COMPLETED` |
| 10 | Shows all added item names in the cart | `COMPLETED` |

#### Item Removal
| # | Test | Status |
|---|------|--------|
| 11 | Removing an item decrements the item count | `COMPLETED` |
| 12 | Removing the last item empties the cart | `COMPLETED` |
| 13 | Cart badge disappears after the last item is removed | `COMPLETED` |
| 14 | Removing one item does not affect other items in the cart | `COMPLETED` |

#### Navigation
| # | Test | Status |
|---|------|--------|
| 15 | Continue Shopping button returns to the inventory page | `COMPLETED` |
| 16 | Checkout button navigates to checkout step one | `COMPLETED` |
| 17 | Cart badge count persists when navigating back from the cart | `COMPLETED` |
| 18 | Burger menu logout redirects to the login page | `COMPLETED` |
| 19 | Cart items persist between page navigations | `COMPLETED` |

#### TODOs — remaining items for full test coverage
- [ ] Each cart item displays a quantity, name, description, and price
- [ ] Item price in the cart matches the price on the inventory page
- [ ] Item quantity in the cart defaults to 1
- [ ] Removing an item from the cart updates the inventory page (Remove → Add to Cart)
- [ ] Cart state is preserved after a page reload
- [ ] Reset App State clears the cart
- [ ] `problem_user` — correct item names shown in the cart
- [ ] `performance_glitch_user` — cart updates correctly despite page delays
- [ ] Burger menu "All Items" link returns to the inventory from the cart page

---

### Checkout Flow — `cypress/e2e/Checkout.cy.ts`

> Session caching via `cy.session()` is used across all describe blocks so that the login flow executes once per block and is restored from cache for subsequent tests, avoiding redundant form interactions.

#### Checkout Step One — Page Load
| # | Test | Status |
|---|------|--------|
| 1 | Loads the checkout step one page with all key elements visible | `COMPLETED` |
| 2 | Displays the correct page title | `COMPLETED` |
| 3 | Renders the first name, last name, and postal code inputs | `COMPLETED` |
| 4 | Renders the Continue and Cancel buttons | `COMPLETED` |
| 5 | Does not show an error message on initial page load | `COMPLETED` |
| 6 | Clicking Cancel navigates back to the cart page | `COMPLETED` |

#### Checkout Step One — Validation
| # | Test | Status |
|---|------|--------|
| 7 | Shows an error when Continue is clicked with no first name | `COMPLETED` |
| 8 | Shows an error when Continue is clicked with no last name | `COMPLETED` |
| 9 | Shows an error when Continue is clicked with no postal code | `COMPLETED` |
| 10 | Clicking the dismiss button removes the error message | `COMPLETED` |

#### Checkout Step Two — Order Overview
| # | Test | Status |
|---|------|--------|
| 11 | Loads the step two page with all key elements visible | `COMPLETED` |
| 12 | Displays the correct page title | `COMPLETED` |
| 13 | Shows the correct number of order items | `COMPLETED` |
| 14 | Shows the correct item name in the order summary | `COMPLETED` |
| 15 | Displays the Payment Information section | `COMPLETED` |
| 16 | Displays the Shipping Information section | `COMPLETED` |
| 17 | Displays the price summary (subtotal, tax, total) | `COMPLETED` |
| 18 | Renders the Finish and Cancel buttons | `COMPLETED` |
| 19 | Clicking Cancel returns to the inventory page | `COMPLETED` |

#### Checkout Complete — Confirmation
| # | Test | Status |
|---|------|--------|
| 20 | Loads the confirmation page with all key elements visible | `COMPLETED` |
| 21 | Displays the correct page title | `COMPLETED` |
| 22 | Shows the order confirmation header | `COMPLETED` |
| 23 | Shows the confirmation body copy | `COMPLETED` |
| 24 | Displays the Pony Express delivery image | `COMPLETED` |
| 25 | Clicking Back to Products navigates to the inventory page | `COMPLETED` |

#### End-to-End Flow — `cypress/e2e/Checkout-e2e.cy.ts`
| # | Test | Status |
|---|------|--------|
| 26 | Full e2e: login → add item to cart → checkout → fill info → confirm order | `COMPLETED` |

#### TODOs — remaining items for full test coverage
- [ ] Error message is highlighted / focused for accessibility on step one
- [ ] Filled values are retained after dismissing a validation error
- [ ] Subtotal on step two matches the sum of individual item prices
- [ ] Tax amount is calculated correctly
- [ ] Total equals subtotal + tax
- [ ] Correct prices shown when multiple items are in the order
- [ ] Correct item count shown when multiple items are added before checkout
- [ ] All added item names appear in the order summary
- [ ] Cart badge disappears after completing the order
- [ ] Cart is empty after returning to the inventory via Back to Products
- [ ] `problem_user` — correct items shown on step two
- [ ] `error_user` — graceful handling of any network errors during checkout
- [ ] `performance_glitch_user` — checkout completes successfully
