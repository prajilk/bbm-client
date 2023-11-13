import axios from "@/config/axios.config";
import { z } from "zod";
import { AuthSchema } from "../zodSchemas";

export async function login(values: z.infer<typeof AuthSchema>) {
    const { data } = await axios.post("/api/user/login", values);
    return data;
}
