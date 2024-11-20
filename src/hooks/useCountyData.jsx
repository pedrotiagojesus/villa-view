import { useState, useEffect } from "react";

// API
import { getCounties } from "../api/service/countyService";

// Utils
import { getCache, isCacheStale, setCache } from "../utils/cache";

const useCountyData = (districtId) => {
    const localStorageName = `county-${districtId}`;

    const initialCounties = getCache(localStorageName) || [];
    const [countyArr, setCountyArr] = useState(initialCounties);
    const [loading, setLoading] = useState(!initialCounties.length);

    useEffect(() => {
        if (!districtId) {
            setCountyArr([]);
            setLoading(false);
            return;
        }

        const fetchCounties = async () => {
            setLoading(true);

            try {
                const data = await getCounties(districtId);

                if (JSON.stringify(data) !== JSON.stringify(countyArr)) {
                    setCountyArr(data);
                    setCache(localStorageName, data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (isCacheStale(localStorageName)) {
            fetchCounties();
        } else {
            const initialCounties = getCache(localStorageName) || [];
            setCountyArr(initialCounties);
            setLoading(false);
        }
    }, [districtId]);

    return { countyArr, loading };
};

export default useCountyData;
