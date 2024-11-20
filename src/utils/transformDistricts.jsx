export const prepareDistrictsForSelect = (districtArr) => {
    const data = districtArr || [];

    return data.map((row) => ({
        value: row.district_id,
        label: row.name,
    }));
};
