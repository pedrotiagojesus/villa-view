import { useSearchParams } from "react-router-dom";

// CSS
import "./Search.css";

// Components
import Banner from "../../components/Banner/Banner";
import PropertyItem from "../../components/PropertyItem/PropertyItem";
import Loader from "../../components/Loader/Loader";

import { useFetchAllPropertySearch } from "../../hooks/firebase/useFetchAllPropertySearch";

const Search = () => {
    const [searchParams] = useSearchParams();

    let priceMin = searchParams.get("price_min");

    if (priceMin != null) {
        priceMin = Number(priceMin);
    }

    let priceMax = searchParams.get("price_max");

    if (priceMax != null) {
        priceMax = Number(priceMax);
    }

    let districtId = searchParams.get("district_id");

    if (districtId != null) {
        districtId = Number(districtId);
    }

    let countyId = searchParams.get("county_id");

    if (countyId != null) {
        countyId = Number(countyId);
    }

    let parishId = searchParams.get("parish_id");

    if (parishId != null) {
        parishId = Number(parishId);
    }

    let propertyTypeId = searchParams.get("property_type_id");

    if (propertyTypeId != null) {
        propertyTypeId = Number(propertyTypeId);
    }

    let propertyGoalId = searchParams.get("property_goal_id");

    if (propertyGoalId != null) {
        propertyGoalId = Number(propertyGoalId);
    }

    let propertyStatusId = searchParams.get("property_status_id");

    if (propertyStatusId != null) {
        propertyStatusId = Number(propertyStatusId);
    }

    let room = searchParams.get("room");

    if (room != null) {
        room = Number(room);
    }

    const { propertyArr, loading } = useFetchAllPropertySearch(
        priceMin,
        priceMax,
        districtId,
        countyId,
        parishId,
        propertyTypeId,
        propertyGoalId,
        propertyStatusId,
        room
    );

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Banner title="Pesquisa" />

            <section id="section-list-property">
                <div className="container">
                    <div className="row">
                        {propertyArr &&
                            propertyArr.length > 0 &&
                            propertyArr.map((property) => (
                                <div
                                    className="col-md-6 col-lg-4"
                                    key={property.id}
                                >
                                    <PropertyItem property={property} />
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Search;
