import axios from "axios";

export default axios.create({
    baseURL: "https://api-bbm.onrender.com",
    withCredentials: true,
});
