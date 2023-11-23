import axios from "@/config/axios.config";

export async function deleteButterfly(id: string) {
    try {
        const { data } = await axios.delete(`/api/admin/butterflies/${id}`);
        if (data && !data.error) return { error: false };
        return { error: true };
    } catch (error) {
        return { error: true };
    }
}
