// Hooks
import useDistrictData from "../../hooks/useDistrictData";

// Components
import ThemeSelectBox from "./ThemeSelectBox";

// Utils
import { prepareDistrictsForSelect } from "../../utils/transformDistricts";

const District = ({
    label = "Distrito",
    value,
    required = true,
    handleChange,
    keyPrefix = "district",
}) => {
    // Fetch data
    const { districtArr, loading } = useDistrictData();

    // Transform data
    const optionArr = prepareDistrictsForSelect(districtArr);

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
            loadingText="Carregando distritos..."
        />
    );
};
export default District;
