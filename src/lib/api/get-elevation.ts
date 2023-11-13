import axios from "@/config/axios.config";

export async function getElevation(lat: number, long: number) {
    const response = await axios.get(
        `/elevation?latitude=${lat}&longitude=${long}`
    );
    return response;
}
