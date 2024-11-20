export const transformPropertyGoals = (propertyGoalArr) => {
    const data = propertyGoalArr || [];

    return data.map((row) => ({
        value: row.property_goal_id,
        label: row.name,
    }));
};
