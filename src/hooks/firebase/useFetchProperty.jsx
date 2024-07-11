import { useEffect, useReducer } from "react";

// Firebase
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

// Hooks
import { usePropertyCoverImage } from "./usePropertyCoverImage";
import { usePropertyOtherImage } from "./usePropertyOtherImage";

const initialState = {
    loading: null,
    error: null,
    data: null,
};

const fetchReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null, data: null };
        case "FETCH_PROPERTY":
            return { loading: false, error: null, data: action.payload };
        case "ERROR":
            return { loading: false, error: action.payload, data: null };
        default:
            return state;
    }
};

export const useFetchProperty = (id) => {
    const { getUrl: getUrlCoverImage } = usePropertyCoverImage();
    const { getUrlArrOtherImage } = usePropertyOtherImage();

    const [response, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        const loadDocument = async () => {
            dispatch({ type: "LOADING" });

            try {
                const docRef = doc(db, "property", id);
                const docSnap = await getDoc(docRef);
                const property = docSnap.data();
                property.id = id;
                property.cover_image_url = await getUrlCoverImage(
                    property.cover_image
                );

                property.other_image_url = await getUrlArrOtherImage(
                    property.other_image
                );

                dispatch({ type: "FETCH_PROPERTY", payload: property });
            } catch (error) {
                console.log(error);
                dispatch({ type: "ERROR", error: error.message });
            }
        };

        loadDocument();
    }, [id]);

    return { response };
};
