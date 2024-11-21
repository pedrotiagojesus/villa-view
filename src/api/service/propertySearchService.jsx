import client from "../client";
import API_ENDPOINTS from "../endpoint";

export const getPropertySearch = async (
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
    const response = await client.get(API_ENDPOINTS.PROPERTY_SEARCH, {
        params: {
            priceMin,
            priceMax,
            districtId,
            countyId,
            parishId,
            propertyTypeId,
            propertyGoalId,
            propertyStatusId,
            room,
        },
    });
    return response.data;
};
