import { Link } from "react-router-dom";
import { useState } from "react";

// CSS
import "./Contact.css";

// Components
import Banner from "../../components/Banner/Banner";

// Emailjs
import emailjs from "@emailjs/browser";

// Sweetalert 2
import Swal from "sweetalert2";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleContact = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            "service_rgiw3sh",
            "template_6oi1nbt",
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
                setSubject("");
                setMessage("");
            }
        });
    };

    return (
        <>
            <Banner title="CONTACTOS" />
            <section id="section-contact-detail">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="block-wrap form">
                                <h3 className="block-header">Contacte-nos</h3>
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
                                                Assunto
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="subject"
                                                value={subject}
                                                onInput={(e) =>
                                                    setSubject(e.target.value)
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
                        <div className="col-md-4">
                            <div className="block-wrap contact-data">
                                <h3 className="block-header">Dados</h3>

                                <div className="block-content-wrap">
                                    <ul className="contact-list">
                                        <li>
                                            <i className="fa-solid fa-envelope fa-fw icon"></i>
                                            <a href="mailto:info@villaview.com">
                                                info@villaview.com
                                            </a>
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-mobile-screen fa-fw icon"></i>
                                            <a href="tel:00351910000000">
                                                +351 910 000 000
                                            </a>
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-mobile-screen fa-fw icon"></i>
                                            <a href="tel:00351930000000">
                                                +351 930 000 000
                                            </a>
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-mobile-screen fa-fw icon"></i>
                                            <a href="tel:00351960000000">
                                                +351 960 000 000
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="block-wrap form">
                                <h3 className="block-header">
                                    As nosssas redes
                                </h3>

                                <div className="block-content-wrap"></div>
                                <div className="row social-network">
                                    <div className="col-md-6">
                                        <Link to="https://www.facebook.com">
                                            <i className="fa-brands fa-facebook"></i>
                                        </Link>
                                    </div>
                                    <div className="col-md-6">
                                        <Link to="https://www.facebook.com">
                                            <i className="fa-brands fa-instagram"></i>
                                        </Link>
                                    </div>
                                    <div className="col-md-6">
                                        <Link to="https://www.facebook.com">
                                            <i className="fa-brands fa-youtube"></i>
                                        </Link>
                                    </div>
                                    <div className="col-md-6">
                                        <Link to="https://www.facebook.com">
                                            <i className="fa-brands fa-x-twitter"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section-contact-text">
                <div className="container">
                    <h1>
                        Somos uma empresa com larga experiência comprovada,
                        sendo os nossos clientes a melhor prova disso
                    </h1>
                    <p>
                        Dedicamo-nos ao ramo da mediação imobiliária, quer na
                        venda e arrendamento de imóveis, como na gestão do
                        património dos nossos clientes, sendo a região de
                        Coimbra nossa área predileta de atuação. Tendo um
                        profundo conhecimento do mercado imobiliário e respetiva
                        legislação, trabalhamos para o satisfazer e para o
                        ajudar a fazer a sua melhor escolha. Com trabalho,
                        dedicação e paixão queremos receber de si o nosso maior
                        prestigio: "A sua lealdade". Acreditamos num serviço
                        diferenciado, onde o cliente é acima de tudo alguém
                        muito especial.
                    </p>
                    <p>Obrigado a todos os que nos ajudaram a chegar aqui!</p>
                </div>
            </section>
        </>
    );
};

export default Contact;
