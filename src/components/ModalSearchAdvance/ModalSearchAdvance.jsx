import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

// CSS
import "./ModalSearchAdvance.css";

// Hooks
import { useFetchAllPropertyType } from "../../hooks/useFetchAllPropertyType";
import { useFetchAllDistrict } from "../../hooks/useFetchAllDistrict";
import { useFetchAllCounty } from "../../hooks/useFetchAllCounty";
import { useFetchAllParish } from "../../hooks/useFetchAllParish";
import { useFetchAllPropertyGoal } from "../../hooks/useFetchAllPropertyGoal";
import { useFetchAllPropertyStatus } from "../../hooks/useFetchAllPropertyStatus";

const ModalSearchAdvance = () => {
    const navigate = useNavigate();

    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(0);
    const [districtId, setDistrictId] = useState(0);
    const [countyId, setCountyId] = useState(0);
    const [parishId, setParishId] = useState(0);
    const [typeId, setTypeId] = useState(0);
    const [room, setRoom] = useState(0);
    const [goalId, setGoalId] = useState(0);
    const [stateId, setStateId] = useState(0);

    const closeRef = useRef();

    // Submit search form
    const handleSearch = (e) => {
        e.preventDefault();

        // console.log(priceMin);
        // console.log(priceMax);
        // console.log(districtId);
        //console.log(countyId);
        // console.log(typeId);
        // console.log(roomId);
        // console.log(goalId);
        // console.log(stateId);

        navigate("/villa-view/search");
        closeRef.current.click();
    };

    const { districtArr } = useFetchAllDistrict();
    const { countyArr } = useFetchAllCounty(districtId);
    const { parishArr } = useFetchAllParish(countyId);

    const { propertyTypeArr } = useFetchAllPropertyType();
    const { propertyGoalArr } = useFetchAllPropertyGoal();
    const { propertyStatusArr } = useFetchAllPropertyStatus();

    return (
        <div className="modal fade" id="modal-search-advance" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <form
                    className="modal-content"
                    onSubmit={(e) => handleSearch(e)}
                >
                    <div className="modal-header">
                        <h1 className="modal-title">Pesquisa</h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-6">
                                <label className="form-label">
                                    Preço Minimo
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={priceMin}
                                    min="0"
                                    onInput={(e) => setPriceMin(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">
                                    Preço Maximo
                                </label>
                                <input
                                    type="number"
                                    className="form-control m-0"
                                    value={priceMax}
                                    min={priceMin}
                                    onInput={(e) => setPriceMax(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Distrito</label>
                                <select
                                    className="form-select"
                                    value={districtId}
                                    onChange={(e) =>
                                        setDistrictId(Number(e.target.value))
                                    }
                                >
                                    <option value="0" disabled></option>
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
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Concelho</label>
                                <select
                                    className="form-select"
                                    value={countyId}
                                    onChange={(e) =>
                                        setCountyId(Number(e.target.value))
                                    }
                                    title={
                                        districtId != 0
                                            ? ""
                                            : "Selecione um distrito primeiro"
                                    }
                                    disabled={districtId != 0 ? "" : "disabled"}
                                >
                                    <option value="0" disabled>
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
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Freguesia</label>
                                <select
                                    className="form-select"
                                    value={parishId}
                                    onChange={(e) =>
                                        setParishId(Number(e.target.value))
                                    }
                                    title={
                                        countyId != 0
                                            ? ""
                                            : "Selecione um concelho primeiro"
                                    }
                                    disabled={countyId != 0 ? "" : "disabled"}
                                >
                                    <option value="0" disabled>
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
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Tipo</label>
                                <select
                                    className="form-select"
                                    value={typeId}
                                    onChange={(e) =>
                                        setTypeId(Number(e.target.value))
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
                            </div>

                            <div className="col-md-6">
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

                            <div className="col-md-6">
                                <label className="form-label">Objectivo</label>
                                <select
                                    className="form-select"
                                    value={goalId}
                                    onChange={(e) => setGoalId(e.target.value)}
                                >
                                    <option value="0">Objectivo...</option>
                                    <option value="1">Comprar</option>
                                    <option value="2">Arrendar</option>
                                    <option value="3">Trespasse</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Estado</label>
                                <select
                                    className="form-select"
                                    value={stateId}
                                    onChange={(e) => setStateId(e.target.value)}
                                >
                                    <option value="0">Estado...</option>
                                    <option value="1">Novo</option>
                                    <option value="2">Usado</option>
                                    <option value="3">Em Construção</option>
                                    <option value="4">Para Remodelar</option>
                                    <option value="5">Remodelado</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            ref={closeRef}
                        >
                            Fechar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Pesquisar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalSearchAdvance;
