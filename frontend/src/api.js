import axios from "axios";

// set the base url for the api for the backend

const api = axios.create({
    baseURL: `https://password-reset-1-cyor.onrender.com/api`,
})

export default api;