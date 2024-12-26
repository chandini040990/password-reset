import axios from "axios";

// set the base url for the api for the backend

const api = axios.create({
    baseURL: `https://password-reset-qhp3.onrender.com/api`,
})

export default api;