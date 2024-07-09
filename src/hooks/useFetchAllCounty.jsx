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

export const useFetchAllCounty = (district_id = null) => {
    const [countyArr, setCountyArr] = useState(null);
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

            const collectionRef = await collection(db, "county");

            try {
                let q = await query(
                    collectionRef,
                    where("district_id", "==", district_id),
                    orderBy("name", "asc")
                );

                await onSnapshot(q, (querySnapshot) => {
                    setCountyArr(
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
    }, [district_id, cancelled]);

    return { countyArr, loading, error };
};
