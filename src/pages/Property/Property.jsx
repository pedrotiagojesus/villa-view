import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";

// CSS
import "./Property.css";

// Components
import Banner from "../../components/Banner/Banner";
import Loader from "../../components/Loader/Loader";
import PropertyPrice from "../../components/PropertyPrice";
import PropertyAddress from "../../components/PropertyAddress";

// Emailjs
import emailjs from "@emailjs/browser";

// Sweetalert 2
import Swal from "sweetalert2";

// Hooks
import { useFetchProperty } from "../../hooks/firebase/useFetchProperty";

const Property = () => {
    const { property_id } = useParams();
    const { response: propertyResponse } = useFetchProperty(property_id);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleContact = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            "service_rgiw3sh",
            "template_isa25vs",
            e.target,
            "wNI4sprjKu_5ZAx8R"
        );

        Swal.fire({
            title: "Enviado!",
            text: "Email enviado com sucesso!",
            icon: "success",
            confirmButtonText: "Ok",
        }).then((result) => {
            if (result.isConfirmed) {
                setName("");
                setEmail("");
                setMessage("");
            }
        });
    };

    if (propertyResponse.loading || propertyResponse.loading === null) {
        return <Loader />;
    }

    const property = propertyResponse.data;

    // Gallery option
    const slideOption = {};

    return (
        <>
            <Banner title={property.property_name} />
            <section id="section-property-data">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <div className="">
                            <h1 className="property-name">
                                {property.property_name}
                            </h1>
                            <p className="reference">
                                Referência Imóvel:{" "}
                                <span>{property.reference}</span>
                            </p>
                            <span className="badge situation">
                                {property.property_goal_name}
                            </span>
                            <p className="address">
                                <i className="fa-solid fa-location-dot icon"></i>
                                <PropertyAddress property={property} />
                            </p>
                        </div>
                        <div className="price">
                            <PropertyPrice property={property} />
                        </div>
                    </div>

                    {property.cover_image_url && (
                        <Splide className="gallery" options={slideOption}>
                            {property.cover_image && (
                                <SplideSlide>
                                    <img
                                        src={property.cover_image_url}
                                        className="img-fluid"
                                    />
                                </SplideSlide>
                            )}
                            {property.other_image_url.map(
                                (other_image_url, index) => (
                                    <SplideSlide key={index}>
                                        <img
                                            src={other_image_url}
                                            alt=""
                                            className="img-fluid"
                                        />
                                    </SplideSlide>
                                )
                            )}
                        </Splide>
                    )}

                    <div className="row">
                        <div className="col-md-8 col-xll-9">
                            <div className="block-wrap property-detail">
                                <h3 className="block-header">Detalhes</h3>
                                <div className="row">
                                    <div className="col">
                                        <div className="row">
                                            <div className="col-12">
                                                <h5>Localidade</h5>
                                                <PropertyAddress
                                                    property={property}
                                                />
                                            </div>
                                            <div className="col-sm-6 col-md-4 col-lg-3">
                                                <h5>Tipo de imóvel</h5>
                                                {property.property_type_name}
                                            </div>
                                            <div className="col-sm-6 col-md-4 col-lg-3">
                                                <h5>Objetivo</h5>
                                                {property.property_goal_name}
                                            </div>
                                            <div className="col-sm-6 col-md-4 col-lg-3">
                                                <h5>Estado</h5>
                                                {property.property_status_name}
                                            </div>
                                            <div className="col-sm-6 col-md-4 col-lg-3">
                                                <h5>Preço</h5>
                                                <PropertyPrice
                                                    property={property}
                                                />
                                            </div>
                                            {property.construction_year !=
                                                "" && (
                                                <div className="col-sm-6 col-md-4 col-lg-3">
                                                    <h5>Ano de Construção</h5>
                                                    {property.construction_year}
                                                </div>
                                            )}
                                            <div className="col-sm-6 col-md-4 col-lg-3">
                                                <h5>Nº de quartos</h5>
                                                {property.room}
                                            </div>
                                        </div>
                                    </div>
                                    {property.latitude != 0 &&
                                        property.longitude != 0 && (
                                            <div className="col-xl-12">
                                                <div className="ratio ratio-16x9">
                                                    <iframe
                                                        frameBorder="0"
                                                        src={`https://www.google.com/maps/embed/v1/place?q=${property.latitude},${property.longitude}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
                                                    ></iframe>
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>

                            {property.description != "" && (
                                <div className="block-wrap property-detail">
                                    <h3 className="block-header">Descrição</h3>
                                    <div className="block-content-wrap">
                                        {property.description}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="col-md-4 col-xll-3">
                            <div className="block-wrap form">
                                <h3 className="block-header">
                                    Interessado no Imovél?
                                </h3>
                                <div className="block-content-wrap">
                                    <form onSubmit={handleContact}>
                                        <div className="">
                                            <label className="form-label">
                                                Nome
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="from_name"
                                                value={name}
                                                onInput={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="">
                                            <label className="form-label">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="from_email"
                                                value={email}
                                                onInput={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="">
                                            <label className="form-label">
                                                Mensagem
                                            </label>
                                            <textarea
                                                className="form-control"
                                                name="message"
                                                rows="8"
                                                value={message}
                                                onInput={(e) =>
                                                    setMessage(e.target.value)
                                                }
                                            ></textarea>
                                        </div>
                                        <input
                                            type="hidden"
                                            name="property_reference"
                                            value={property.reference}
                                        />
                                        <input
                                            type="hidden"
                                            name="property_name"
                                            value={property.property_name}
                                        />
                                        <div className="text-end">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Enviar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Property;
