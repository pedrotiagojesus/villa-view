import client from "../client";
import API_ENDPOINTS from "../endpoint";

export const getParishes = async (countyId) => {
    const response = await client.get(API_ENDPOINTS.PARISH, {
        params: {
            countyId,
        },
    });
    return response.data;
};
