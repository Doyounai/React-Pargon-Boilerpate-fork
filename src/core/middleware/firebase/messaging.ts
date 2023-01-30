import { FirebaseApp } from 'firebase/app';
import { getMessaging, getToken, Messaging } from 'firebase/messaging';

let messaging: Messaging;
export const MessagingInit = (app: FirebaseApp) => {
  console.log('Firebase Init : Messaging');
  messaging = getMessaging(app);
};

export const GetMessaging = (): Messaging => {
  return messaging;
};

// ================================================

export const testGetToken = async () => {
  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_CRED_WEB_PUSH,
  });
  console.log('Device token: ', token);
};

export default {};
