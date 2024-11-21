import client from "../client";
import API_ENDPOINTS from "../endpoint";

export const getProperty = async (propertyId) => {
    const response = await client.get(
        `${API_ENDPOINTS.PROPERTY}/${propertyId}`
    );
    return response.data;
};
