import { useState, useEffect, useReducer } from "react";
import { db } from "../../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

import { usePropertyCoverImage } from "./usePropertyCoverImage";
import { usePropertyOtherImage } from "./usePropertyOtherImage";

const initialState = {
    loading: null,
    error: null,
};

const deleteReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "DELETED_DOC":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const useDeleteProperty = () => {
    const [response, dispatch] = useReducer(deleteReducer, initialState);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    };

    const deleteProperty = async (id, cover_image, other_image_arr) => {
        checkCancelBeforeDispatch({ type: "LOADING" });

        const { deleteFile: deleteCoverImage } = usePropertyCoverImage();
        const { bulkDeleteFile: deleteOtherImage } = usePropertyOtherImage();

        try {
            const deletedDocument = await deleteDoc(doc(db, "property", id));

            deleteCoverImage(cover_image);
            deleteOtherImage(other_image_arr);

            checkCancelBeforeDispatch({
                type: "DELETED_DOC",
                payload: deletedDocument,
            });
        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            });
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { deleteProperty, response };
};
