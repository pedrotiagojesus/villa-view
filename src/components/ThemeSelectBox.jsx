const ThemeSelectBox = ({
    label = "",
    value,
    required = false,
    handleChange,
    optionArr = [],
    keyPrefix = "",
    title = "",
    disabled = false,
    defaultOptionLabel = "",
    defaultOptionValue = "",
}) => {
    return (
        <>
            <label className="form-label">{label}</label>
            <select
                className="form-select"
                value={value}
                required={required}
                onChange={(e) => {
                    handleChange(e.target.value);
                }}
                title={title}
                disabled={disabled}
            >
                <option value={defaultOptionValue}>{defaultOptionLabel}</option>
                {optionArr &&
                    optionArr.map((option) => (
                        <option
                            key={`${keyPrefix}-${option.value}`}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
            </select>
        </>
    );
};

export default ThemeSelectBox;
