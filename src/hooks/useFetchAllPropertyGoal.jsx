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

export const useFetchAllPropertyGoal = () => {
    const [propertyGoalArr, setPropertyGoalArr] = useState(null);
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
            const collectionRef = await collection(db, "property_goal");

            try {
                let q = await query(collectionRef, orderBy("name", "asc"));

                await onSnapshot(q, (querySnapshot) => {
                    setPropertyGoalArr(
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

    return { propertyGoalArr, loading, error };
};
