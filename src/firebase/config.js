import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAHMYBrP9HglhCxz3jdT0c8Q_QaotMg0vg",
    authDomain: "villa-view-40e63.firebaseapp.com",
    projectId: "villa-view-40e63",
    storageBucket: "villa-view-40e63.appspot.com",
    messagingSenderId: "435437258794",
    appId: "1:435437258794:web:1311b8d2a44aa8410d5b53",
    measurementId: "G-4NSLQT6M54",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
