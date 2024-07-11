import { useEffect, useState } from "react";
7;

// Hooks
import { useFetchAllCounty } from "./firebase/useFetchAllCounty";
import { useMemoryLeak } from "./useMemoryLeak";

export const useSelectCounty = (district_id = 0) => {
    const { rowArr } = useFetchAllCounty(district_id);
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
                        value: row.county_id,
                    };

                    setOptionArr((currentData) => [...currentData, newData]);
                });
            }

            setLoading(false);
        }

        loadData();
    }, [rowArr, cancelled, district_id]);

    return { optionArr, loading };
};
