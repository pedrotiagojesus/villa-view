import { useState, useEffect } from "react";

// API
import { getPropertyTypes } from "../api/service/propertyTypeService";

// Utils
import { getCache, isCacheStale, setCache } from "../utils/cache";

const usePropertyTypeData = () => {
    const localStorageName = "property-type";

    const initialPropertyTypes = getCache(localStorageName) || [];
    const [propertyTypeArr, setPropertyTypeArr] =
        useState(initialPropertyTypes);
    const [loading, setLoading] = useState(!initialPropertyTypes.length);

    useEffect(() => {
        const fetchPropertyTypes = async () => {
            setLoading(true);
            try {
                const data = await getPropertyTypes();
                if (JSON.stringify(data) !== JSON.stringify(propertyTypeArr)) {
                    setPropertyTypeArr(data);
                    setCache(localStorageName, data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (isCacheStale(localStorageName)) {
            fetchPropertyTypes();
        } else {
            setLoading(false);
        }
    }, []);

    return { propertyTypeArr, loading };
};

export default usePropertyTypeData;
