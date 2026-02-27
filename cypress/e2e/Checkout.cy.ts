import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import * as CHECKOUT from '../constants/Checkout.const';
import * as INVENTORY_PAGE from '../constants/Inventory.const';
import * as CART_PAGE from '../constants/Cart.const';
import * as LOGIN_PAGE from '../constants/Login.const';

describe('Checkout Flow', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();
  const stepOnePage = new CheckoutStepOnePage();
  const stepTwoPage = new CheckoutStepTwoPage();
  const completePage = new CheckoutCompletePage();

  // Cache the authenticated session so the login flow only runs once per block.
  const loginAsStandardUser = () => {
    cy.session(
      LOGIN_PAGE.STANDARD_USER_USERNAME,
      () => {
        loginPage.visit();
        loginPage.loginWithCredentials(
          LOGIN_PAGE.STANDARD_USER_USERNAME,
          LOGIN_PAGE.STANDARD_USER_PASSWORD
        );
        loginPage.assertLoginSuccess();
      },
      { cacheAcrossSpecs: false }
    );
  };

  // Navigate to checkout step one: login → add backpack → cart → checkout button.
  const navigateToStepOne = () => {
    loginAsStandardUser();
    inventoryPage.visit();
    inventoryPage.addToCart(INVENTORY_PAGE.PRODUCTS.BACKPACK.addToCartSelector);
    inventoryPage.clickCart();
    cartPage.proceedToCheckout();
  };

  // Navigate to checkout step two: step one + fill and submit the form.
  const navigateToStepTwo = () => {
    navigateToStepOne();
    stepOnePage.submitCheckoutInfo(
      CHECKOUT.CHECKOUT_USER.firstName,
      CHECKOUT.CHECKOUT_USER.lastName,
      CHECKOUT.CHECKOUT_USER.postalCode
    );
  };

  // Navigate to the confirmation page: step two + click Finish.
  const navigateToComplete = () => {
    navigateToStepTwo();
    stepTwoPage.clickFinish();
  };

  describe('Checkout Step One — Page Load', () => {
    beforeEach(() => {
      navigateToStepOne();
    });

    it('loads the checkout step one page with all key elements visible', () => {
      stepOnePage.assertPageVisible();
    });

    it('displays the correct page title', () => {
      cy.get(stepOnePage.pageTitle)
        .should('be.visible')
        .and('have.text', CHECKOUT.STEP_ONE_PAGE_TITLE);
    });

    it('renders the first name, last name, and postal code inputs', () => {
      cy.get(stepOnePage.firstNameInput)
        .should('be.visible')
        .and('have.attr', 'placeholder', CHECKOUT.FIRST_NAME_PLACEHOLDER);
      cy.get(stepOnePage.lastNameInput)
        .should('be.visible')
        .and('have.attr', 'placeholder', CHECKOUT.LAST_NAME_PLACEHOLDER);
      cy.get(stepOnePage.postalCodeInput)
        .should('be.visible')
        .and('have.attr', 'placeholder', CHECKOUT.POSTAL_CODE_PLACEHOLDER);
    });

    it('renders the Continue and Cancel buttons', () => {
      cy.get(stepOnePage.continueBtn).should('be.visible').and('be.enabled');
      cy.get(stepOnePage.cancelBtn).should('be.visible').and('be.enabled');
    });

    it('does not show an error message on initial page load', () => {
      stepOnePage.assertNoErrorMessage();
    });

    it('clicking Cancel navigates back to the cart page', () => {
      stepOnePage.clickCancel();
      cy.url().should('include', CART_PAGE.CART_PAGE_URL);
    });
  });

  describe('Checkout Step One — Validation', () => {
    beforeEach(() => {
      navigateToStepOne();
    });

    it('shows an error when Continue is clicked with no first name', () => {
      stepOnePage
        .enterLastName(CHECKOUT.CHECKOUT_USER.lastName)
        .enterPostalCode(CHECKOUT.CHECKOUT_USER.postalCode)
        .clickContinue();
      stepOnePage.assertErrorMessage(CHECKOUT.FIRST_NAME_REQUIRED_ERROR);
    });

    it('shows an error when Continue is clicked with no last name', () => {
      stepOnePage
        .enterFirstName(CHECKOUT.CHECKOUT_USER.firstName)
        .enterPostalCode(CHECKOUT.CHECKOUT_USER.postalCode)
        .clickContinue();
      stepOnePage.assertErrorMessage(CHECKOUT.LAST_NAME_REQUIRED_ERROR);
    });

    it('shows an error when Continue is clicked with no postal code', () => {
      stepOnePage
        .enterFirstName(CHECKOUT.CHECKOUT_USER.firstName)
        .enterLastName(CHECKOUT.CHECKOUT_USER.lastName)
        .clickContinue();
      stepOnePage.assertErrorMessage(CHECKOUT.POSTAL_CODE_REQUIRED_ERROR);
    });

    it('clicking the dismiss button removes the error message', () => {
      stepOnePage.clickContinue();
      stepOnePage.assertErrorMessage(CHECKOUT.FIRST_NAME_REQUIRED_ERROR);
      stepOnePage.dismissError();
      stepOnePage.assertNoErrorMessage();
    });
  });

  describe('Checkout Step Two — Order Overview', () => {
    beforeEach(() => {
      navigateToStepTwo();
    });

    it('loads the step two page with all key elements visible', () => {
      stepTwoPage.assertPageVisible();
    });

    it('displays the correct page title', () => {
      cy.get(stepTwoPage.pageTitle)
        .should('be.visible')
        .and('have.text', CHECKOUT.STEP_TWO_PAGE_TITLE);
    });

    it('shows the correct number of order items', () => {
      stepTwoPage.assertOrderItemCount(1);
    });

    it('shows the correct item name in the order summary', () => {
      stepTwoPage.assertItemInSummary(INVENTORY_PAGE.PRODUCTS.BACKPACK.name);
    });

    it('displays the Payment Information section', () => {
      stepTwoPage.assertPaymentInfoVisible();
    });

    it('displays the Shipping Information section', () => {
      stepTwoPage.assertShippingInfoVisible();
    });

    it('displays the price summary (subtotal, tax, total)', () => {
      stepTwoPage.assertPriceSummaryVisible();
    });

    it('renders the Finish and Cancel buttons', () => {
      stepTwoPage.assertActionButtonsVisible();
    });

    it('clicking Cancel returns to the inventory page', () => {
      stepTwoPage.clickCancel();
      cy.url().should('include', INVENTORY_PAGE.INVENTORY_PAGE_URL);
    });
  });

  describe('Checkout Complete — Confirmation', () => {
    beforeEach(() => {
      navigateToComplete();
    });

    it('loads the confirmation page with all key elements visible', () => {
      completePage.assertPageVisible();
    });

    it('displays the correct page title', () => {
      cy.get(completePage.pageTitle)
        .should('be.visible')
        .and('have.text', CHECKOUT.COMPLETE_PAGE_TITLE);
    });

    it('shows the order confirmation header', () => {
      completePage.assertCompleteHeader();
    });

    it('shows the confirmation body copy', () => {
      completePage.assertCompleteBody();
    });

    it('displays the Pony Express delivery image', () => {
      completePage.assertPonyExpressImageVisible();
    });

    it('clicking Back to Products navigates to the inventory page', () => {
      completePage.clickBackToProducts();
      cy.url().should('include', INVENTORY_PAGE.INVENTORY_PAGE_URL);
    });
  });

});
