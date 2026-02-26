# Foundation Health Take-Home Assessment

An end-to-end test suite built with [Cypress](https://www.cypress.io/).

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
│   ├── e2e/          # Test spec files
│   ├── fixtures/     # Static test data (JSON)
│   └── support/      # Custom commands and global configuration
├── cypress.config.js # Cypress configuration
└── package.json
```

## Configuration

Cypress settings such as (base URL, timeouts, etc.) are managed in `cypress.config.js`. 

Refer to the [Cypress configuration docs](https://docs.cypress.io/app/references/configuration) for all available options.

## Cypress Version

This project uses **Cypress 15.11.0**.

