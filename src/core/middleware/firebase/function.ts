import { FirebaseApp } from 'firebase/app';
import {
  Functions,
  getFunctions,
  // connectFunctionsEmulator,
} from 'firebase/functions';

let functions: Functions;
export const FuncionsInit = (app: FirebaseApp, region?: string) => {
  console.log('Firebase Init : Functions');
  functions = getFunctions(app, region);
};

export const GetFuncions = (): Functions => {
  return functions;
};

// ================================================

export default {};
