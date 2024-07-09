// CSS
import "./Search.css";

// Components
import Banner from "../../components/Banner/Banner";
import PropertyItem from "../../components/PropertyItem/PropertyItem";

import { useFetchAllPropertyNew } from "../../hooks/useFetchAllPropertyNew";

const Search = () => {
    const { propertyNewArr } = useFetchAllPropertyNew();

    return (
        <>
            <Banner title="Pesquisar" />

            <section id="section-list-property">
                <div className="container">
                    <div className="row">
                        {propertyNewArr &&
                            propertyNewArr.length > 0 &&
                            propertyNewArr.map((property) => (
                                <div className="col-md-6 col-lg-4">
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
