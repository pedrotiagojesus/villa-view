import { useEffect, useState } from "react";
7;

// Hooks
import { useFetchAllPropertyType } from "./firebase/useFetchAllPropertyType";
import { useMemoryLeak } from "./useMemoryLeak";

export const useSelectPropertyType = () => {
    const { rowArr } = useFetchAllPropertyType();
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
                        value: row.property_type_id,
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
