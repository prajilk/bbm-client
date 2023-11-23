import { Butterflies } from "@/components/table/butterflies/columns";
import axios from "@/config/axios.config";

export async function addButterfly(value: Omit<Butterflies, "_id">) {
    try {
        const { data } = await axios.post(`/api/admin/butterflies`, value);

        if (data && data.error)
            return { error: "Unable to add data", id: null };
        else if (data && data.id)
            return { error: null, id: data.id } as {
                error: string | null;
                id: string | null;
            };
        return { error: "Unable to add data", id: null };
    } catch (error) {
        return { error: "Unable to add data", id: null };
    }
}
