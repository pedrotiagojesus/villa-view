import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// CSS
import "./ModalSearchAdvance.css";

// Hooks
import { useSelectPropertyType } from "../../hooks/useSelectPropertyType";
import { useSelectPropertyGoal } from "../../hooks/useSelectPropertyGoal";
import { useSelectPropertyStatus } from "../../hooks/useSelectPropertyStatus";
import { useSelectDristrict } from "../../hooks/useSelectDistrict";
import { useSelectCounty } from "../../hooks/useSelectCounty";
import { useSelectParish } from "../../hooks/useSelectParish";
import useBuildQueryString from "../../hooks/utils/useBuildQueryString";

// Components
import ThemeSelectBox from "../ThemeSelectBox";

const ModalSearchAdvance = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    let urlPriceMin = Number(searchParams.get("price_min"));
    let urlPriceMax = Number(searchParams.get("price_max"));
    let urlDistrictId = Number(searchParams.get("district_id"));
    let urlCountyId = Number(searchParams.get("county_id"));
    let urlParishId = Number(searchParams.get("parish_id"));
    let urlPropertyTypeId = Number(searchParams.get("property_type_id"));
    let urlPropertyGoalId = Number(searchParams.get("property_goal_id"));
    let urlPropertyStatusId = Number(searchParams.get("property_status_id"));
    let urlRoom = Number(searchParams.get("room"));

    const [priceMin, setPriceMin] = useState(urlPriceMin);
    const [priceMax, setPriceMax] = useState(urlPriceMax);
    const [propertyTypeId, setPropertyTypeId] = useState(urlPropertyTypeId);
    const [room, setRoom] = useState(urlRoom);
    const [propertyGoalId, setPropertyGoalId] = useState(urlPropertyGoalId);
    const [propertyStatusId, setPropertyStatusId] =
        useState(urlPropertyStatusId);

    // District
    const [districtId, setDistrictId] = useState(urlDistrictId);
    const { optionArr: districtArr } = useSelectDristrict();
    const handleDistrict = (value) => {
        setDistrictId(value);

        // Reset county data
        setCountyId(0);

        // Reset parish data
        setParishId(0);
    };

    // County
    const [countyId, setCountyId] = useState(urlCountyId);
    const { optionArr: countyArr } = useSelectCounty(districtId);
    const handleCounty = (value) => {
        setCountyId(value);

        // Reset parish data
        setParishId(0);
    };

    // Parish
    const [parishId, setParishId] = useState(urlParishId);
    const { optionArr: parishArr } = useSelectParish(countyId);
    const handleParish = (value) => {
        setParishId(value);
    };

    const closeRef = useRef();

    const { optionArr: propertyTypeArr } = useSelectPropertyType();
    const { optionArr: propertyGoalArr } = useSelectPropertyGoal();
    const { optionArr: propertyStatusArr } = useSelectPropertyStatus();

    useEffect(() => {
        setPriceMin(urlPriceMin);
        setPriceMax(urlPriceMax);
        setDistrictId(urlDistrictId);
        setCountyId(urlCountyId);
        setParishId(urlParishId);
        setPropertyTypeId(urlPropertyTypeId);
        setRoom(urlRoom);
        setPropertyGoalId(urlPropertyGoalId);
        setPropertyStatusId(urlPropertyStatusId);
    }, [
        urlPriceMin,
        urlPriceMax,
        urlDistrictId,
        urlCountyId,
        urlParishId,
        urlPropertyTypeId,
        urlPropertyGoalId,
        urlPropertyStatusId,
        urlRoom,
    ]);

    // Submit search form
    const handleSearch = (e) => {
        e.preventDefault();

        let queryString = "";
        if (priceMax != 0) {
            queryString = useBuildQueryString(
                queryString,
                "price_min",
                priceMin
            );
            queryString = useBuildQueryString(
                queryString,
                "price_max",
                priceMax
            );
        }

        if (districtId != 0) {
            queryString = useBuildQueryString(
                queryString,
                "district_id",
                districtId
            );
        }

        if (countyId != 0) {
            queryString = useBuildQueryString(
                queryString,
                "county_id",
                countyId
            );
        }

        if (parishId != 0) {
            queryString = useBuildQueryString(
                queryString,
                "parish_id",
                parishId
            );
        }

        if (propertyTypeId != 0) {
            queryString = useBuildQueryString(
                queryString,
                "property_type_id",
                propertyTypeId
            );
        }

        if (room != 0) {
            queryString = useBuildQueryString(queryString, "room", room);
        }

        if (propertyGoalId != 0) {
            queryString = useBuildQueryString(
                queryString,
                "property_goal_id",
                propertyGoalId
            );
        }

        if (propertyStatusId != 0) {
            queryString = useBuildQueryString(
                queryString,
                "property_status_id",
                propertyStatusId
            );
        }

        navigate(`/villa-view/search${queryString}`);
        closeRef.current.click();
    };

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
                                    Preço Mínimo
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
                                <ThemeSelectBox
                                    label="Distrito"
                                    value={districtId}
                                    required={false}
                                    handleChange={(id) => {
                                        handleDistrict(Number(id));
                                    }}
                                    optionArr={districtArr}
                                />
                            </div>

                            <div className="col-md-6">
                                <ThemeSelectBox
                                    label="Concelho"
                                    value={countyId}
                                    required={true}
                                    handleChange={(id) => {
                                        handleCounty(Number(id));
                                    }}
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
                            </div>

                            <div className="col-md-6">
                                <ThemeSelectBox
                                    label="Freguesia"
                                    value={parishId}
                                    required={false}
                                    handleChange={(id) => {
                                        handleParish(Number(id));
                                    }}
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
                            </div>

                            <div className="col-md-6">
                                <ThemeSelectBox
                                    label="Tipo de imóvel"
                                    value={propertyTypeId}
                                    required={true}
                                    handleChange={(id) => {
                                        setPropertyTypeId(Number(id));
                                    }}
                                    optionArr={propertyTypeArr}
                                />
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
                                <ThemeSelectBox
                                    label="Objectivo"
                                    value={propertyGoalId}
                                    required={false}
                                    handleChange={(id) => {
                                        setPropertyGoalId(Number(id));
                                    }}
                                    optionArr={propertyGoalArr}
                                />
                            </div>

                            <div className="col-md-6">
                                <ThemeSelectBox
                                    label="Estado"
                                    value={propertyStatusId}
                                    required={false}
                                    handleChange={(id) => {
                                        setPropertyStatusId(Number(id));
                                    }}
                                    optionArr={propertyStatusArr}
                                />
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
