import axios from "axios";
// https://api-bbm.onrender.com
// http://localhost:5000
export default axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});
