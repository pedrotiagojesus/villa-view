import { Link } from "react-router-dom";

// CSS
import "./PropertyItem.css";

// Image
import PropertyPrice from "../PropertyPrice";

const PropertyItem = ({ property }) => {
    return (
        <Link
            to={`/villa-view/property/${property.id}`}
            className="card shadow property-item"
        >
            <img
                src={property.cover_image_url}
                className="card-img-top"
                alt={property.name}
            />
            <div className="card-body">
                <h5 className="card-title">{property.property_name}</h5>
            </div>
            <div className="card-footer d-flex">
                <div className="flex-fill">
                    <p className="card-text mb-0">
                        {property.county_name}, {property.district_name}
                    </p>
                    <p className="price mb-0">
                        <PropertyPrice property={property} />
                    </p>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
            </div>
        </Link>
    );
};

export default PropertyItem;
