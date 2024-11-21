import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// CSS
import "./ModalSearchAdvance.css";

// Hooks
import buildQueryString from "../../utils/buildQueryString";

// Components
import District from "../Select/District";
import County from "../Select/County";
import Parish from "../Select/Parish";
import PropertyType from "../Select/PropertyType";
import PropertyGoal from "../Select/PropertyGoal";
import PropertyStatus from "../Select/PropertyStatus";

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
    const handleDistrict = (e) => {
        setDistrictId(Number(e.target.value));

        // Reset county data
        setCountyId(0);

        // Reset parish data
        setParishId(0);
    };

    // County
    const [countyId, setCountyId] = useState(urlCountyId);
    const handleCounty = (e) => {
        setCountyId(Number(e.target.value));

        // Reset parish data
        setParishId(0);
    };

    // Parish
    const [parishId, setParishId] = useState(urlParishId);
    const handleParish = (e) => {
        setParishId(Number(e.target.value));
    };

    const closeRef = useRef();

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
            queryString = buildQueryString(queryString, "price_min", priceMin);
            queryString = buildQueryString(queryString, "price_max", priceMax);
        }

        if (districtId != 0) {
            queryString = buildQueryString(
                queryString,
                "district_id",
                districtId
            );
        }

        if (countyId != 0) {
            queryString = buildQueryString(queryString, "county_id", countyId);
        }

        if (parishId != 0) {
            queryString = buildQueryString(queryString, "parish_id", parishId);
        }

        if (propertyTypeId != 0) {
            queryString = buildQueryString(
                queryString,
                "property_type_id",
                propertyTypeId
            );
        }

        if (room != 0) {
            queryString = buildQueryString(queryString, "room", room);
        }

        if (propertyGoalId != 0) {
            queryString = buildQueryString(
                queryString,
                "property_goal_id",
                propertyGoalId
            );
        }

        if (propertyStatusId != 0) {
            queryString = buildQueryString(
                queryString,
                "property_status_id",
                propertyStatusId
            );
        }

        navigate(`/search${queryString}`);
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
                                <District
                                    label="Distrito"
                                    value={districtId}
                                    required={false}
                                    handleChange={(e) => handleDistrict(e)}
                                />
                            </div>

                            <div className="col-md-6">
                                <County
                                    value={countyId}
                                    required={true}
                                    handleChange={(e) => handleCounty(e)}
                                    districtId={districtId}
                                />
                            </div>

                            <div className="col-md-6">
                                <Parish
                                    value={parishId}
                                    required={false}
                                    handleChange={(e) => handleParish(e)}
                                    countyId={countyId}
                                />
                            </div>

                            <div className="col-md-6">
                                <PropertyType
                                    value={propertyTypeId}
                                    required={false}
                                    handleChange={(e) => {
                                        setPropertyTypeId(
                                            Number(e.target.value)
                                        );
                                    }}
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
                                <PropertyGoal
                                    value={propertyGoalId}
                                    required={false}
                                    handleChange={(e) => {
                                        setPropertyGoalId(
                                            Number(e.target.value)
                                        );
                                    }}
                                />
                            </div>

                            <div className="col-md-6">
                                <PropertyStatus
                                    value={propertyStatusId}
                                    required={false}
                                    handleChange={(e) => {
                                        setPropertyStatusId(
                                            Number(e.target.value)
                                        );
                                    }}
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
