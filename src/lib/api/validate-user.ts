import axios from "@/config/axios.config";

export const validateUser = async (email: string) => {
    try {
        const { data } = await axios.post("/api/user/validate-user", {
            email: email,
        });
        return data;
    } catch (error) {
        return null;
    }
};
