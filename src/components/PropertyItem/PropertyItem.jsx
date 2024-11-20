import { Link } from "react-router-dom";

// CSS
import "./PropertyItem.css";

// Image
import PropertyPrice from "../PropertyPrice";

const PropertyItem = ({ property }) => {
    return (
        <Link
            to={`/property/${property.id}`}
            className="card shadow property-item"
        >
            <div
                className="ratio ratio-16x9 image"
                style={{ backgroundImage: `url(${property.cover_image_url})` }}
            ></div>

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
