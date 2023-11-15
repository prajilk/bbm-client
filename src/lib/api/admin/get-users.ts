import axios from "@/config/axios.config";
import { cookies } from "next/headers";

export async function getUsers() {
    try {
        const cookie = cookies();
        const { data } = await axios.get("/api/admin/users", {
            headers: {
                Cookie: `${cookie}`,
            },
        });

        if (data && data.users)
            return data.users as {
                _id: string;
                fullname: string;
                email: string;
            }[];
        return [];
    } catch (error) {
        return [];
    }
}
