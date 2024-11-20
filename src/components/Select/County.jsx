// Hooks
import useCountyData from "../../hooks/useCountyData";

// Components
import ThemeSelectBox from "./ThemeSelectBox";

import { prepareCountiesForSelect } from "../../utils/transformCounties";

const County = ({
    label = "Concelho",
    value,
    required = true,
    handleChange,
    keyPrefix = "county",
    districtId,
}) => {
    // Fetch data
    const { countyArr, loading } = useCountyData(Number(districtId));

    // Transform data
    const optionArr = prepareCountiesForSelect(countyArr);

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
            title={districtId != 0 ? "" : "Selecione um distrito primeiro"}
            disabled={districtId === 0}
            defaultOptionLabel={
                districtId != 0 ? "" : "Selecione um distrito primeiro"
            }
            loading={loading}
            loadingText="Carregando concelhos..."
        />
    );
};

export default County;
