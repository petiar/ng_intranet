// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyD6RQWUtge9kdEJ8uhOgf12kjrt1Oq7Uy8",
    authDomain: "fls-intranet.firebaseapp.com",
    databaseURL: "https://fls-intranet.firebaseio.com",
    projectId: "fls-intranet",
    storageBucket: "fls-intranet.appspot.com",
    messagingSenderId: "97494651751"
  },
  oauth: {
      grant_type: 'password',
      client_id: '72c9a4ce-1d18-4142-ba82-d038f202dce2',
      client_secret: 'abc123',
      api_url: 'http://timesheet.lndo.site:8080/oauth/token'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
