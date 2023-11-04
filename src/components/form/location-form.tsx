"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodLocationSchema } from "@/lib/zodSchemas";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { useGlobalContext } from "@/context/store";
import { formatCurrentDate, getDistanceFromLatLonInKm } from "@/lib/utils";

const LocationForm = () => {
    const { setCurrentTab, checklistData, setChecklistData } =
        useGlobalContext();

    const form = useForm<z.infer<typeof ZodLocationSchema>>({
        resolver: zodResolver(ZodLocationSchema),
        defaultValues: {
            date: checklistData.date,
            startTime: checklistData.startTime,
            endTime: checklistData.endTime,
            location: checklistData.location,
            coordinates: checklistData.coordinates,
            altitude: checklistData.altitude,
            weather: checklistData.weather,
            imageLinks: checklistData.imageLinks,
            comments: checklistData.comments,
        },
    });

    async function onSubmit(values: z.infer<typeof ZodLocationSchema>) {
        setChecklistData((prev) => ({ ...prev, ...values }));
        setCurrentTab("checklist");
    }

    function getMyLocation() {
        const location = window.navigator && window.navigator.geolocation;

        if (location) {
            location.getCurrentPosition(
                (position) => {
                    form.setValue(
                        "coordinates",
                        `${position.coords.latitude}, ${position.coords.longitude}`
                    );
                },
                (error) => {
                    form.setValue(
                        "coordinates",
                        "Unable get coordinates. Please allow location permission"
                    );
                }
            );
        }
    }

    return (
        <Form {...form}>
            <form
                id="locationForm"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
            >
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-1">
                                    <Label htmlFor="date">
                                        Date{" "}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input id="date" type="date" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-1">
                                    <Label htmlFor="startTime">
                                        Start Time
                                    </Label>
                                    <Input
                                        id="startTime"
                                        type="time"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-1">
                                    <Label htmlFor="endTime">End Time</Label>
                                    <Input
                                        id="endTime"
                                        type="time"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-1">
                                    <Label htmlFor="location">
                                        Location &#40;Place name, nearest
                                        village/town&#41;{" "}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="location"
                                        type="text"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="coordinates"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-1">
                                    <Label htmlFor="coordinates">
                                        Coordinates{" "}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="flex w-full items-center space-x-2">
                                        <Input
                                            id="coordinates"
                                            type="text"
                                            {...field}
                                        />
                                        <Button
                                            type="button"
                                            className="bg-primaryGreen hover:bg-green-600"
                                            onClick={getMyLocation}
                                        >
                                            Get Coordinates
                                        </Button>
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="altitude"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-1">
                                    <Label htmlFor="altitude">
                                        Altitude, m
                                    </Label>
                                    <Input
                                        id="altitude"
                                        type="text"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="weather"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-1">
                                    <Label htmlFor="weather">
                                        Weather &#40;sunny, cloudy, windy,
                                        etc.&#41;
                                    </Label>
                                    <Input
                                        id="weather"
                                        type="text"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="imageLinks"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-1">
                                    <Label htmlFor="imageLinks">
                                        Share the Links to Your Uploaded Images
                                    </Label>
                                    <Input
                                        id="imageLinks"
                                        type="text"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-1">
                                    <Label htmlFor="comments">Comments</Label>
                                    <Input
                                        id="comments"
                                        type="text"
                                        {...field}
                                    />
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

export default LocationForm;
