import { Link } from "react-router-dom";

// Sweetalert 2
import Swal from "sweetalert2";

// CSS
import "./Dasboard.css";

// Components
import Banner from "../../components/Banner/Banner";
import BackofficeNavigation from "../../components/BackofficeNavigation/BackofficeNavigation";
import PropertyAddress from "../../components/PropertyAddress";

// Hooks
import { useFetchAllProperty } from "../../hooks/useFetchAllProperty";
import { useDeleteProperty } from "../../hooks/useDeleteProperty";

const Dasboard = () => {
    // Data
    const { propertyArr } = useFetchAllProperty();

    const { deleteProperty } = useDeleteProperty();

    const handleDelete = (property_id, cover_image, other_image) => {
        Swal.fire({
            title: "Eliminar!",
            text: "Pretender eliminar este imóvel?",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            allowOutsideClick: false,
            buttonsStyling: false,
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-secondary",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProperty(property_id, cover_image, other_image);
                Swal.fire({
                    title: "Eliminado!",
                    text: "Imóvel eliminado com sucesso!",
                    icon: "success",
                    confirmButtonText: "Ok",
                    allowOutsideClick: false,
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                });
            }
        });
    };

    return (
        <>
            <Banner title="Dasboard de backoffice" />
            <section id="section-backoffice-dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <BackofficeNavigation />
                        </div>
                        <div className="col-md-9">
                            <div
                                id="backoffice-list-property"
                                className="block-wrap"
                            >
                                <div className="block-content-wrap">
                                    {propertyArr && propertyArr.length > 0 && (
                                        <>
                                            <h2 className="block-header">
                                                Imóveis
                                            </h2>
                                            <table className="table align-middle mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">
                                                            Nome
                                                        </th>
                                                        <th scope="col">
                                                            Morada
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="text-center"
                                                        >
                                                            Opções
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {propertyArr.map(
                                                        (property, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <p className="mb-0">
                                                                        {
                                                                            property.property_name
                                                                        }
                                                                    </p>
                                                                    <small className="text-secondary">
                                                                        {
                                                                            property.reference
                                                                        }
                                                                    </small>
                                                                </td>
                                                                <td>
                                                                    <PropertyAddress
                                                                        property={
                                                                            property
                                                                        }
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex gap-2 justify-content-center">
                                                                        <Link
                                                                            className="btn btn-primary"
                                                                            to={`/villa-view/backoffice/edit-property/${property.id}`}
                                                                        >
                                                                            Editar
                                                                        </Link>
                                                                        <button
                                                                            onClick={() =>
                                                                                handleDelete(
                                                                                    property.id,
                                                                                    property.cover_image,
                                                                                    property.other_image
                                                                                )
                                                                            }
                                                                            className="btn btn-outline btn-danger"
                                                                        >
                                                                            Excluir
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </>
                                    )}
                                    {propertyArr &&
                                        propertyArr.length === 0 && (
                                            <>
                                                <h2 className="mb-0">
                                                    Sem imóveis a apresentar
                                                </h2>
                                            </>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dasboard;
