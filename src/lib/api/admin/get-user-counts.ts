import axios from "@/config/axios.config";
import { ChecklistProps } from "@/lib/types";
import { cookies } from "next/headers";

export async function getUserCounts(userId: string | undefined) {
    try {
        const cookie = cookies();
        const { data } = await axios.get(`/api/admin/counts/${userId}`, {
            headers: {
                Cookie: `${cookie}`,
            },
        });

        if (data && data.counts)
            return data as {
                counts: (ChecklistProps & { _id: string })[];
                user: {
                    _id: string;
                    fullname: string;
                    email: string;
                };
            };
        return null;
    } catch (error) {
        return null;
    }
}
