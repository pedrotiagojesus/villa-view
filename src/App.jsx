import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Firebase
import { onAuthStateChanged } from "firebase/auth";

// Hooks
import { useAuthentication } from "./hooks/useAuthentication";

// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ModalSearchAdvance from "./components/ModalSearchAdvance/ModalSearchAdvance";
import Loader from "./components/Loader/Loader.jsx";

// Pages
import Homepage from "./pages/Homepage/Homepage.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import WantToSell from "./pages/WantToSell/WantToSell.jsx";
import Property from "./pages/Property/Property.jsx";
import Search from "./pages/Search/Search.jsx";
import Login from "./pages/Login/Login.jsx";
import Dasboard from "./pages/Dashboard/Dasboard.jsx";
import CreateProperty from "./pages/CreateProperty/CreateProperty.jsx";
import EditProperty from "./pages/EditProperty/EditProperty.jsx";

function App() {
    const [user, setUser] = useState(undefined);
    const { auth } = useAuthentication();

    const loadingUser = user === undefined;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, [auth]);

    if (loadingUser) {
        return <Loader />;
    }

    return (
        <>
            <BrowserRouter>
                <Header />
                <main>
                    <Routes>
                        <Route
                            path="/villa-view/contact"
                            element={<Contact />}
                        ></Route>
                        <Route
                            path="/villa-view/about-us"
                            element={<AboutUs />}
                        ></Route>
                        <Route
                            path="/villa-view/want-to-sell"
                            element={<WantToSell />}
                        ></Route>
                        <Route
                            path="/villa-view/property/:property_id"
                            element={<Property />}
                        ></Route>
                        <Route
                            path="/villa-view/search"
                            element={<Search />}
                        ></Route>
                        <Route
                            path="/villa-view"
                            element={<Homepage />}
                        ></Route>
                        <Route
                            path="/villa-view/backoffice"
                            element={
                                !user ? (
                                    <Navigate to="/villa-view/backoffice/login" />
                                ) : (
                                    <Navigate to="/villa-view/backoffice/dasboard" />
                                )
                            }
                        ></Route>
                        <Route
                            path="/villa-view/backoffice/login"
                            element={
                                !user ? (
                                    <Login />
                                ) : (
                                    <Navigate to="/villa-view/backoffice/dasboard" />
                                )
                            }
                        ></Route>
                        <Route
                            path="/villa-view/backoffice/dasboard"
                            element={
                                user ? (
                                    <Dasboard />
                                ) : (
                                    <Navigate to="/villa-view/backoffice/login" />
                                )
                            }
                        ></Route>
                        <Route
                            path="/villa-view/backoffice/create-property"
                            element={
                                user ? (
                                    <CreateProperty />
                                ) : (
                                    <Navigate to="/villa-view/backoffice/login" />
                                )
                            }
                        ></Route>
                        <Route
                            path="/villa-view/backoffice/edit-property/:property_id"
                            element={
                                user ? (
                                    <EditProperty />
                                ) : (
                                    <Navigate to="/villa-view/backoffice/login" />
                                )
                            }
                        ></Route>
                    </Routes>
                </main>
                <Footer />
                <ModalSearchAdvance />
            </BrowserRouter>
        </>
    );
}

export default App;
