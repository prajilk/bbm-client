import axios from "axios";
// https://api-bbm.onrender.com
// https://api-bbm.vercel.app
// http://localhost:5000
export default axios.create({
    baseURL: "https://api-bbm.vercel.app",
    withCredentials: true,
});
