import { FirebaseApp, initializeApp } from 'firebase/app';

import Auth, { AuthInit } from './auth';
import Firestore, { FirestoreInit } from './firestore';
// import Functions, { FuncionsInit } from './function';
// import RealtimeDatabase, { RealtimeDatabaseInit } from './realtime-databass';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_CRED_APIKEY || undefined,
  authDomain: import.meta.env.VITE_FIREBASE_CRED_AUTHDOMAIN || undefined,
  databaseURL: import.meta.env.VITE_FIREBASE_CRED_DATABASEURL || undefined,
  projectId: import.meta.env.VITE_FIREBASE_CRED_PROJECTID || undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_CRED_STORAGEBUCKET || undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_CRED_MESSAGINGSENDERID || undefined,
  appId: import.meta.env.VITE_FIREBASE_CRED_APPID || undefined,
};

let app: FirebaseApp;

export const middlewareFirebaseInit = async () => {
  app = initializeApp(firebaseConfig);
  await AuthInit(app);
  // FuncionsInit(app, import.meta.env.VITE_FIREBASE_CONFIG_FUNCTION_REGION);
  // RealtimeDatabaseInit(app);
  // FirestoreInit(app);
  // MessagingInit(app);
};

export const middlewareFirebase = {
  Auth,
  Firestore,
  // Functions,
  // RealtimeDatabase,
};
