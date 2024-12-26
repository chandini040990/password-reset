import axios from "axios";

// set the base url for the api for the backend

const api = axios.create({
    baseURL: `https://chand2-password-reset.netlify.app/api`,
})

export default api;