import axios from "@/config/axios.config";

export async function deleteCount(id: string, user: string) {
    try {
        const { data } = await axios.delete(`/api/admin/counts/${id}/${user}`);
        return data;
    } catch (error) {
        return { deleted: false };
    }
}
