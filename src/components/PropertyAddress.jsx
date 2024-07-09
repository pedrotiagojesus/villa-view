const PropertyAddress = ({ property }) => {
    if (!property) {
        return;
    }

    let address = "";

    // District
    if (property.district_name != "") {
        address = property.district_name;
    }

    // County
    if (property.county_name != "") {
        if (address != "") {
            address = `${address}, `;
        }
        address = address + property.county_name;
    }

    // Parish
    if (property.parish_name != "") {
        if (address != "") {
            address = `${address}, `;
        }
        address = address + property.parish_name;
    }
    return <>{address}</>;
};

export default PropertyAddress;
