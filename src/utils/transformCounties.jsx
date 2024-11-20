export const prepareCountiesForSelect = (countyArr) => {
    const data = countyArr || [];

    return data.map((row) => ({
        value: row.county_id,
        label: row.name,
    }));
};
