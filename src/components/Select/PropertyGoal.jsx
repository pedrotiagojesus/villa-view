// Hooks
import usePropertyGoalData from "../../hooks/usePropertyGoalData";

// Components
import ThemeSelectBox from "./ThemeSelectBox";

// Utils
import { transformPropertyGoals } from "../../utils/transformPropertyGoals";

const PropertyGoal = ({
    label = "Objetivo",
    value,
    required = true,
    handleChange,
    keyPrefix = "property-goal",
}) => {
    // Fetch data
    const { propertyGoalArr, loading } = usePropertyGoalData();

    // Transform data
    const optionArr = transformPropertyGoals(propertyGoalArr);

    return (
        <ThemeSelectBox
            label={label}
            value={value}
            required={required}
            handleChange={(e) => {
                handleChange(e);
            }}
            optionArr={optionArr}
            keyPrefix={keyPrefix}
            loading={loading}
            loadingText="Carregando objetivos..."
        />
    );
};

export default PropertyGoal;
