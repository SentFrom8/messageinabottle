import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore, orderBy, query } from 'firebase/firestore'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

/*const firebaseConfig = {
  apiKey: "AIzaSyC9tisigJEIcqkTOlO2lMZdjupj-gs7e8I",
  authDomain: "messageinabottle-80545.firebaseapp.com",
  projectId: "messageinabottle-80545",
  storageBucket: "messageinabottle-80545.appspot.com",
  messagingSenderId: "727823511636",
  appId: "1:727823511636:web:4e5337bfd58f1eaa78fdc1",
  measurementId: "G-72HSKHVMSW"
};*/

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const messagesCollection = collection(db, "messages");
export const orderedQuery = query(messagesCollection, orderBy("date", "asc"));

