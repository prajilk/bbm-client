import axios from "@/config/axios.config";
import { cookies } from "next/headers";

export async function deleteCount(id: string, user: string) {
    const cookie = cookies();
    try {
        const { data } = await axios.delete(`/api/admin/counts/${id}/${user}`, {
            headers: {
                Cookie: `${cookie}`,
            },
        });
        return data;
    } catch (error) {
        return { deleted: false };
    }
}
