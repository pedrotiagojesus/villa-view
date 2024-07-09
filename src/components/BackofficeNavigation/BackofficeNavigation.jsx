import { Link } from "react-router-dom";

// CSS
import "./BackofficeNavigation.css";

// Hooks
import { useAuthentication } from "../../hooks/useAuthentication";

const BackofficeNavigation = () => {
    const { logout } = useAuthentication();

    return (
        <div id="backoffice-nagvigation" className="block-wrap">
            <div className="block-content-wrap">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="/villa-view/backoffice/dasboard"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="/villa-view/backoffice/create-property"
                        >
                            Criar novo imóvel
                        </Link>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" onClick={logout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default BackofficeNavigation;
