"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { checklistDefaultValues, useGlobalContext } from "@/context/store";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import LoadingButton from "../ui/loading-button";
import axios from "@/config/axios.config";
import { toast } from "sonner";
import { saveChecklist } from "@/lib/api/save-checklist";
import { Dispatch, SetStateAction } from "react";
import { ButterflyProps } from "@/lib/types";
import { setCookie } from "cookies-next";

const SignUpForm = ({
    setSpecies,
}: {
    setSpecies: Dispatch<SetStateAction<ButterflyProps[]>>;
}) => {
    const {
        setCurrentTab,
        checklistData,
        setChecklistData,
        isSignUpFormOpen,
        setIsSignUpFormOpen,
        isLoading,
        setIsLoading,
    } = useGlobalContext();

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            fullname: checklistData.name,
            email: checklistData.email,
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof SignUpSchema>) {
        try {
            setIsLoading(true);
            const { data } = await axios.post("/api/user/register", values);
            if (data.registered) {
                toast.success("User registered successfully.");
                setCookie(
                    "user",
                    btoa(
                        JSON.stringify({
                            id: data.id,
                            email: values.email,
                            name: values.fullname,
                        })
                    ),
                    {
                        expires: new Date(
                            new Date().getTime() + 30 * 24 * 60 * 60 * 1000
                        ),
                    }
                );
                setIsSignUpFormOpen(false);
                try {
                    const data = await saveChecklist(checklistData);
                    if (data.countSaved) {
                        toast.success("Form submitted successfully.");
                        setSpecies([]);
                        setChecklistData({
                            ...checklistDefaultValues,
                            email: checklistData.email,
                            name: checklistData.name,
                            contactNumber: checklistData.contactNumber,
                        });
                        setCurrentTab("user");
                    }
                } catch (error: any) {
                    console.log(error);
                    if (!error.response.data.countSaved)
                        toast.error("Failed to submit form. Try again!");
                }
            }
        } catch (error: any) {
            if (!error.response.data.registered)
                toast.error("Registration failed. Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog
            open={isSignUpFormOpen}
            onOpenChange={() => setIsSignUpFormOpen((prev) => !prev)}
        >
            <DialogContent>
                <DialogTitle>Registration Form</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                    Email id <b>{checklistData.email}</b> is not yet registered.
                    Register now
                </DialogDescription>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2"
                    >
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fullname</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
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
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
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
                                            {...field}
                                            type="password"
                                            maxLength={20}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <LoadingButton
                            loader={isLoading}
                            disabled={isLoading || !form.formState.isDirty}
                            className="float-right w-[7rem] bg-primaryGreen hover:bg-green-600"
                            type="submit"
                        >
                            Register
                        </LoadingButton>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default SignUpForm;
