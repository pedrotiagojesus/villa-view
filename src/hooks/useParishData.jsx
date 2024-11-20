import { useState, useEffect } from "react";

// API
import { getParishes } from "../api/service/parishService";

// Utils
import { getCache, isCacheStale, setCache } from "../utils/cache";

const useParishData = (countyId) => {
    const localStorageName = `parish-${countyId}`;

    const initialCounties = getCache(localStorageName) || [];
    const [parishArr, setParishArr] = useState(initialCounties);
    const [loading, setLoading] = useState(!initialCounties.length);

    useEffect(() => {
        if (!countyId) {
            setParishArr([]);
            setLoading(false);
            return;
        }

        const fetchParishes = async () => {
            setLoading(true);

            try {
                const data = await getParishes(countyId);

                if (JSON.stringify(data) !== JSON.stringify(parishArr)) {
                    setParishArr(data);
                    setCache(localStorageName, data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (isCacheStale(localStorageName)) {
            fetchParishes();
        } else {
            const initialCounties = getCache(localStorageName) || [];
            setParishArr(initialCounties);
            setLoading(false);
        }
    }, [countyId]);

    return { parishArr, loading };
};

export default useParishData;
