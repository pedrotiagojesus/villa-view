import client from "../client";
import API_ENDPOINTS from "../endpoint";

export const getDistricts = async () => {
    const response = await client.get(API_ENDPOINTS.DISTRICT);
    return response.data;
};
