import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
} from "firebase/firestore";

// Hooks
import { useMemoryLeak } from "./useMemoryLeak";
import { usePropertyCoverImage } from "./usePropertyCoverImage";

export const useFetchAllPropertyHighlight = () => {
    const [propertyHighlightArr, setPropertyHighlightArr] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const { cancelled } = useMemoryLeak();

    const { getUrl: getUrlCoverImage } = usePropertyCoverImage();

    useEffect(() => {
        async function loadData() {
            if (cancelled) {
                return;
            }

            setLoading(true);
            const collectionRef = await collection(db, "property");

            try {
                let q = await query(
                    collectionRef,
                    where("is_highlight", "==", true),
                    where("is_visible", "==", true),
                    orderBy("createdAt", "desc")
                );

                await onSnapshot(q, async (querySnapshot) => {
                    setPropertyHighlightArr(
                        await Promise.all(
                            querySnapshot.docs.map(async (doc) => ({
                                id: doc.id,
                                ...doc.data(),
                                cover_image_url: await getUrlCoverImage(
                                    doc.data().cover_image
                                ),
                            }))
                        )
                    );
                });
            } catch (error) {
                setError(error.message);
            }

            setLoading(false);
        }

        loadData();
    }, [cancelled]);

    return { propertyHighlightArr, loading, error };
};
