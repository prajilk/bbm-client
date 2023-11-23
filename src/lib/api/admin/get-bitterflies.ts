import { Butterflies } from "@/components/table/butterflies/columns";
import axios from "@/config/axios.config";
import { cookies } from "next/headers";

export async function getButterflies() {
    try {
        const cookie = cookies();
        const { data } = await axios.get("/api/admin/butterflies", {
            headers: {
                Cookie: `${cookie}`,
            },
        });

        if (data && data.butterflies) return data.butterflies as Butterflies[];
        return [];
    } catch (error) {
        return [];
    }
}
