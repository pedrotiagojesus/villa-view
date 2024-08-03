import data from "../data/parish.json";

import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const Parish = () => {
    data.map(async (parish) => {
        const document = { ...parish, createdAt: Timestamp.now() };
        const insertedDocument = await addDoc(
            collection(db, "parish"),
            document
        );

        // console.log(insertedDocument);
        console.log(document);

        await timeout(5000);
    });
};

const timeout = (delay) => {
    return new Promise((res) => setTimeout(res, delay));
};

export default Parish;