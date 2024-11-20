import axios from "axios";
console.log(import.meta.env.VITE_API_URL);
const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default client;
