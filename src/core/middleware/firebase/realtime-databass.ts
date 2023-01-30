import { FirebaseApp } from 'firebase/app';
import { Database, DataSnapshot, getDatabase, onValue, ref } from 'firebase/database';

let rtdb: Database;
export const RealtimeDatabaseInit = (app: FirebaseApp) => {
  console.log('Firebase Init : Realtime Database');
  rtdb = getDatabase(app);
};

export const GetRealtimeDatabase = (): Database => {
  return rtdb;
};

// ================================================

const Subscribe = (topic: string, callback?: any) => {
  const refTopic = ref(rtdb, topic);
  onValue(refTopic, (snapshot: DataSnapshot) => {
    const data = snapshot.val();
    if (callback) {
      callback(data);
    }
  });
};

export default {
  Subscribe,
};
