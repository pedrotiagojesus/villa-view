import { useState, useEffect } from "react";

// API
import { getPropertySearch } from "../api/service/propertySearchService";

const usePropertySearchData = (
    priceMin,
    priceMax,
    districtId,
    countyId,
    parishId,
    propertyTypeId,
    propertyGoalId,
    propertyStatusId,
    room
) => {
    const [propertyArr, setPropertyArr] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            setLoading(true);

            try {
                const data = await getPropertySearch(
                    priceMin,
                    priceMax,
                    districtId,
                    countyId,
                    parishId,
                    propertyTypeId,
                    propertyGoalId,
                    propertyStatusId,
                    room
                );
                setPropertyArr(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [
        priceMin,
        priceMax,
        districtId,
        countyId,
        parishId,
        propertyTypeId,
        propertyGoalId,
        propertyStatusId,
        room,
    ]);

    return { propertyArr, loading };
};

export default usePropertySearchData;
