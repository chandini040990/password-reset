import axios from "axios";

// set the base url for the api for the backend

const api = axios.create({
    baseURL: `http://localhost:3001/api`,
})

export default api;