import client from "../client";
import API_ENDPOINTS from "../endpoint";

export const getPropertyTypes = async () => {
    const response = await client.get(API_ENDPOINTS.PROPERTY_TYPE);
    return response.data;
};
