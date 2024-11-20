export const prepareParishesForSelect = (parishArr) => {
    const data = parishArr || [];

    return data.map((row) => ({
        value: row.parish_id,
        label: row.name,
    }));
};
