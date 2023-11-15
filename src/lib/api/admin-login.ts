import axios from "@/config/axios.config";
import { z } from "zod";
import { AuthSchema } from "../zodSchemas";

export async function adminLogin(values: z.infer<typeof AuthSchema>) {
    const { data } = await axios.post("/api/admin/login", values);
    return data;
}
