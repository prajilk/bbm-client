import axios from "@/config/axios.config";
import { ChecklistProps } from "../types";

export const saveChecklist = async (values: ChecklistProps) => {
    try {
        const { data } = await axios.post("/api/butterfly-count", values);
        return data;
    } catch (error) {
        return null;
    }
};
