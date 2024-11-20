// Hooks
import usePropertyStatusData from "../../hooks/usePropertyStatusData";

// Components
import ThemeSelectBox from "./ThemeSelectBox";

// Utils
import { transformPropertyStatus } from "../../utils/transformPropertyStatus";

const PropertyStatus = ({
    label = "Estado",
    value,
    required = true,
    handleChange,
    keyPrefix = "property-status",
}) => {
    // Fetch data
    const { propertyStatusArr, loading } = usePropertyStatusData();

    // Transform data
    const optionArr = transformPropertyStatus(propertyStatusArr);

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
            loadingText="Carregando estados..."
        />
    );
};

export default PropertyStatus;
