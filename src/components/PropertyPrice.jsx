const PropertyPrice = ({ property }) => {
    return property.price.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
    });
};

export default PropertyPrice;
