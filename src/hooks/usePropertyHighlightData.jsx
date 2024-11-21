import { useState, useEffect } from "react";

// API
import { getPropertyHighlights } from "../api/service/propertyHighlightService";

// Utils
import { getCache, isCacheStale, setCache } from "../utils/cache";

const usePropertyHighlightData = () => {
    const localStorageName = "property-highlight";

    const initialPropertyHighlights = getCache(localStorageName) || [];
    const [propertyHighlightArr, setPropertyHighlightArr] = useState(
        initialPropertyHighlights
    );
    const [loading, setLoading] = useState(!initialPropertyHighlights.length);

    useEffect(() => {
        const fetchPropertyHighlights = async () => {
            setLoading(true);
            try {
                const data = await getPropertyHighlights();
                if (
                    JSON.stringify(data) !==
                    JSON.stringify(propertyHighlightArr)
                ) {
                    setPropertyHighlightArr(data);
                    setCache(localStorageName, data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (isCacheStale(localStorageName)) {
            fetchPropertyHighlights();
        } else {
            setLoading(false);
        }
    }, []);

    return { propertyHighlightArr, loading };
};

export default usePropertyHighlightData;
