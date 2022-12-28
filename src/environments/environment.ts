// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
};
export const firebaseConfig = {
  apiKey: 'AIzaSyAoxZLYJ86euRLtfZWQ2t-GF6M7-LQQDEQ',
  authDomain: 'vitor-f-app.firebaseapp.com',
  databaseURL: 'https://vitor-f-app-default-rtdb.firebaseio.com',
  projectId: 'vitor-f-app',
  storageBucket: 'vitor-f-app.appspot.com',
  messagingSenderId: '958962932104',
  appId: '1:958962932104:web:caeb6bd68cccda7e14c23d',
  measurementId: 'G-PKHMWVSSRL'
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
