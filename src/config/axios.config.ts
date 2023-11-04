import axios from "axios";

export default axios.create({
    baseURL: "https://api-bbm.vercel.app",
    withCredentials: true,
});
