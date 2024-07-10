import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Sweetalert 2
import Swal from "sweetalert2";

// Datepicker
import DatePicker from "react-datepicker";

// FilePond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

// CSS
import "./FormProperty.css";

// Hooks
import { useFetchAllPropertyType } from "../../hooks/useFetchAllPropertyType";
import { useFetchAllDistrict } from "../../hooks/useFetchAllDistrict";
import { useFetchAllCounty } from "../../hooks/useFetchAllCounty";
import { useFetchAllParish } from "../../hooks/useFetchAllParish";
import { useFetchAllPropertyGoal } from "../../hooks/useFetchAllPropertyGoal";
import { useFetchAllPropertyStatus } from "../../hooks/useFetchAllPropertyStatus";
import { useProperty } from "../../hooks/useProperty";
import { usePropertyOtherImage } from "../../hooks/usePropertyOtherImage";
import { usePropertyCoverImage } from "../../hooks/usePropertyCoverImage";

const FormProperty = ({ property, action = "add" }) => {
    const navigate = useNavigate();

    const [loadingUpload, setLoadingUpload] = useState(false);

    const [name, setName] = useState(property ? property.name : "");
    const [email, setEmail] = useState(property ? property.email : "");
    const [contact, setContact] = useState(property ? property.contact : "");
    const [reference, setReference] = useState(
        property ? property.reference : ""
    );
    const [propertyName, setPropertyName] = useState(
        property ? property.property_name : ""
    );
    const [propertyTypeId, setPropertyTypeId] = useState(
        property ? property.property_type_id : 0
    );
    const [propertyGoalId, setPropertyGoalId] = useState(
        property ? property.property_goal_id : 0
    );
    const [propertyStatusId, setPropertyStatusId] = useState(
        property ? property.property_status_id : 0
    );
    const [constructionYear, setConstructionYear] = useState(
        property ? property.construction_year : ""
    );

    const [room, setRoom] = useState(property ? property.room : 0);
    const [price, setPrice] = useState(property ? property.price : 0);
    const [districtId, setDistrictId] = useState(
        property ? property.district_id : 0
    );
    const [countyId, setCountyId] = useState(property ? property.county_id : 0);
    const [parishId, setParishId] = useState(property ? property.parish_id : 0);
    const [description, setDescription] = useState(
        property ? property.description : ""
    );
    const [isHighlight, setIsHighlight] = useState(
        property ? property.is_highlight : false
    );
    const [isVisible, setIsVisible] = useState(
        property ? property.is_visible : true
    );
    const [latitude, setLatitude] = useState(property ? property.latitude : 0);
    const [longitude, setLongitude] = useState(
        property ? property.longitude : 0
    );

    // Media
    const [coverImage, setCoverImage] = useState(
        property ? property.cover_image : null
    );
    const [coverImageUrl, setCoverImageUrl] = useState(
        property ? property.cover_image_url : null
    );
    const [fileCoverImage, setFileCoverImage] = useState(null);
    const [otherImage, setOtherImage] = useState(
        property ? property.other_image : 0
    );
    const [otherImageUrl, setOtherImageUrl] = useState(
        property ? property.other_image_url : null
    );
    const [fileOtherImage, setFileOtherImage] = useState(null);

    // Data form the select
    const { districtArr } = useFetchAllDistrict();
    const { countyArr } = useFetchAllCounty(districtId);
    const { parishArr } = useFetchAllParish(countyId);

    const { propertyTypeArr } = useFetchAllPropertyType();
    const { propertyGoalArr } = useFetchAllPropertyGoal();
    const { propertyStatusArr } = useFetchAllPropertyStatus();

    const {
        insertProperty,
        updateProperty,
        response: propertyResponse,
    } = useProperty();

    const { saveCoverImage } = usePropertyCoverImage();
    const {
        saveOtherImage,
        deleteFile: deleteOtherImage,
        saveData: saveOtherImageData,
    } = usePropertyOtherImage();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // District name
        let districtName = "";
        if (districtId != 0) {
            const district = districtArr.find(
                (district) => district.district_id === districtId
            );

            if (district) {
                districtName = district.name;
            }
        }

        // County name
        let countyName = "";
        if (countyId != 0) {
            const county = countyArr.find(
                (county) => county.county_id === countyId
            );

            if (county) {
                countyName = county.name;
            }
        }

        // Parish name
        let parishName = "";
        if (parishId != 0) {
            const parish = parishArr.find(
                (parish) => parish.parish_id === parishId
            );

            if (parish) {
                parishName = parish.name;
            }
        }

        // Property type name
        let propertyTypeName = "";
        if (propertyTypeId != 0) {
            const propertyType = propertyTypeArr.find(
                (propertyType) =>
                    propertyType.property_type_id === propertyTypeId
            );

            if (propertyType) {
                propertyTypeName = propertyType.name;
            }
        }

        // Property goal name
        let propertyGoalName = "";
        if (propertyGoalId != 0) {
            const propertyGoal = propertyGoalArr.find(
                (propertyGoal) =>
                    propertyGoal.property_goal_id === propertyGoalId
            );

            if (propertyGoal) {
                propertyGoalName = propertyGoal.name;
            }
        }

        // Property status name
        let propertyStatusName = "";
        if (propertyStatusId != 0) {
            const propertyStatus = propertyStatusArr.find(
                (propertyStatus) =>
                    propertyStatus.property_status_id === propertyStatusId
            );

            if (propertyStatus) {
                propertyStatusName = propertyStatus.name;
            }
        }

        const propertyData = {
            name,
            email,
            contact,
            reference,
            property_name: propertyName,
            property_type_id: propertyTypeId,
            property_type_name: propertyTypeName,
            property_goal_id: propertyGoalId,
            property_goal_name: propertyGoalName,
            property_status_id: propertyStatusId,
            property_status_name: propertyStatusName,
            construction_year: constructionYear,
            room,
            price,
            district_id: districtId,
            district_name: districtName,
            county_id: countyId,
            county_name: countyName,
            parish_id: parishId,
            parish_name: parishName,
            description,
            is_visible: isVisible,
            is_highlight: isHighlight,
            cover_image: coverImage,
            other_image: otherImage,
            latitude,
            longitude,
        };

        if (action === "add") {
            insertProperty(propertyData);
        } else {
            await updateProperty(property.id, propertyData);
        }
    };

    const handleClickDeleteOtherImage = (index) => {
        const removeFile = otherImage[index];
        const removeFilename = removeFile.split("/").at(-1);

        let newOtherImageData = otherImage.filter((item) => {
            return !item.includes(removeFilename);
        });

        if (newOtherImageData.length === 0) {
            newOtherImageData = null;
        }

        let newOtherImageUrl = otherImageUrl.filter((item) => {
            return !item.includes(removeFilename);
        });

        if (newOtherImageUrl.length === 0) {
            newOtherImageUrl = null;
        }

        deleteOtherImage(removeFile);
        saveOtherImageData(property.id, newOtherImageData);

        setOtherImage(newOtherImageData);
        setOtherImageUrl(newOtherImageUrl);

        Swal.fire({
            title: "Eliminado!",
            text: "Imagem eliminada com sucesso!",
            icon: "success",
            confirmButtonText: "Ok",
            allowOutsideClick: false,
            buttonsStyling: false,
            customClass: {
                confirmButton: "btn btn-primary",
            },
        });
    };

    useEffect(() => {
        const handleSuccess = async () => {
            setLoadingUpload(true);
            let propertyId = propertyResponse.data;

            // Cover image
            if (fileCoverImage !== null) {
                let coverImageFile = fileCoverImage[0].file;

                // Add cover image
                await saveCoverImage(propertyId, coverImageFile, coverImage);
            }

            // Add others image
            if (fileOtherImage !== null) {
                let otherImageFileArr = [];
                fileOtherImage.map((data) => otherImageFileArr.push(data.file));

                // Add others images
                await saveOtherImage(propertyId, otherImageFileArr, otherImage);
            }

            setLoadingUpload(false);

            if (action === "add") {
                Swal.fire({
                    title: "Adicionado!",
                    text: "Imóvel adicionado com sucesso!",
                    icon: "success",
                    confirmButtonText: "Ok",
                    allowOutsideClick: false,
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (propertyResponse.status === "success") {
                            let propertyId = propertyResponse.data;

                            // redirect to edit page
                            navigate(
                                `/villa-view/backoffice/edit-property/${propertyId}`
                            );
                        }
                    }
                });
            } else {
                Swal.fire({
                    title: "Editado!",
                    text: "Imóvel editado com sucesso!",
                    icon: "success",
                    confirmButtonText: "Ok",
                    allowOutsideClick: false,
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (propertyResponse.status === "success") {
                            // redirect to edit page
                            navigate(0);
                        }
                    }
                });
            }
        };

        switch (propertyResponse.status) {
            case "success":
                handleSuccess();

                break;

            default:
                break;
        }
    }, [propertyResponse]);

    return (
        <form id="form-property" onSubmit={handleSubmit}>
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
                    <div className="col-md-6 col-lg-8">
                        <label className="form-label">Nome do imóvel</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={propertyName}
                            onInput={(e) => setPropertyName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <label className="form-label">Referência</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={reference}
                            onInput={(e) => setReference(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <label className="form-label">Tipo de imóvel</label>
                        <select
                            className="form-select"
                            required
                            value={propertyTypeId}
                            onChange={(e) =>
                                setPropertyTypeId(Number(e.target.value))
                            }
                        >
                            <option value=""></option>
                            {propertyTypeArr &&
                                propertyTypeArr.map((propertyType) => (
                                    <option
                                        key={propertyType.property_type_id}
                                        value={propertyType.property_type_id}
                                    >
                                        {propertyType.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <label className="form-label">Ano de construção</label>

                        <DatePicker
                            className="form-control"
                            selected={constructionYear}
                            showYearPicker
                            dateFormat="yyyy"
                            onChange={(value) =>
                                setConstructionYear(
                                    new Date(value).getFullYear().toString()
                                )
                            }
                            isClearable={true}
                            closeOnScroll={true}
                            timeFormat=""
                        />
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <label className="form-label">Objetivo</label>
                        <select
                            className="form-select"
                            required
                            value={propertyGoalId}
                            onChange={(e) =>
                                setPropertyGoalId(Number(e.target.value))
                            }
                        >
                            <option value=""></option>
                            {propertyGoalArr &&
                                propertyGoalArr.map((propertyGoal) => (
                                    <option
                                        key={propertyGoal.property_goal_id}
                                        value={propertyGoal.property_goal_id}
                                    >
                                        {propertyGoal.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <label className="form-label">Estado</label>
                        <select
                            className="form-select"
                            required
                            value={propertyStatusId}
                            onChange={(e) =>
                                setPropertyStatusId(Number(e.target.value))
                            }
                        >
                            <option value=""></option>
                            {propertyStatusArr &&
                                propertyStatusArr.map((propertyStatus) => (
                                    <option
                                        key={propertyStatus.property_status_id}
                                        value={
                                            propertyStatus.property_status_id
                                        }
                                    >
                                        {propertyStatus.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <label className="form-label">Nº de Quartos</label>
                        <input
                            type="number"
                            className="form-control"
                            value={room}
                            min="0"
                            step="1"
                            onInput={(e) => setRoom(Number(e.target.value))}
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
                            onInput={(e) => setPrice(Number(e.target.value))}
                        />
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <label className="form-label">Distrito</label>
                        <select
                            className="form-select"
                            required
                            value={districtId}
                            onChange={(e) =>
                                setDistrictId(Number(e.target.value))
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
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <label className="form-label">Concelho</label>
                        <select
                            className="form-select"
                            required
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
                    </div>
                    <div className="col-md-6 col-lg-4">
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
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <label className="form-label">Latitude</label>
                        <input
                            type="number"
                            min="-180"
                            max="180"
                            step="any"
                            className="form-control"
                            value={latitude}
                            onInput={(e) => setLatitude(Number(e.target.value))}
                        />
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <label className="form-label">Longitude</label>
                        <input
                            type="number"
                            min="-180"
                            max="180"
                            step="any"
                            className="form-control"
                            value={longitude}
                            onInput={(e) =>
                                setLongitude(Number(e.target.value))
                            }
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Descrição</label>
                        <textarea
                            className="form-control"
                            rows="10"
                            value={description}
                            onInput={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="col-md-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="highlight"
                                checked={isHighlight}
                                onChange={() => setIsHighlight(!isHighlight)}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="highlight"
                            >
                                Marcar como destaque
                            </label>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="visible"
                                checked={isVisible}
                                onChange={() => setIsVisible(!isVisible)}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="visible"
                            >
                                Marcar como visivel
                            </label>
                        </div>
                    </div>
                </div>
                <h3 className="block-header">Media do Imóvel</h3>
                <div className="row">
                    <div className="col-12">
                        <label className="form-label">Imagem de capa</label>
                        <FilePond
                            name="cover-image"
                            files={fileCoverImage}
                            onupdatefiles={setFileCoverImage}
                            allowMultiple={false}
                            labelIdle='Arraste e solte a imagem ou <span class="filepond--label-action">Pesquise</span>'
                            allowImagePreview={true}
                            acceptedFileTypes={["image/*"]}
                            storeAsFile={true}
                            allowReorder={true}
                        />
                    </div>
                    {coverImageUrl && (
                        <div className="col-12">
                            <div className="preview-url">
                                <img
                                    src={coverImageUrl}
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    )}
                    <div className="col-12">
                        <label className="form-label">Outras images</label>
                        <FilePond
                            name="other-image"
                            files={fileOtherImage}
                            onupdatefiles={setFileOtherImage}
                            allowMultiple={true}
                            labelIdle='Arraste e solte as imagens ou <span class="filepond--label-action">Pesquise</span>'
                            allowImagePreview={true}
                            acceptedFileTypes={["image/*"]}
                        />
                    </div>
                    {otherImageUrl &&
                        otherImageUrl.map((url, index) => (
                            <div className="col-lg-12 col-xl-6" key={index}>
                                <div className="preview-url">
                                    <img src={url} className="img-fluid" />
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() =>
                                            handleClickDeleteOtherImage(index)
                                        }
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="text-end">
                    {!propertyResponse.loading && !loadingUpload && (
                        <button type="submit" className="btn btn-primary">
                            {action === "add"
                                ? "Adicionar imóvel"
                                : "Editar imóvel"}
                        </button>
                    )}
                    {(propertyResponse.loading || loadingUpload) && (
                        <button
                            type="button"
                            className="btn btn-primary"
                            disabled
                        >
                            Aguarde...
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default FormProperty;