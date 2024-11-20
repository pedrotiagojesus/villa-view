import { Outlet } from "react-router-dom";

// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ModalSearchAdvance from "./components/ModalSearchAdvance/ModalSearchAdvance";
import Loader from "./components/Loader/Loader";

// Pages

function App() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
            <ModalSearchAdvance />
        </>
    );
}

export default App;
