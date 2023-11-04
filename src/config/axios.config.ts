import axios from "axios";

export default axios.create({
    baseURL: "https://api-bbm.verce.app",
    withCredentials: true,
});
