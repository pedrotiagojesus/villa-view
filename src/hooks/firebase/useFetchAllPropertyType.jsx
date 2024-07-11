import { useState, useEffect } from "react";

// Firebase
import { db } from "../../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

// Hooks
import { useMemoryLeak } from "../useMemoryLeak";

export const useFetchAllPropertyType = () => {
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

            setLoading(true);
            const collectionRef = await collection(db, "property_type");

            try {
                let q = await query(collectionRef, orderBy("name", "asc"));

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
            }

            setLoading(false);
        }

        loadData();
    }, [cancelled]);

    return { rowArr, loading, error };
};
