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

## Project Structure

```
.
├── cypress/
│   ├── constants/        # Exported string/selector constants per page
│   │   ├── Login.const.ts
│   │   └── Inventory.const.ts
│   ├── e2e/              # Test spec files
│   │   ├── Login.cy.ts
│   │   └── Inventory.cy.ts
│   ├── fixtures/         # Static test data (JSON)
│   ├── pages/            # Page Object Model classes
│   │   ├── LoginPage.ts
│   │   └── InventoryPage.ts
│   └── support/          # Custom commands and global configuration
├── cypress.config.js     # Cypress configuration
└── package.json
```

## Configuration

Cypress settings such as base URL and timeouts are managed in `cypress.config.js`.

Refer to the [Cypress configuration docs](https://docs.cypress.io/app/references/configuration) for all available options.

## Cypress Version

This project uses **Cypress 15.11.0**.

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
- [ ] All interactive elements are keyboard-navigable (accessibility)
