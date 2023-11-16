"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ChangeImageUrl from "../dialog/change-image-url";
import { ChecklistProps } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { formatCurrentDate } from "@/lib/utils";
import { Button } from "../ui/button";
import { useGlobalContext } from "@/context/store";
import DeleteCountEdit from "../dialog/delete-count-edit";
import axios from "@/config/axios.config";
import { toast } from "sonner";
import LoadingButton from "../ui/loading-button";
import { redirect } from "next/navigation";

const EditCountForm = ({
    count,
    userId,
}: {
    count: ChecklistProps & { _id: string };
    userId: string;
}) => {
    const { setChecklistData, checklistData } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);

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
            redirect("/admin");
        } catch (error) {
            toast.error("Unable to update count");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={submitEdits} className="space-y-2">
            <div className="grid grid-cols-4 gap-2">
                <div className="space-y-1">
                    <Label htmlFor="name">Name of the person</Label>
                    <Input
                        id="name"
                        value={checklistData.name}
                        onChange={(e) =>
                            setChecklistData((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="affiliation">Affiliation</Label>
                    <Input
                        id="affiliation"
                        value={checklistData.affiliation}
                        onChange={(e) =>
                            setChecklistData((prev) => ({
                                ...prev,
                                affiliation: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="contactNumber">Contact number</Label>
                    <Input
                        id="contactNumber"
                        value={checklistData.contactNumber}
                        onChange={(e) =>
                            setChecklistData((prev) => ({
                                ...prev,
                                contactNumber: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="teamNameOrNumber">Team</Label>
                    <Input
                        id="teamNameOrNumber"
                        value={checklistData.teamNameOrNumber}
                        onChange={(e) =>
                            setChecklistData((prev) => ({
                                ...prev,
                                teamNameOrNumber: e.target.value,
                            }))
                        }
                    />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
                <div className="space-y-1">
                    <Label htmlFor="date">Date</Label>
                    <Input
                        id="date"
                        value={formatCurrentDate(new Date(checklistData.date))}
                        onChange={(e) =>
                            setChecklistData((prev) => ({
                                ...prev,
                                date: e.target.value,
                            }))
                        }
                        type="date"
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                        id="startTime"
                        value={checklistData.startTime}
                        onChange={(e) =>
                            setChecklistData((prev) => ({
                                ...prev,
                                startTime: e.target.value,
                            }))
                        }
                        type="time"
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                        id="endTime"
                        value={checklistData.endTime}
                        onChange={(e) =>
                            setChecklistData((prev) => ({
                                ...prev,
                                endTime: e.target.value,
                            }))
                        }
                        type="time"
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        value={checklistData.location}
                        onChange={(e) =>
                            setChecklistData((prev) => ({
                                ...prev,
                                location: e.target.value,
                            }))
                        }
                    />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
                <div className="space-y-1">
                    <Label htmlFor="coordinates">Coordinate</Label>
                    <Input
                        id="coordinates"
                        value={checklistData.coordinates}
                        onChange={(e) =>
                            setChecklistData((prev) => ({
                                ...prev,
                                coordinates: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="altitude">Altitude</Label>
                    <Input
                        id="altitude"
                        value={checklistData.altitude}
                        onChange={(e) =>
                            setChecklistData((prev) => ({
                                ...prev,
                                altitude: e.target.value,
                            }))
                        }
                    />
                </div>
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
                <div className="space-y-1">
                    <Label htmlFor="weather">Weather</Label>
                    <Input
                        id="weather"
                        value={checklistData.weather}
                        onChange={(e) =>
                            setChecklistData((prev) => ({
                                ...prev,
                                weather: e.target.value,
                            }))
                        }
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                    <Label htmlFor="imageLinks">Images</Label>
                    <Input
                        id="imageLinks"
                        value={checklistData.imageLinks}
                        onChange={(e) =>
                            setChecklistData((prev) => ({
                                ...prev,
                                imageLinks: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="comments">Comments</Label>
                    <Input
                        id="comments"
                        value={checklistData.comments}
                        onChange={(e) =>
                            setChecklistData((prev) => ({
                                ...prev,
                                comments: e.target.value,
                            }))
                        }
                    />
                </div>
            </div>
            <div className="border-b w-full pt-5" />
            <h1 className="font-semibold">Butterfly details</h1>
            <span className="text-muted-foreground text-xs">
                Total species found: {checklistData.speciesFound.length}
            </span>
            <div className="flex gap-2 overflow-x-scroll scrollbar-thin-hor ps-1.5">
                {checklistData.speciesFound.map((specie, i) => (
                    <React.Fragment key={i}>
                        <div className="space-y-1 min-w-[250px] flex-grow-0 flex-shrink-0">
                            <div className="flex justify-between items-center">
                                <h1 className="font-medium text-sm my-3 border-b border-primaryGreen w-fit">
                                    Count {i + 1}
                                </h1>
                                <DeleteCountEdit index={i} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="commonName">Common Name</Label>
                                <Input
                                    className="h-8"
                                    id="commonName"
                                    value={specie.commonName}
                                    onChange={(e) =>
                                        setChecklistData((prev) => ({
                                            ...prev,
                                            speciesFound: [
                                                ...prev.speciesFound.slice(
                                                    0,
                                                    i
                                                ),
                                                {
                                                    ...prev.speciesFound[i],
                                                    commonName: e.target.value,
                                                },
                                                ...prev.speciesFound.slice(
                                                    i + 1
                                                ),
                                            ],
                                        }))
                                    }
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="binomialName">
                                    Binomial Name
                                </Label>
                                <Input
                                    className="h-8"
                                    id="binomialName"
                                    value={specie.binomialName}
                                    onChange={(e) =>
                                        setChecklistData((prev) => ({
                                            ...prev,
                                            speciesFound: [
                                                ...prev.speciesFound.slice(
                                                    0,
                                                    i
                                                ),
                                                {
                                                    ...prev.speciesFound[i],
                                                    binomialName:
                                                        e.target.value,
                                                },
                                                ...prev.speciesFound.slice(
                                                    i + 1
                                                ),
                                            ],
                                        }))
                                    }
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="count">Counts</Label>
                                <Input
                                    className="h-8"
                                    id="count"
                                    min={0}
                                    value={specie.count}
                                    onChange={(e) =>
                                        setChecklistData((prev) => ({
                                            ...prev,
                                            speciesFound: [
                                                ...prev.speciesFound.slice(
                                                    0,
                                                    i
                                                ),
                                                {
                                                    ...prev.speciesFound[i],
                                                    count:
                                                        Number(
                                                            e.target.value
                                                        ) || 0,
                                                },
                                                ...prev.speciesFound.slice(
                                                    i + 1
                                                ),
                                            ],
                                        }))
                                    }
                                    type="number"
                                />
                            </div>
                            <div className="flex items-center gap-4 py-2">
                                <div className="relative w-16 aspect-square">
                                    <Image
                                        src={specie.image || "/"}
                                        alt="Butterfly"
                                        fill
                                        sizes="100px"
                                    />
                                </div>
                                <ChangeImageUrl index={i} />
                            </div>
                        </div>
                        <div className="border-r mx-5" />
                    </React.Fragment>
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
