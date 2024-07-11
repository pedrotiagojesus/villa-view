import { useState } from "react";

// CSS
import "./WantToSell.css";

// Components
import Banner from "../../components/Banner/Banner";
import ThemeSelectBox from "../../components/ThemeSelectBox";

// Hooks
import { useSelectPropertyType } from "../../hooks/useSelectPropertyType";
import { useSelectPropertyGoal } from "../../hooks/useSelectPropertyGoal";
import { useSelectPropertyStatus } from "../../hooks/useSelectPropertyStatus";
import { useSelectDristrict } from "../../hooks/useSelectDistrict";
import { useSelectCounty } from "../../hooks/useSelectCounty";
import { useSelectParish } from "../../hooks/useSelectParish";

// Sweetalert 2
import Swal from "sweetalert2";

// Datepicker
import DatePicker from "react-datepicker";

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
    const { optionArr: districtArr } = useSelectDristrict();
    const handleDistrict = (value) => {
        setDistrictId(value);

        // Reset county data
        setCountyId(0);
        setCountyName("");

        // Reset parish data
        setParishId(0);
        setParishName("");

        if (value === 0) {
            setDistrictName("");
        } else {
            const district = districtArr.find(
                (district) => district.value === value
            );

            if (district) {
                setDistrictName(district.label);
            }
        }
    };

    // County
    const [countyId, setCountyId] = useState(0);
    const [countyName, setCountyName] = useState("");
    const { optionArr: countyArr } = useSelectCounty(districtId);
    const handleCounty = (value) => {
        setCountyId(value);

        // Reset parish data
        setParishId(0);
        setParishName("");

        if (value === 0) {
            setCountyName("");
        } else {
            const county = countyArr.find((county) => county.value === value);

            if (county) {
                setCountyName(county.label);
            }
        }
    };

    // Parish
    const [parishId, setParishId] = useState(0);
    const [parishName, setParishName] = useState("");
    const { optionArr: parishArr } = useSelectParish(countyId);
    const handleParish = (value) => {
        setParishId(value);

        if (value === 0) {
            setParishName("");
        } else {
            const parish = parishArr.find((parish) => parish.value === value);

            if (parish) {
                setParishName(parish.label);
            }
        }
    };

    // Property type
    const [propertyTypeId, setPropertyTypeId] = useState(0);
    const [propertyTypeName, setPropertyTypeName] = useState("");
    const { optionArr: propertyTypeArr } = useSelectPropertyType();
    const handlePropertyType = (value) => {
        setPropertyTypeId(value);

        if (propertyTypeId === 0) {
            setPropertyTypeName("");
        } else {
            const propertyType = propertyTypeArr.find(
                (propertyType) => propertyType.value === value
            );

            if (propertyType) {
                setPropertyTypeName(propertyType.label);
            }
        }
    };

    // Property goal
    const [propertyGoalId, setPropertyGoalId] = useState(0);
    const [propertyGoalName, setPropertyGoalName] = useState("");
    const { optionArr: propertyGoalArr } = useSelectPropertyGoal();
    const handlePropertyGoal = (value) => {
        setPropertyGoalId(value);

        if (value === 0) {
            setPropertyGoalName("");
        } else {
            const propertyGoal = propertyGoalArr.find(
                (propertyGoal) => propertyGoal.value === value
            );

            if (propertyGoal) {
                setPropertyGoalName(propertyGoal.label);
            }
        }
    };

    // Property status
    const [propertyStatusId, setPropertyStatusId] = useState(0);
    const [propertyStatusName, setPropertyStatusName] = useState("");
    const { optionArr: propertyStatusArr } = useSelectPropertyStatus();
    const handlePropertyStatus = (value) => {
        setPropertyStatusId(value);

        if (value === 0) {
            setPropertyStatusName("");
        } else {
            const propertyStatus = propertyStatusArr.find(
                (propertyStatus) => propertyStatus.value === value
            );

            if (propertyStatus) {
                setPropertyStatusName(propertyStatus.label);
            }
        }
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
                                <ThemeSelectBox
                                    label="Tipo de imóvel"
                                    value={propertyTypeId}
                                    required={true}
                                    handleChange={(value) =>
                                        handlePropertyType(Number(value))
                                    }
                                    optionArr={propertyTypeArr}
                                    keyPrefix="property-type"
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
                                <ThemeSelectBox
                                    label="Objetivo"
                                    value={propertyGoalId}
                                    required={true}
                                    handleChange={handlePropertyGoal}
                                    optionArr={propertyGoalArr}
                                    keyPrefix="property-goal"
                                />
                                <input
                                    type="hidden"
                                    name="property_goal_name"
                                    value={propertyGoalName}
                                />
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <ThemeSelectBox
                                    label="Estado"
                                    value={propertyStatusId}
                                    required={true}
                                    handleChange={(value) =>
                                        handlePropertyStatus(Number(value))
                                    }
                                    optionArr={propertyStatusArr}
                                    keyPrefix="property-status"
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
                                <ThemeSelectBox
                                    label="Distrito"
                                    value={districtId}
                                    required={true}
                                    handleChange={(value) =>
                                        handleDistrict(Number(value))
                                    }
                                    optionArr={districtArr}
                                    keyPrefix="district"
                                />
                                <input
                                    type="hidden"
                                    name="district_name"
                                    value={districtName}
                                />
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <ThemeSelectBox
                                    label="Concelho"
                                    value={countyId}
                                    required={true}
                                    handleChange={(value) =>
                                        handleCounty(Number(value))
                                    }
                                    optionArr={countyArr}
                                    keyPrefix="county"
                                    title={
                                        districtId != 0
                                            ? ""
                                            : "Selecione um distrito primeiro"
                                    }
                                    disabled={districtId === 0}
                                    defaultOptionLabel={
                                        districtId != 0
                                            ? ""
                                            : "Selecione um distrito primeiro"
                                    }
                                />
                                <input
                                    type="hidden"
                                    name="county_name"
                                    value={countyName}
                                />
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <ThemeSelectBox
                                    label="Freguesia"
                                    value={parishId}
                                    required={false}
                                    handleChange={(value) =>
                                        handleParish(Number(value))
                                    }
                                    optionArr={parishArr}
                                    keyPrefix="county"
                                    title={
                                        countyId != 0
                                            ? ""
                                            : "Selecione um concelho primeiro"
                                    }
                                    disabled={countyId === 0}
                                    defaultOptionLabel={
                                        countyId != 0
                                            ? ""
                                            : "Selecione um concelho primeiro"
                                    }
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
