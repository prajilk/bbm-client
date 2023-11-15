import axios from "@/config/axios.config";
import { getCookie } from "cookies-next";

export async function deleteCount(id: string, user: string) {
    const adminCookie = getCookie("admin");

    try {
        await axios.get("/test", {
            headers: {
                Cookie: `admin=${adminCookie}`,
            },
            withCredentials: true,
        });
        const { data } = await axios.delete(`/api/admin/counts/${id}/${user}`, {
            headers: {
                Cookie: `admin=${adminCookie}`,
            },
        });
        return data;
    } catch (error) {
        return { deleted: false };
    }
}
