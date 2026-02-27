import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import * as CHECKOUT from '../constants/Checkout.const';
import * as INVENTORY_PAGE from '../constants/Inventory.const';

describe('End-to-End Checkout Flow', () => {
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();
  const stepOnePage = new CheckoutStepOnePage();
  const stepTwoPage = new CheckoutStepTwoPage();
  const completePage = new CheckoutCompletePage();

  beforeEach(() => {
    cy.loginAsStandardUser();
  });

  it('completes a full checkout: login → add item → cart → info → overview → confirm', () => {
    // Login and navigate to inventory
    inventoryPage.visit();
    inventoryPage.assertPageVisible();

    // Add Sauce Labs Backpack to the cart
    inventoryPage.addToCart(INVENTORY_PAGE.PRODUCTS.BACKPACK.addToCartSelector);
    inventoryPage.assertCartBadge(1);

    // Navigate to cart and proceed to checkout
    inventoryPage.clickCart();
    cartPage.assertPageVisible();
    cartPage.assertCartItemCount(1);
    cartPage.assertItemInCart(INVENTORY_PAGE.PRODUCTS.BACKPACK.name);
    cartPage.proceedToCheckout();

    // Step One — fill in customer information
    stepOnePage.assertPageVisible();
    stepOnePage.assertNoErrorMessage();
    stepOnePage.submitCheckoutInfo(
      CHECKOUT.CHECKOUT_USER.firstName,
      CHECKOUT.CHECKOUT_USER.lastName,
      CHECKOUT.CHECKOUT_USER.postalCode
    );

    // Step Two — verify order summary and finish
    stepTwoPage.assertPageVisible();
    stepTwoPage.assertOrderItemCount(1);
    stepTwoPage.assertItemInSummary(INVENTORY_PAGE.PRODUCTS.BACKPACK.name);
    stepTwoPage.assertPaymentInfoVisible();
    stepTwoPage.assertShippingInfoVisible();
    stepTwoPage.assertPriceSummaryVisible();
    stepTwoPage.clickFinish();

    // Confirmation page
    completePage.assertPageVisible();
    completePage.assertCompleteHeader();
    completePage.assertCompleteBody();
  });
});
