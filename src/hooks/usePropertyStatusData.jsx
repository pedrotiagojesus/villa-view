import { useState, useEffect } from "react";

// API
import { getPropertyStatus } from "../api/service/propertyStatusService";

// Utils
import { getCache, isCacheStale, setCache } from "../utils/cache";

const usePropertyStatusData = () => {
    const localStorageName = "property-status";

    const initialPropertyStatus = getCache(localStorageName) || [];
    const [propertyStatusArr, setPropertyStatusArr] = useState(
        initialPropertyStatus
    );
    const [loading, setLoading] = useState(!initialPropertyStatus.length);

    useEffect(() => {
        const fetchPropertyStatus = async () => {
            setLoading(true);
            try {
                const data = await getPropertyStatus();
                if (
                    JSON.stringify(data) !== JSON.stringify(propertyStatusArr)
                ) {
                    setPropertyStatusArr(data);
                    setCache(localStorageName, data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (isCacheStale(localStorageName)) {
            fetchPropertyStatus();
        } else {
            setLoading(false);
        }
    }, []);

    return { propertyStatusArr, loading };
};

export default usePropertyStatusData;
