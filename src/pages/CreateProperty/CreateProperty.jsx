// CSS
import "./CreateProperty.css";

// Components
import Banner from "../../components/Banner/Banner";
import BackofficeNavigation from "../../components/BackofficeNavigation/BackofficeNavigation";
import FormProperty from "../../components/FormProperty/FormProperty";

const CreateProperty = () => {
    return (
        <>
            <Banner title="Criar imóvel" />
            <section id="section-backoffice-dashboard">
                <div className="container">
                    <div className="row main-row">
                        <div className="col-md-3">
                            <BackofficeNavigation />
                        </div>
                        <div className="col-md-9">
                            <FormProperty submitType="new" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CreateProperty;
