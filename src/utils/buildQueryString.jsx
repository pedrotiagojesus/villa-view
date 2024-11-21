const useBuildQueryString = (
    queryString = "",
    fieldName = "",
    fieldValue = ""
) => {
    if (queryString === "") {
        queryString = "?";
    } else {
        queryString = `${queryString}&`;
    }

    queryString = `${queryString}${fieldName}=${fieldValue}`;

    return queryString;
};

export default useBuildQueryString;
