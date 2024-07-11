import { useState, useEffect } from "react";

// Firebase
import { db } from "../../firebase/config";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
} from "firebase/firestore";

// Hooks
import { useMemoryLeak } from "../useMemoryLeak";

export const useFetchAllParish = (county_id = 0) => {
    const [rowArr, setRowArr] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const { cancelled } = useMemoryLeak();

    useEffect(() => {
        async function loadData() {
            if (cancelled) {
                return;
            }

            if (county_id === 0) {
                setRowArr([]);
                return;
            }

            setLoading(true);
            const collectionRef = await collection(db, "parish");

            try {
                let q = await query(
                    collectionRef,
                    where("county_id", "==", county_id),
                    orderBy("name", "asc")
                );

                await onSnapshot(q, (querySnapshot) => {
                    setRowArr(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                });
            } catch (error) {
                setError(error.message);
                console.log(error);
            }

            setLoading(false);
        }

        loadData();
    }, [cancelled, county_id]);

    return { rowArr, loading, error };
};
