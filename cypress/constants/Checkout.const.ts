// Step One — Customer Information
export const STEP_ONE_PAGE_TITLE = 'Checkout: Your Information';
export const STEP_ONE_PAGE_URL = '/checkout-step-one.html';

export const FIRST_NAME_PLACEHOLDER = 'First Name';
export const LAST_NAME_PLACEHOLDER = 'Last Name';
export const POSTAL_CODE_PLACEHOLDER = 'Zip/Postal Code';

export const FIRST_NAME_REQUIRED_ERROR = 'Error: First Name is required';
export const LAST_NAME_REQUIRED_ERROR = 'Error: Last Name is required';
export const POSTAL_CODE_REQUIRED_ERROR = 'Error: Postal Code is required';

// Step Two — Overview
export const STEP_TWO_PAGE_TITLE = 'Checkout: Overview';
export const STEP_TWO_PAGE_URL = '/checkout-step-two.html';

export const PAYMENT_INFO_LABEL = 'Payment Information:';
export const SHIPPING_INFO_LABEL = 'Shipping Information:';
export const TOTAL_INFO_LABEL = 'Price Total';

// Complete — Confirmation
export const COMPLETE_PAGE_TITLE = 'Checkout: Complete!';
export const COMPLETE_PAGE_URL = '/checkout-complete.html';

export const COMPLETE_HEADER_TEXT = 'Thank you for your order!';
export const COMPLETE_BODY_TEXT =
  'Your order has been dispatched, and will arrive just as fast as the pony can get there!';

// Test Fixture Data
export const CHECKOUT_USER = {
  firstName: 'Test',
  lastName: 'User',
  postalCode: '12345',
} as const;
