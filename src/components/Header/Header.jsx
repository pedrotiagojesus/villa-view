import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// CSS
import "./Header.css";

// Assets
import Logo from "./../../assets/img/logotype.png";

const Header = () => {
    const [scroll, setScroll] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef(null);

    useEffect(() => {
        setHeaderHeight(headerRef.current.clientHeight);
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > headerHeight);
        });
    }, [window.scrollY]);

    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <header
            className={`navbar navbar-expand-lg bg-body-tertiary sticky-top ${
                !scroll ? `` : `scrolled shadow`
            }`}
            ref={headerRef}
        >
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img alt="Logotype" src={Logo} className="img-fluid" />
                </Link>
                <div className="d-flex align-items-center gap-2">
                    <span
                        className="nav-link d-lg-none"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-search-advance"
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#header-menu"
                        onClick={handleNavCollapse}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div
                    className={`${
                        isNavCollapsed ? "collapse" : ""
                    } navbar-collapse`}
                    id="header-menu"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className="nav-link"
                                onClick={handleNavCollapse}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/want-to-sell"
                                className="nav-link"
                                onClick={handleNavCollapse}
                            >
                                Quer vender?
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/about-us"
                                className="nav-link"
                                onClick={handleNavCollapse}
                            >
                                Quem somos?
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/contact"
                                className="nav-link"
                                onClick={handleNavCollapse}
                            >
                                Contactos
                            </NavLink>
                        </li>
                        <li className="nav-item d-none d-lg-block">
                            <span
                                className="nav-link"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-search-advance"
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
