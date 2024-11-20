import client from "../client";
import API_ENDPOINTS from "../endpoint";

export const getPropertyStatus = async () => {
    const response = await client.get(API_ENDPOINTS.PROPERTY_STATUS);
    return response.data;
};
