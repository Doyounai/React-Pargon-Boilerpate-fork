import { FirebaseApp } from 'firebase/app';
import { doc, Firestore, getDoc, getFirestore, setDoc } from 'firebase/firestore';

let firestore: Firestore;
export const FirestoreInit = (app: FirebaseApp) => {
  console.log('Firebase Init : Firestore');
  firestore = getFirestore(app);
};

export const GetFirestore = (): Firestore => {
  return firestore;
};

// ====================================

const GetDocOrCreateIfNotExist = async (
  sCollection: string,
  sDoc: string,
  payload: any = {},
): Promise<any> => {
  let res = payload;
  const resSnapDoc = await GetDoc(sCollection, sDoc);

  if (!resSnapDoc.exists()) {
    await SetDoc(sCollection, sDoc, payload);
  } else {
    res = resSnapDoc.data();
  }

  return res;
};

const GetDoc = (sCollection: string, sDoc: string) => {
  return getDoc(doc(firestore, sCollection, sDoc));

  // return HelperPromise.GolangResponse(getDoc(doc(firestore, sCollection, sDoc)));
};
const SetDoc = (
  sCollection: string,
  sDoc: string,
  payload: object,
  isMerge?: boolean,
) => {
  return setDoc(
    doc(firestore, sCollection, sDoc),
    payload,
    isMerge ? { merge: true } : {},
  );

  // return HelperPromise.GolangResponse(getDoc(doc(firestore, sCollection, sDoc)));
};

export default {
  GetDocOrCreateIfNotExist,
  GetDoc,
  SetDoc,
};
