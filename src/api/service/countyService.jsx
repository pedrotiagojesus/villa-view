import client from "../client";
import API_ENDPOINTS from "../endpoint";

export const getCounties = async (districtId) => {
    const response = await client.get(API_ENDPOINTS.COUNTY, {
        params: {
            districtId,
        },
    });
    return response.data;
};
