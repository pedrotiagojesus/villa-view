export const transformPropertyTypes = (propertyTypeArr) => {
    const data = propertyTypeArr || [];

    return data.map((row) => ({
        value: row.property_type_id,
        label: row.name,
    }));
};
