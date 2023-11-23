import { Butterflies } from "@/components/table/butterflies/columns";
import axios from "@/config/axios.config";

export async function syncData(date: string) {
    try {
        const { data } = await axios.get(
            `/api/butterflies/sync/${encodeURIComponent(date)}`
        );
        console.log(data);

        return data as {
            isSync: boolean;
            data: {
                _id: string;
                lastUpdated: string;
                butterflies: Butterflies[];
            } | null;
        };
    } catch (error: any) {
        return { isSync: false, data: null };
    }
}
