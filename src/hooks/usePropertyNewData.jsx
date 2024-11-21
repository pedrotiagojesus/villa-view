import { useState, useEffect } from "react";

// API
import { getPropertyNews } from "../api/service/propertyNewService";

// Utils
import { getCache, isCacheStale, setCache } from "../utils/cache";

const usePropertyNewData = () => {
    const localStorageName = "property-new";

    const initialPropertyNews = getCache(localStorageName) || [];
    const [propertyNewArr, setPropertyNewArr] = useState(initialPropertyNews);
    const [loading, setLoading] = useState(!initialPropertyNews.length);

    useEffect(() => {
        const fetchPropertyNews = async () => {
            setLoading(true);
            try {
                const data = await getPropertyNews();
                if (JSON.stringify(data) !== JSON.stringify(propertyNewArr)) {
                    setPropertyNewArr(data);
                    setCache(localStorageName, data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (isCacheStale(localStorageName)) {
            fetchPropertyNews();
        } else {
            setLoading(false);
        }
    }, []);

    return { propertyNewArr, loading };
};

export default usePropertyNewData;
