import { useEffect, useState } from "react";
7;

// Hooks
import { useFetchAllParish } from "./firebase/useFetchAllParish";
import { useMemoryLeak } from "./useMemoryLeak";

export const useSelectParish = (county_id = 0) => {
    const { rowArr } = useFetchAllParish(county_id);
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
                        value: row.parish_id,
                    };

                    setOptionArr((currentData) => [...currentData, newData]);
                });
            }

            setLoading(false);
        }

        loadData();
    }, [rowArr, cancelled, county_id]);

    return { optionArr, loading };
};
