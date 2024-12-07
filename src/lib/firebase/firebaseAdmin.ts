import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getGCPCredentials } from "./gcp";


const apps = getApps();

export const adminApp = apps.length ? apps[0] : initializeApp(getGCPCredentials());

export const adminDb = getFirestore(adminApp);
export const adminMessagesCollection = adminDb.collection("messages");