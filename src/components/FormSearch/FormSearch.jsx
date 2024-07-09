import { useNavigate } from "react-router-dom";

// CSS
import "./FormSearch.css";

const FormSearch = () => {
    const navigate = useNavigate();

    // Submit search form
    const handleSearch = (e) => {
        e.preventDefault();
        navigate("/villa-view/search");
    };

    return (
        <>
            <form id="form-search" onSubmit={(e) => handleSearch(e)}>
                <select className="form-select" name="">
                    <option value="" disabled>
                        Objetivo...
                    </option>
                    <option value="buy">Comprar</option>
                    <option value="rent">Arrendar</option>
                    <option value="trespass">Trespasse</option>
                </select>
                <select className="form-select" name="">
                    <option value="" disabled>
                        Tipo...
                    </option>
                    <option value="apartments">Apartamentos</option>
                    <option value="office">Escritórios</option>
                    <option value="business-property">
                        Imoveis com Negócio
                    </option>
                    <option value="store">Lojas</option>
                    <option value="house">Moradias</option>
                    <option value="building">Prédios</option>
                    <option value="bedroom">Quartos</option>
                    <option value="farm-state">Quintas e Herdades</option>
                    <option value="land">Terrenos</option>
                </select>
                <select className="form-select" name="">
                    <option value="" disabled>
                        Nº de Quartos...
                    </option>
                    <option value="1">1 Quarto</option>
                    <option value="2">2 Quartos</option>
                    <option value="3">3 Quartos</option>
                    <option value="4">4 Quartos</option>
                    <option value="5">5 Quartos</option>
                    <option value="6">6 Quartos</option>
                    <option value="7">7 Quartos</option>
                    <option value="8">8 Quartos</option>
                    <option value="9">9 Quartos</option>
                    <option value="10">10 Quartos +</option>
                </select>
                <button className="btn btn-primary btn-lg" type="submit">
                    Pesquisar
                </button>
                <button
                    className="btn btn-secondary btn-lg"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-search-advance"
                >
                    <i className="fa-solid fa-sliders"></i>
                </button>
            </form>
        </>
    );
};

export default FormSearch;
