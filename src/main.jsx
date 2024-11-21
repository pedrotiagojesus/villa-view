import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

// Splide
import "@splidejs/react-splide/css";

// Datepicker
import "react-datepicker/dist/react-datepicker.min.css";

// CSS
import "./assets/css/index.css";
import "./assets/css/root.css";
import "./assets/css/form.css";
import "./assets/css/datepicker.css";
import "./assets/css/sweetalert.css";

// Pages
import App from "./App.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import WantToSell from "./pages/WantToSell/WantToSell.jsx";
import Property from "./pages/Property/Property.jsx";
import Search from "./pages/Search/Search.jsx";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <Homepage />,
                },
                {
                    path: "contact",
                    element: <Contact />,
                },
                {
                    path: "about-us",
                    element: <AboutUs />,
                },
                {
                    path: "want-to-sell",
                    element: <WantToSell />,
                },
                {
                    path: "property/:property_id",
                    element: <Property />,
                },
                {
                    path: "search",
                    element: <Search />,
                },
            ],
        },
    ],
    {
        basename: "/villa-view",
    }
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
