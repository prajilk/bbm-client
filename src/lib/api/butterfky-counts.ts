import axios from "@/config/axios.config";
import { headers } from "next/headers";
import { ChecklistProps } from "../types";
import { revalidatePath } from "next/cache";

export async function getButterflyCounts() {
    revalidatePath("/butterfly-counts/my-data");
    try {
        const headerSequence = headers();
        const cookie = headerSequence.get("cookie");
        const { data } = await axios.get("/api/butterfly-count", {
            headers: {
                Cookie: `${cookie}`,
            },
        });
        return data.countData as ChecklistProps[];
    } catch (error) {
        return null;
    }
}
