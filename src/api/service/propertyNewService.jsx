import client from "../client";
import API_ENDPOINTS from "../endpoint";

export const getPropertyNews = async () => {
    const response = await client.get(API_ENDPOINTS.PROPERTY_NEW);
    return response.data;
};
