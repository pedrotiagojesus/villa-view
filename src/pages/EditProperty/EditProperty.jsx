import { useParams } from "react-router-dom";

// CSS
import "./EditProperty.css";

// Components
import Banner from "../../components/Banner/Banner";
import BackofficeNavigation from "../../components/BackofficeNavigation/BackofficeNavigation";
import FormProperty from "../../components/FormProperty/FormProperty";
import Loader from "../../components/Loader/Loader";

// Hooks
import { useFetchProperty } from "../../hooks/useFetchProperty";

const EditProperty = () => {
    const { property_id } = useParams();

    const { response: propertyResponse } = useFetchProperty(property_id);

    if (propertyResponse.loading || propertyResponse.loading === null) {
        return <Loader />;
    }

    const property = propertyResponse.data;

    return (
        <>
            <Banner title="Editar imóvel" />
            <section id="section-backoffice-dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <BackofficeNavigation />
                        </div>
                        <div className="col-md-9">
                            <FormProperty property={property} action="edit" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EditProperty;
