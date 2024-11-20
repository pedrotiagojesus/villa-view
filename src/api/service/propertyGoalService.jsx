import client from "../client";
import API_ENDPOINTS from "../endpoint";

export const getPropertyGoals = async () => {
    const response = await client.get(API_ENDPOINTS.PROPERTY_GOAL);
    return response.data;
};
