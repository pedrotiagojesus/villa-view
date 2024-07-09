import React from "react";
import ReactDOM from "react-dom/client";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

// Splide
import "@splidejs/react-splide/css";

// Datepicker
import "react-datepicker/dist/react-datepicker.min.css";

// CSS
import "./index.css";
import "./root.css";
import "./form.css";
import "./datepicker.css";
import "./sweetalert.css";

// Pages
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
