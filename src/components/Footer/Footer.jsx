// CSS
import "./Footer.css";

// Assets
import Logo from "./../../assets/img/logotype.png";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <img
                            alt="Logotype"
                            src={Logo}
                            className="footer-logotype"
                        />
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-3">
                        <h4>Redes Sociais</h4>
                        <div className="social-network">
                            <Link to="https://www.facebook.com">
                                <i className="fa-brands fa-facebook"></i>
                            </Link>
                            <Link to="https://www.facebook.com">
                                <i className="fa-brands fa-instagram"></i>
                            </Link>
                            <Link to="https://www.facebook.com">
                                <i className="fa-brands fa-youtube"></i>
                            </Link>
                            <Link to="https://www.facebook.com">
                                <i className="fa-brands fa-x-twitter"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <h4>Contactos</h4>
                        <ul className="footer-contact">
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
                <p className="copyright">
                    © 2024 Villa View | Made with ♥ by{" "}
                    <a href="https://pedrotiagojesus.github.io/">Pedro Jesus</a>{" "}
                    in Coimbra.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
