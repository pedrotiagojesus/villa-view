import client from "../client";
import API_ENDPOINTS from "../endpoint";

export const getPropertyHighlights = async () => {
    const response = await client.get(API_ENDPOINTS.PROPERTY_HIGHLIGHT);
    return response.data;
};
