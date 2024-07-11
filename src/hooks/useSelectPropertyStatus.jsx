import { useEffect, useState } from "react";
7;

// Hooks
import { useFetchAllPropertyStatus } from "./firebase/useFetchAllPropertyStatus";
import { useMemoryLeak } from "./useMemoryLeak";

export const useSelectPropertyStatus = () => {
    const { rowArr } = useFetchAllPropertyStatus();
    const [loading, setLoading] = useState(null);
    const [optionArr, setOptionArr] = useState([]);

    // deal with memory leak
    const { cancelled } = useMemoryLeak();

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            setOptionArr([]);

            if (Array.isArray(rowArr)) {
                rowArr.map((row) => {
                    const newData = {
                        label: row.name,
                        value: row.property_status_id,
                    };

                    setOptionArr((currentData) => [...currentData, newData]);
                });
            }

            setLoading(false);
        }

        loadData();
    }, [rowArr, cancelled]);

    return { optionArr, loading };
};
