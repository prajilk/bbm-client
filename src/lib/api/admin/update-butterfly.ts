import { Butterflies } from "@/components/table/butterflies/columns";
import axios from "@/config/axios.config";

export async function updateButterfly(id: string, value: Butterflies) {
    try {
        const { data } = await axios.patch(
            `/api/admin/butterflies/${id}`,
            value
        );

        if (data && data.error) return { error: "Unable to update data" };
        return;
    } catch (error) {
        return;
    }
}
