import axios from "axios";

const client = axios.create({
    baseURL: "https://villa-view-backend.vercel.app/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default client;
