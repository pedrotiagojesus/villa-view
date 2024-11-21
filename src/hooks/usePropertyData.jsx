import { useState, useEffect } from "react";

// API
import { getProperty } from "../api/service/propertyService";

// Utils
import { getCache, isCacheStale, setCache } from "../utils/cache";

const usePropertyData = (propertyId) => {
    const localStorageName = `property-${propertyId}`;

    const initialProperty = getCache(localStorageName) || null;
    const [property, setProperty] = useState(initialProperty);
    const [loading, setLoading] = useState(!initialProperty);

    useEffect(() => {
        if (!propertyId) {
            setProperty(null);
            setLoading(false);
            return;
        }

        const fetchProperty = async () => {
            setLoading(true);

            try {
                const data = await getProperty(propertyId);

                if (JSON.stringify(data) !== JSON.stringify(property)) {
                    setProperty(data);
                    setCache(localStorageName, data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (isCacheStale(localStorageName)) {
            fetchProperty();
        } else {
            const initialCounties = getCache(localStorageName) || [];
            setProperty(initialCounties);
            setLoading(false);
        }
    }, [propertyId]);

    return { property, loading };
};

export default usePropertyData;
