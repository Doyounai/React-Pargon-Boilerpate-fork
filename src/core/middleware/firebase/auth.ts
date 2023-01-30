import { FirebaseApp } from 'firebase/app';
import {
  Auth,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { HelperPromise } from 'universal-helper';

let auth: Auth;
export const AuthInit = async (app: FirebaseApp) => {
  console.log('Firebase Init : Auth');
  auth = getAuth(app);
  await setPersistence(auth, browserLocalPersistence);
};

export const GetAuth = (): Auth => {
  return auth;
};

// ================================================

const SignInWithEmailAndPassword = (sEmail: string, sPassword: string) => {
  return HelperPromise.GolangResponse(
    signInWithEmailAndPassword(auth, sEmail, sPassword),
  );
};

const CreateUserWithEmailAndPassword = (sEmail: string, sPassword: string) => {
  return HelperPromise.GolangResponse(
    createUserWithEmailAndPassword(auth, sEmail, sPassword),
  );
};

const SignOut = () => {
  return signOut(auth);
};

// firebase.auth().onAuthStateChanged(user => {
//   if (user) {
//     authWrapper.classList.remove('open');
//     authModals.forEach(modal => modal.classList.remove('active'));
//   } else {
//     authWrapper.classList.add('open');
//     authModals[0].classList.add('active');
//   }
// });

export default {
  SignInWithEmailAndPassword,
  CreateUserWithEmailAndPassword,
  SignOut,
  GetAuth,
};
