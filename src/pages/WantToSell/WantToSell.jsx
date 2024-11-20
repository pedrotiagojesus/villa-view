import { useEffect, useState } from "react";

// CSS
import "./WantToSell.css";

// Components
import Banner from "../../components/Banner/Banner";
import District from "../../components/Select/District";
import County from "../../components/Select/County";
import Parish from "../../components/Select/Parish";
import PropertyType from "../../components/Select/PropertyType";

// Sweetalert 2
import Swal from "sweetalert2";

// Datepicker
import DatePicker from "react-datepicker";
import PropertyGoal from "../../components/Select/PropertyGoal";
import PropertyStatus from "../../components/Select/PropertyStatus";

const WantToSell = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [constructionYear, setConstructionYear] = useState(0);
    const [room, setRoom] = useState(0);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

    // District
    const [districtId, setDistrictId] = useState(0);
    const [districtName, setDistrictName] = useState("");
    const handleDistrict = (e) => {
        setDistrictId(Number(e.target.value));

        const selectedOption = e.target.options[e.target.selectedIndex];
        setDistrictName(selectedOption.textContent);

        // Reset county data
        setCountyId(0);
        setCountyName("");

        // Reset parish data
        setParishId(0);
        setParishName("");
    };

    // County
    const [countyId, setCountyId] = useState(0);
    const [countyName, setCountyName] = useState("");
    const handleCounty = (e) => {
        setCountyId(Number(e.target.value));

        const selectedOption = e.target.options[e.target.selectedIndex];
        setCountyName(selectedOption.textContent);

        // Reset parish data
        setParishId(0);
        setParishName("");
    };

    // Parish
    const [parishId, setParishId] = useState(0);
    const [parishName, setParishName] = useState("");
    const handleParish = (e) => {
        setParishId(Number(e.target.value));

        const selectedOption = e.target.options[e.target.selectedIndex];
        setParishName(selectedOption.textContent);
    };

    // Property type
    const [propertyTypeId, setPropertyTypeId] = useState(0);
    const [propertyTypeName, setPropertyTypeName] = useState("");
    const handlePropertyType = (e) => {
        setPropertyTypeId(Number(e.target.value));

        const selectedOption = e.target.options[e.target.selectedIndex];
        setPropertyTypeName(selectedOption.textContent);
    };

    // Property goal
    const [propertyGoalId, setPropertyGoalId] = useState(0);
    const [propertyGoalName, setPropertyGoalName] = useState("");
    const handlePropertyGoal = (e) => {
        setPropertyGoalId(Number(e.target.value));

        const selectedOption = e.target.options[e.target.selectedIndex];
        setPropertyTypeName(selectedOption.textContent);
    };

    // Property status
    const [propertyStatusId, setPropertyStatusId] = useState(0);
    const [propertyStatusName, setPropertyStatusName] = useState("");
    const handlePropertyStatus = (e) => {
        setPropertyStatusId(Number(e.target.value));

        const selectedOption = e.target.options[e.target.selectedIndex];
        setPropertyStatusName(selectedOption.textContent);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Enviado!",
            text: "Email enviado com sucesso!",
            icon: "success",
            confirmButtonText: "Ok",
        }).then((result) => {
            if (result.isConfirmed) {
                setName("");
                setEmail("");
                setContact("");
                setPropertyTypeId(0);
                setPropertyTypeName("");
                setPropertyGoalId(0);
                setPropertyGoalName("");
                setPropertyStatusId(0);
                setPropertyStatusName("");
                setRoom(0);
                setPrice(0);
                setDistrictId(0);
                setDistrictName("");
                setCountyId(0);
                setCountyName("");
                setParishId(0);
                setParishName("");
                setDescription("");
                setConstructionYear("");
                setDescription("");
            }
        });
    };

    return (
        <>
            <Banner title="SOMOS O MELHOR PARCEIRO NA VENDA DO SEU IMÓVEL" />
            <section id="form-want-to-sell">
                <form
                    id="form-property"
                    className="container"
                    onSubmit={handleSubmit}
                >
                    <div className="block-wrap">
                        <h3 className="block-header">Dados Pessoais</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <label className="form-label">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={name}
                                    onInput={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    required
                                    value={email}
                                    onInput={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Contacto</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    required
                                    value={contact}
                                    onInput={(e) => setContact(e.target.value)}
                                />
                            </div>
                        </div>
                        <h3 className="block-header">Dados do Imóvel</h3>
                        <div className="row">
                            <div className="col-md-6 col-lg-4">
                                <PropertyType
                                    value={propertyTypeId}
                                    required={true}
                                    handleChange={(e) => handlePropertyType(e)}
                                />
                                <input
                                    type="hidden"
                                    name="property_type_name"
                                    value={propertyTypeName}
                                />
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <label className="form-label">
                                    Ano de construção
                                </label>

                                <DatePicker
                                    className="form-control"
                                    selected={constructionYear}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    onChange={(year) =>
                                        setConstructionYear(Number(year))
                                    }
                                />
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <PropertyGoal
                                    value={propertyGoalId}
                                    required={true}
                                    handleChange={(e) => handlePropertyGoal(e)}
                                />
                                <input
                                    type="hidden"
                                    name="property_goal_name"
                                    value={propertyGoalName}
                                />
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <PropertyStatus
                                    value={propertyStatusId}
                                    required={true}
                                    handleChange={(e) =>
                                        handlePropertyStatus(e)
                                    }
                                />
                                <input
                                    type="hidden"
                                    name="property_status_name"
                                    value={propertyStatusName}
                                />
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <label className="form-label">
                                    Nº de Quartos
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={room}
                                    min="0"
                                    step="1"
                                    onInput={(e) =>
                                        setRoom(Number(e.target.value))
                                    }
                                />
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <label className="form-label">Preço</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    required
                                    value={price}
                                    onInput={(e) =>
                                        setPrice(Number(e.target.value))
                                    }
                                />
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <District
                                    label="Distrito"
                                    value={districtId}
                                    required={true}
                                    handleChange={(e) => handleDistrict(e)}
                                    keyPrefix="district"
                                />
                                <input
                                    type="hidden"
                                    name="district_name"
                                    value={districtName}
                                />
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <County
                                    value={countyId}
                                    required={true}
                                    handleChange={(e) => handleCounty(e)}
                                    districtId={districtId}
                                />
                                <input
                                    type="hidden"
                                    name="county_name"
                                    value={countyName}
                                />
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <Parish
                                    label="Freguesia"
                                    value={parishId}
                                    required={false}
                                    handleChange={(e) => handleParish(e)}
                                    keyPrefix="parish"
                                    countyId={countyId}
                                />
                                <input
                                    type="hidden"
                                    name="parish_name"
                                    value={parishName}
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Descrição</label>
                                <textarea
                                    className="form-control"
                                    rows="10"
                                    value={description}
                                    onInput={(e) =>
                                        setDescription(e.target.value)
                                    }
                                ></textarea>
                            </div>
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn btn-primary">
                                Enviar email
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default WantToSell;
