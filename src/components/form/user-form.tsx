"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ZodUserSchema } from "@/lib/zodSchemas";
import { useGlobalContext } from "@/context/store";
import { getCookie } from "cookies-next";
import { useEffect } from "react";

const UserForm = () => {
    const { setCurrentTab, checklistData, setChecklistData } =
        useGlobalContext();

    const form = useForm<z.infer<typeof ZodUserSchema>>({
        resolver: zodResolver(ZodUserSchema),
        defaultValues: {
            name: checklistData.name,
            affiliation: checklistData.affiliation,
            contactNumber: checklistData.contactNumber,
            email: checklistData.email,
            teamNameOrNumber: checklistData.teamNameOrNumber,
        },
    });

    useEffect(() => {
        const userCookie = getCookie("user") || "";
        const decodedUser = JSON.parse(
            atob(userCookie) === "" ? "{}" : atob(userCookie)
        );
        if (Object.keys(decodedUser).length !== 0 && decodedUser.email) {
            form.setValue("email", decodedUser.email);
            form.setValue("name", decodedUser.name);
        }
    }, []);

    async function onSubmit(values: z.infer<typeof ZodUserSchema>) {
        setChecklistData((prev) => ({ ...prev, ...values }));
        setCurrentTab("location");
    }

    return (
        <Form {...form}>
            <form
                id="userForm"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-1">
                                    <Label htmlFor="name">
                                        Name of the person taking count{" "}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input id="name" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="affiliation"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-1">
                                    <Label htmlFor="affiliation">
                                        Affiliation &#40;NGO/School, etc&#41;
                                    </Label>
                                    <Input id="affiliation" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-1">
                                    <Label htmlFor="contactNumber">
                                        Contact Number
                                    </Label>
                                    <Input id="contactNumber" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-1">
                                    <Label htmlFor="email">
                                        Email Address{" "}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input id="email" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="teamNameOrNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-1">
                                    <Label htmlFor="teamNameOrNumber">
                                        Name and/or number of team members
                                    </Label>
                                    <Input id="teamNameOrNumber" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default UserForm;
