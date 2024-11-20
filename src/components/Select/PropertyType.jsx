// Hooks
import usePropertyTypeData from "../../hooks/usePropertyTypeData";

// Components
import ThemeSelectBox from "./ThemeSelectBox";

// Utils
import { transformPropertyTypes } from "../../utils/transformPropertyTypes";

const PropertyType = ({
    label = "Tipo de imóvel",
    value,
    required = true,
    handleChange,
    keyPrefix = "property-type",
}) => {
    // Fetch data
    const { propertyTypeArr, loading } = usePropertyTypeData();

    // Transform data
    const optionArr = transformPropertyTypes(propertyTypeArr);

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
            loadingText="Carregando tipos de imóveis..."
        />
    );
};

export default PropertyType;
