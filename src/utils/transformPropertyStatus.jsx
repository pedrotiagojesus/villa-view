export const transformPropertyStatus = (propertyStatusArr) => {
    const data = propertyStatusArr || [];

    return data.map((row) => ({
        value: row.property_status_id,
        label: row.name,
    }));
};
