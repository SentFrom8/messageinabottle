import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9tisigJEIcqkTOlO2lMZdjupj-gs7e8I",
  authDomain: "messageinabottle-80545.firebaseapp.com",
  projectId: "messageinabottle-80545",
  storageBucket: "messageinabottle-80545.appspot.com",
  messagingSenderId: "727823511636",
  appId: "1:727823511636:web:4e5337bfd58f1eaa78fdc1",
  measurementId: "G-72HSKHVMSW"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

