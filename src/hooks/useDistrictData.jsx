import { useState, useEffect } from "react";

// API
import { getDistricts } from "../api/service/districtService";

// Utils
import { getCache, isCacheStale, setCache } from "../utils/cache";

const useDistrictData = () => {
    const localStorageName = "district";

    const initialDistricts = getCache(localStorageName) || [];
    const [districtArr, setDistrictArr] = useState(initialDistricts);
    const [loading, setLoading] = useState(!initialDistricts.length);

    useEffect(() => {
        const fetchDistricts = async () => {
            setLoading(true);
            try {
                const data = await getDistricts();
                if (
                    data != null &&
                    JSON.stringify(data) !== JSON.stringify(districtArr)
                ) {
                    setDistrictArr(data);
                    setCache(localStorageName, data);
                } else {
                    setDistrictArr([]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (isCacheStale(localStorageName)) {
            fetchDistricts();
        } else {
            setLoading(false);
        }
    }, []);

    return { districtArr, loading };
};

export default useDistrictData;
