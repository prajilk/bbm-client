import axios from "@/config/axios.config";
import { ChecklistProps } from "@/lib/types";
import { cookies } from "next/headers";

export async function getCounts() {
    try {
        const cookie = cookies();
        const { data } = await axios.get("/api/admin/counts", {
            headers: {
                Cookie: `${cookie}`,
            },
        });

        if (data && data.counts)
            return data.counts as {
                data: ChecklistProps & { _id: string };
                user: string;
            }[];
        return [];
    } catch (error) {
        return [];
    }
}
