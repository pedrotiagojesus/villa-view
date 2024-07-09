import { useRouteError } from "react-router-dom";

// CSS
import "./Error.css";

const Erro = () => {
    const error = useRouteError();

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
};

export default Erro;
