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

export const useFetchAllCounty = (district_id = 0) => {
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

            if (district_id === 0) {
                setRowArr([]);
                return;
            }

            setLoading(true);
            const collectionRef = await collection(db, "county");

            try {
                let q = await query(
                    collectionRef,
                    where("district_id", "==", district_id),
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
    }, [cancelled, district_id]);

    return { rowArr, loading, error };
};
