import { useReducer } from "react";

import { db } from "../firebase/config";
import {
    collection,
    addDoc,
    Timestamp,
    updateDoc,
    doc,
} from "firebase/firestore";

const initialState = {
    loading: null,
    error: null,
    data: null,
};

const insertReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { status: null, loading: true, data: null };
        case "INSERTED_PROPERTY":
        case "UPDATED_PROPERTY":
            return { status: "success", loading: false, data: action.payload };
        case "ERROR":
            return { status: "error", loading: false, data: action.payload };
        default:
            return state;
    }
};

export const useProperty = () => {
    const [response, dispatch] = useReducer(insertReducer, initialState);

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

    const updateProperty = async (id, document) => {
        dispatch({ type: "LOADING" });

        try {
            const docRef = await doc(db, "property", id);
            const updatedDocument = await updateDoc(docRef, document);

            dispatch({
                type: "UPDATED_PROPERTY",
                payload: docRef.id,
            });
        } catch (error) {
            dispatch({
                type: "ERROR",
                payload: error.message,
            });
        }
    };

    return { insertProperty, updateProperty, response };
};
