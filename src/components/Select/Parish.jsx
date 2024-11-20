// Hooks
import useParishData from "../../hooks/useParishData";

// Components
import ThemeSelectBox from "./ThemeSelectBox";

// Utils
import { prepareParishesForSelect } from "../../utils/transformParishes";

const Parish = ({
    label = "Freguesia",
    value,
    required = true,
    handleChange,
    keyPrefix = "parish",
    countyId,
}) => {
    // Fetch data
    const { parishArr, loading } = useParishData(Number(countyId));

    // Transform data
    const optionArr = prepareParishesForSelect(parishArr);

    return (
        <>
            <ThemeSelectBox
                label={label}
                value={value}
                required={required}
                handleChange={(e) => {
                    handleChange(e);
                }}
                optionArr={optionArr}
                keyPrefix={keyPrefix}
                title={countyId != 0 ? "" : "Selecione um concelho primeiro"}
                disabled={countyId === 0}
                defaultOptionLabel={
                    countyId != 0 ? "" : "Selecione um concelho primeiro"
                }
                loading={loading}
                loadingText="Carregando freguesias..."
            />
        </>
    );
};

export default Parish;
