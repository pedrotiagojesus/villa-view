import { useReducer } from "react";

// Firebase
import { db, storage } from "../firebase/config";
import {
    collection,
    addDoc,
    Timestamp,
    doc,
    updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// Hooks
import { useMemoryLeak } from "./useMemoryLeak";

const initialState = {
    status: null,
    loading: null,
    data: null,
};

const insertReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { status: null, loading: true, data: null };
        case "INSERTED_PROPERTY":
            return { status: "success", loading: false, data: action.payload };
        case "ERROR":
            return { status: "error", loading: action.payload, data: null };
        default:
            return state;
    }
};

export const useInsertProperty = () => {
    const [response, dispatch] = useReducer(insertReducer, initialState);

    // deal with memory leak
    const { cancelled } = useMemoryLeak();

    const insertProperty = async (document) => {
        dispatch({ type: "LOADING" });

        try {
            const newProperty = { ...document, createdAt: Timestamp.now() };

            const insertedProperty = await addDoc(
                collection(db, "property"),
                newProperty
            ).then((docRef) => {
                dispatch({
                    type: "INSERTED_PROPERTY",
                    payload: docRef.id,
                });
            });
        } catch (error) {
            dispatch({
                type: "ERROR",
                payload: error.message,
            });
        }
    };

    return {
        insertProperty,
        response,
    };
};
