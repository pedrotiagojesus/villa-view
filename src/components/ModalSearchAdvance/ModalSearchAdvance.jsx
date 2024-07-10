import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// CSS
import "./ModalSearchAdvance.css";

// Hooks
import { useFetchAllPropertyType } from "../../hooks/useFetchAllPropertyType";
import { useFetchAllDistrict } from "../../hooks/useFetchAllDistrict";
import { useFetchAllCounty } from "../../hooks/useFetchAllCounty";
import { useFetchAllParish } from "../../hooks/useFetchAllParish";
import { useFetchAllPropertyGoal } from "../../hooks/useFetchAllPropertyGoal";
import { useFetchAllPropertyStatus } from "../../hooks/useFetchAllPropertyStatus";
import useBuildQueryString from "../../hooks/utils/useBuildQueryString";

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
    const [districtId, setDistrictId] = useState(urlDistrictId);
    const [countyId, setCountyId] = useState(urlCountyId);
    const [parishId, setParishId] = useState(urlParishId);
    const [propertyTypeId, setPropertyTypeId] = useState(urlPropertyTypeId);
    const [room, setRoom] = useState(urlRoom);
    const [propertyGoalId, setPropertyGoalId] = useState(urlPropertyGoalId);
    const [propertyStatusId, setPropertyStatusId] =
        useState(urlPropertyStatusId);

    const closeRef = useRef();

    const { districtArr } = useFetchAllDistrict();

    const { countyArr } = useFetchAllCounty(districtId);
    const { parishArr } = useFetchAllParish(countyId);

    const { propertyTypeArr } = useFetchAllPropertyType();
    const { propertyGoalArr } = useFetchAllPropertyGoal();
    const { propertyStatusArr } = useFetchAllPropertyStatus();

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
                                <label className="form-label">Distrito</label>
                                <select
                                    className="form-select"
                                    value={districtId}
                                    onChange={(e) =>
                                        setDistrictId(Number(e.target.value))
                                    }
                                >
                                    <option value="0"></option>
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
                                    <option value="0">
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
                                    <option value="0">
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
                                    value={propertyTypeId}
                                    onChange={(e) =>
                                        setPropertyTypeId(
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
                                    value={propertyGoalId}
                                    onChange={(e) =>
                                        setPropertyGoalId(e.target.value)
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
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Estado</label>
                                <select
                                    className="form-select"
                                    value={propertyStatusId}
                                    onChange={(e) =>
                                        setPropertyStatusId(e.target.value)
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
