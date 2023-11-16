import axios from "@/config/axios.config";
import { ChecklistProps } from "@/lib/types";
import { cookies } from "next/headers";

export async function getCount(
    countId: string | undefined,
    userId: string | undefined
) {
    try {
        const cookie = cookies();
        const { data } = await axios.get(
            `/api/admin/count/${countId}/${userId}`,
            {
                headers: {
                    Cookie: `${cookie}`,
                },
            }
        );

        if (data && data.count)
            return data.count as {
                count: ChecklistProps & { _id: string };
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
