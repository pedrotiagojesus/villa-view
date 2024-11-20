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
    loading = false,
    loadingText = "",
}) => {
    if (loading) {
        return (
            <>
                <label className="form-label">{label}</label>
                <p>{loadingText}</p>
            </>
        );
    }

    return (
        <>
            <label className="form-label">{label}</label>
            <select
                className="form-select"
                value={value}
                required={required}
                onChange={(e) => {
                    handleChange(e);
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
