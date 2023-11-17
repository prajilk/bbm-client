"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChecklistProps } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { formatCurrentDate } from "@/lib/utils";
import { useGlobalContext } from "@/context/store";
import axios from "@/config/axios.config";
import { toast } from "sonner";
import LoadingButton from "../ui/loading-button";
import { useRouter } from "next/navigation";
import InputField from "./components/input-field";
import ButterflyCard from "./components/butterfly-card";

const EditCountForm = ({
    count,
    userId,
}: {
    count: ChecklistProps & { _id: string };
    userId: string;
}) => {
    const { setChecklistData, checklistData } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const { _id, ...countData } = count;
        setChecklistData(countData);
    }, []);

    async function submitEdits(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true);
            const { data } = await axios.put(
                `/api/admin/count/${count._id}/${userId}`,
                { ...checklistData, _id: count._id }
            );
            if (data.updated) toast.success("Count updated successfully.");
            router.push("/admin");
        } catch (error) {
            toast.error("Unable to update count");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={submitEdits} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                <InputField label="Name of the person" id="name" />
                <InputField label="Affiliation" id="affiliation" />
                <InputField label="Contact number" id="contactNumber" />
                <InputField label="Team" id="teamNameOrNumber" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                <InputField
                    label="Date"
                    id="date"
                    value={formatCurrentDate(new Date(checklistData.date))}
                    type="date"
                />
                <InputField label="Start Time" id="startTime" type="time" />
                <InputField label="End Time" id="endTime" type="time" />
                <InputField label="Location" id="location" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                <InputField label="Coordinates" id="coordinates" />
                <InputField label="Altitude" id="altitude" />
                <div className="space-y-1">
                    <Label htmlFor="distanceCovered">Distance covered</Label>
                    <Input
                        id="distanceCovered"
                        value={checklistData.distanceCovered}
                        onChange={(e) =>
                            setChecklistData((prev) => ({
                                ...prev,
                                distanceCovered: Number(e.target.value) || 0,
                            }))
                        }
                    />
                </div>
                <InputField label="Weather" id="weather" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <InputField label="Images" id="imageLinks" />
                <InputField label="Comments" id="comments" />
            </div>
            <div className="border-b w-full pt-5" />
            <h1 className="font-semibold">Butterfly details</h1>
            <span className="text-muted-foreground text-xs">
                Total species found: {checklistData.speciesFound.length}
            </span>
            <div className="flex gap-2 overflow-x-scroll scrollbar-thin-hor ps-1.5">
                {checklistData.speciesFound.map((specie, i) => (
                    <ButterflyCard specie={specie} index={i} key={i} />
                ))}
            </div>
            <hr />
            <div className="flex justify-center py-5">
                <LoadingButton
                    loader={isLoading}
                    className="bg-primaryGreen hover:bg-green-600 w-32"
                    disabled={isLoading}
                >
                    Save Changes
                </LoadingButton>
            </div>
        </form>
    );
};

export default EditCountForm;
