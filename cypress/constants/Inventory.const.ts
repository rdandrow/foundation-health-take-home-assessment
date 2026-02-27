// Page title and URL
export const INVENTORY_PAGE_TITLE = 'Products';
export const INVENTORY_PAGE_URL = '/inventory.html';

// Sorting options
export const SORT_NAME_ASC = 'az';
export const SORT_NAME_DESC = 'za';
export const SORT_PRICE_ASC = 'lohi';
export const SORT_PRICE_DESC = 'hilo';

// Products
export const TOTAL_PRODUCT_COUNT = 6;

export const PRODUCTS = {
  BACKPACK: {
    name: 'Sauce Labs Backpack',
    addToCartSelector: 'add-to-cart-sauce-labs-backpack',
    removeSelector: 'remove-sauce-labs-backpack',
  },
  BIKE_LIGHT: {
    name: 'Sauce Labs Bike Light',
    addToCartSelector: 'add-to-cart-sauce-labs-bike-light',
    removeSelector: 'remove-sauce-labs-bike-light',
  },
  BOLT_T_SHIRT: {
    name: 'Sauce Labs Bolt T-Shirt',
    addToCartSelector: 'add-to-cart-sauce-labs-bolt-t-shirt',
    removeSelector: 'remove-sauce-labs-bolt-t-shirt',
  },
  FLEECE_JACKET: {
    name: 'Sauce Labs Fleece Jacket',
    addToCartSelector: 'add-to-cart-sauce-labs-fleece-jacket',
    removeSelector: 'remove-sauce-labs-fleece-jacket',
  },
  ONESIE: {
    name: 'Sauce Labs Onesie',
    addToCartSelector: 'add-to-cart-sauce-labs-onesie',
    removeSelector: 'remove-sauce-labs-onesie',
  },
  RED_T_SHIRT: {
    name: 'Test.allTheThings() T-Shirt (Red)',
    addToCartSelector: 'add-to-cart-test.allthethings()-t-shirt-(red)',
    removeSelector: 'remove-test.allthethings()-t-shirt-(red)',
  },
} as const;
