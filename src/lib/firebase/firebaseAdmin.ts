import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const apps = getApps();

export const adminApp = () => {

    return apps.length ? apps[0] : initializeApp({
        credential: cert({
            projectId: process.env.GCP_PROJECT_ID,
            clientEmail: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
            privateKey: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    });
};

export const adminDb = () => {
    console.log("adminApp ran");
    return getFirestore(adminApp());
};

export const adminMessagesCollection = adminDb().collection("messages");