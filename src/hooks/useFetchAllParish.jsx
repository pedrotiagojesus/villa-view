import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
} from "firebase/firestore";
import { useMemoryLeak } from "./useMemoryLeak";

export const useFetchAllParish = (county_id = null) => {
    const [parishArr, setParishArr] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const { cancelled } = useMemoryLeak();

    useEffect(() => {
        async function loadData() {
            if (cancelled) {
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
                    setParishArr(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                });
            } catch (error) {
                setError(error.message);
            }

            setLoading(false);
        }

        loadData();
    }, [county_id, cancelled]);

    return { parishArr, loading, error };
};
