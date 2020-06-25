// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  base_url: 'https://sandbox.iexapis.com/',
  api_token: 'YOUR_SANDBOX_API_TOKEN',
  version: 'stable',
  symbol_stock: '/stock/',
  symbol_market: '/stock/market/batch',
  locale: 'en-US',
  dateFormat: 'MM/dd/yyyy',
  api_001: '/quote',
  api_002: '/company'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
