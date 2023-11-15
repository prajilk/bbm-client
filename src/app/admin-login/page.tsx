"use client";

import Container from "@/components/container";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { adminLogin } from "@/lib/api/admin-login";
import { AuthSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const AdminLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof AuthSchema>>({
        resolver: zodResolver(AuthSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof AuthSchema>) {
        try {
            setIsLoading(true);
            const data = await adminLogin(values);
            setCookie(
                "admin",
                btoa(
                    JSON.stringify({
                        id: data.user.id,
                        email: data.user.email,
                    })
                ),
                {
                    expires: new Date(
                        new Date().getTime() + 30 * 24 * 60 * 60 * 1000
                    ),
                }
            );
            toast.success("Logged in successfully.");
            router.replace("/admin");
        } catch (error: any) {
            toast.error(error.response.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container className="py-16 md:py-24">
            <div className="bg-white rounded-lg md:rounded-3xl p-7 md:p-10 max-w-sm mx-2 mt-5 md:mx-auto shadow-sm border">
                <h1 className="text-center text-xl font-medium">Admin Login</h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <LoadingButton
                            type="submit"
                            loader={isLoading}
                            disabled={isLoading}
                            className="w-full bg-primaryGreen hover:bg-green-600"
                        >
                            Log in
                        </LoadingButton>
                    </form>
                </Form>
            </div>
        </Container>
    );
};

export default AdminLogin;
