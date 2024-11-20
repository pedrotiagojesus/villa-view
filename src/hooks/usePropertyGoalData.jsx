import { useState, useEffect } from "react";

// API
import { getPropertyGoals } from "../api/service/propertyGoalService";

// Utils
import { getCache, isCacheStale, setCache } from "../utils/cache";

const usePropertyGoalData = () => {
    const localStorageName = "property-goal";

    const initialPropertyGoals = getCache(localStorageName) || [];
    const [propertyGoalArr, setPropertyGoalArr] =
        useState(initialPropertyGoals);
    const [loading, setLoading] = useState(!initialPropertyGoals.length);

    useEffect(() => {
        const fetchPropertyGoals = async () => {
            setLoading(true);
            try {
                const data = await getPropertyGoals();
                if (JSON.stringify(data) !== JSON.stringify(propertyGoalArr)) {
                    setPropertyGoalArr(data);
                    setCache(localStorageName, data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (isCacheStale(localStorageName)) {
            fetchPropertyGoals();
        } else {
            setLoading(false);
        }
    }, []);

    return { propertyGoalArr, loading };
};

export default usePropertyGoalData;
