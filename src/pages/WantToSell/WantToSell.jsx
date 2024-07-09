import { useState } from "react";

// CSS
import "./WantToSell.css";

// Components
import Banner from "../../components/Banner/Banner";

// Hooks
import { useFetchAllPropertyType } from "../../hooks/useFetchAllPropertyType";
import { useFetchAllDistrict } from "../../hooks/useFetchAllDistrict";
import { useFetchAllCounty } from "../../hooks/useFetchAllCounty";
import { useFetchAllParish } from "../../hooks/useFetchAllParish";
import { useFetchAllPropertyGoal } from "../../hooks/useFetchAllPropertyGoal";
import { useFetchAllPropertyStatus } from "../../hooks/useFetchAllPropertyStatus";

// Sweetalert 2
import Swal from "sweetalert2";

// Datepicker
import DatePicker from "react-datepicker";

const WantToSell = () => {
    const [name, setName] = useState("Teste");
    const [email, setEmail] = useState("teste@teste.com");
    const [contact, setContact] = useState("teste");
    const [constructionYear, setConstructionYear] = useState(0);
    const [room, setRoom] = useState(0);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

    // District
    const [districtId, setDistrictId] = useState(0);
    const [districtName, setDistrictName] = useState("");
    const { districtArr } = useFetchAllDistrict();
    const handleDistrict = (id) => {
        setDistrictId(id);

        if (id === 0) {
            setDistrictName("");
        } else {
            const district = districtArr.find(
                (district) => district.district_id === id
            );

            if (district) {
                setDistrictName(district.name);
            }
        }
    };

    // County
    const [countyId, setCountyId] = useState(0);
    const [countyName, setCountyName] = useState("");
    const { countyArr } = useFetchAllCounty(districtId);
    const handleCounty = (id) => {
        setCountyId(id);

        if (id === 0) {
            setCountyName("");
        } else {
            const county = countyArr.find((county) => county.county_id === id);

            if (county) {
                setCountyName(county.name);
            }
        }
    };

    // Parish
    const [parishId, setParishId] = useState(0);
    const [parishName, setParishName] = useState("");
    const { parishArr } = useFetchAllParish(countyId);
    const handleParish = (id) => {
        setParishId(id);

        if (id === 0) {
            setParishName("");
        } else {
            const parish = parishArr.find((parish) => parish.parish_id === id);

            if (parish) {
                setParishName(parish.name);
            }
        }
    };

    // Property type
    const [propertyTypeId, setPropertyTypeId] = useState(0);
    const [propertyTypeName, setPropertyTypeName] = useState("");
    const { propertyTypeArr } = useFetchAllPropertyType();
    const handlePropertyType = (id) => {
        setPropertyTypeId(id);

        if (id === 0) {
            setPropertyTypeName("");
        } else {
            const propertyType = propertyTypeArr.find(
                (propertyType) => propertyType.property_type_id === id
            );

            if (propertyType) {
                setPropertyTypeName(propertyType.name);
            }
        }
    };

    // Property goal
    const [propertyGoalId, setPropertyGoalId] = useState(0);
    const [propertyGoalName, setPropertyGoalName] = useState("");
    const { propertyGoalArr } = useFetchAllPropertyGoal();
    const handlePropertyGoal = (id) => {
        setPropertyGoalId(id);

        if (id === 0) {
            setPropertyGoalName("");
        } else {
            const propertyGoal = propertyGoalArr.find(
                (propertyGoal) => propertyGoal.property_goal_id === id
            );

            if (propertyGoal) {
                setPropertyGoalName(propertyGoal.name);
            }
        }
    };

    // Property status
    const [propertyStatusId, setPropertyStatusId] = useState(0);
    const [propertyStatusName, setPropertyStatusName] = useState("");
    const { propertyStatusArr } = useFetchAllPropertyStatus();
    const handlePropertyStatus = (id) => {
        setPropertyStatusId(id);

        if (id === 0) {
            setPropertyStatusName("");
        } else {
            const propertyStatus = propertyStatusArr.find(
                (propertyStatus) => propertyStatus.property_status_id === id
            );

            if (propertyStatus) {
                setPropertyStatusName(propertyStatus.name);
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
                                <label className="form-label">
                                    Tipo de imóvel
                                </label>
                                <select
                                    className="form-select"
                                    required
                                    value={propertyTypeId}
                                    onChange={(e) =>
                                        handlePropertyType(
                                            Number(e.target.value)
                                        )
                                    }
                                >
                                    <option value=""></option>
                                    {propertyTypeArr &&
                                        propertyTypeArr.map((propertyType) => (
                                            <option
                                                key={
                                                    propertyType.property_type_id
                                                }
                                                value={
                                                    propertyType.property_type_id
                                                }
                                            >
                                                {propertyType.name}
                                            </option>
                                        ))}
                                </select>
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
                                <label className="form-label">Objetivo</label>
                                <select
                                    className="form-select"
                                    required
                                    value={propertyGoalId}
                                    onChange={(e) =>
                                        handlePropertyGoal(
                                            Number(e.target.value)
                                        )
                                    }
                                >
                                    <option value=""></option>
                                    {propertyGoalArr &&
                                        propertyGoalArr.map((propertyGoal) => (
                                            <option
                                                key={
                                                    propertyGoal.property_goal_id
                                                }
                                                value={
                                                    propertyGoal.property_goal_id
                                                }
                                            >
                                                {propertyGoal.name}
                                            </option>
                                        ))}
                                </select>
                                <input
                                    type="hidden"
                                    name="property_goal_name"
                                    value={propertyGoalName}
                                />
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <label className="form-label">Estado</label>
                                <select
                                    className="form-select"
                                    required
                                    value={propertyStatusId}
                                    onChange={(e) =>
                                        handlePropertyStatus(
                                            Number(e.target.value)
                                        )
                                    }
                                >
                                    <option value=""></option>
                                    {propertyStatusArr &&
                                        propertyStatusArr.map(
                                            (propertyStatus) => (
                                                <option
                                                    key={
                                                        propertyStatus.property_status_id
                                                    }
                                                    value={
                                                        propertyStatus.property_status_id
                                                    }
                                                >
                                                    {propertyStatus.name}
                                                </option>
                                            )
                                        )}
                                </select>
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
                                <label className="form-label">Distrito</label>
                                <select
                                    className="form-select"
                                    required
                                    value={districtId}
                                    onChange={(e) =>
                                        handleDistrict(Number(e.target.value))
                                    }
                                >
                                    <option value=""></option>
                                    {districtArr &&
                                        districtArr.map((district) => (
                                            <option
                                                key={district.district_id}
                                                value={district.district_id}
                                            >
                                                {district.name}
                                            </option>
                                        ))}
                                </select>
                                <input
                                    type="hidden"
                                    name="district_name"
                                    value={districtName}
                                />
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <label className="form-label">Concelho</label>
                                <select
                                    className="form-select"
                                    required
                                    value={countyId}
                                    onChange={(e) =>
                                        handleCounty(Number(e.target.value))
                                    }
                                    title={
                                        districtId != 0
                                            ? ""
                                            : "Selecione um distrito primeiro"
                                    }
                                    disabled={districtId != 0 ? "" : "disabled"}
                                >
                                    <option value="">
                                        {districtId != 0
                                            ? ""
                                            : "Selecione um distrito primeiro"}
                                    </option>

                                    {countyArr &&
                                        countyArr.map((county) => (
                                            <option
                                                key={county.county_id}
                                                value={county.county_id}
                                            >
                                                {county.name}
                                            </option>
                                        ))}
                                </select>
                                <input
                                    type="hidden"
                                    name="county_name"
                                    value={countyName}
                                />
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <label className="form-label">Freguesia</label>
                                <select
                                    className="form-select"
                                    value={parishId}
                                    onChange={(e) =>
                                        handleParish(Number(e.target.value))
                                    }
                                    title={
                                        countyId != 0
                                            ? ""
                                            : "Selecione um concelho primeiro"
                                    }
                                    disabled={countyId != 0 ? "" : "disabled"}
                                >
                                    <option value="">
                                        {countyId != 0
                                            ? ""
                                            : "Selecione um concelho primeiro"}
                                    </option>

                                    {parishArr &&
                                        parishArr.map((parish) => (
                                            <option
                                                key={parish.parish_id}
                                                value={parish.parish_id}
                                            >
                                                {parish.name}
                                            </option>
                                        ))}
                                </select>
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
