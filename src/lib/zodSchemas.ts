import { z } from "zod";

export const AuthSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, "Password must be 8 or more characters long"),
});

export const SignUpSchema = z.object({
    fullname: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, "Password must be 8 or more characters long"),
});

export const ZodUserSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be 3 or more characters long")
        .max(20, "Name must be less than 20 characters long"),
    affiliation: z.string().optional(),
    contactNumber: z
        .string()
        .refine((value) => /^(|^\d{10}$)/.test(value), {
            message:
                "Invalid phone number format. Please enter a 10-digit number.",
        })
        .optional(),
    email: z.string().email({ message: "Invalid email address" }),
    teamNameOrNumber: z.string().optional(),
});

export const ZodLocationSchema = z.object({
    date: z.string(),
    startTime: z
        .string()
        .regex(/^\d{2}:\d{2}$/)
        .optional(),
    endTime: z
        .string()
        .regex(/^\d{2}:\d{2}$/)
        .optional(),
    location: z
        .string()
        .min(3, "Location must be 3 or more characters long")
        .max(20, "Location must be less than 20 characters long"),
    coordinates: z.string().refine(
        (value) => {
            const [latitude, longitude] = value.split(",");
            const lat = parseFloat(latitude);
            const lon = parseFloat(longitude);
            return (
                !isNaN(lat) &&
                !isNaN(lon) &&
                lat >= -90 &&
                lat <= 90 &&
                lon >= -180 &&
                lon <= 180
            );
        },
        {
            message: "Invalid coordinates format or out of range.",
        }
    ),
    altitude: z
        .string()
        .refine((value) => /^\d+$/.test(value), {
            message: "Invalid Altitude.",
        })
        .optional(),
    weather: z.string().optional(),
    imageLinks: z.string().optional(),
    comments: z.string().optional(),
});
