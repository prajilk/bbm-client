"use client";

import ImageLinks from "@/app/butterfly-counts/my-data/image-links";
import { ChecklistProps } from "@/lib/types";
import { formateDateString } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import DeleteCount from "../dialog/delete-count";

const CountCard = ({
    count,
    i,
}: {
    count: {
        data: ChecklistProps & { _id: string };
        user: string;
    };
    i: number;
}) => {
    return (
        <div className="bg-white rounded-lg w-full shadow-sm p-5 border mb-2">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold">Count {i + 1}:</h1>
                <DeleteCount id={count.data._id} user={count.user} />
            </div>
            <hr className="my-2" />
            <div className="grid grid-cols-1 md:grid-cols-3">
                <ul>
                    <li className="text-sm text-muted-foreground">
                        Name:{" "}
                        <span className="font-medium text-black">
                            {count.data.name}
                        </span>
                    </li>
                    <li className="text-sm text-muted-foreground">
                        Email:{" "}
                        <span className="font-medium text-black">
                            {count.data.email}
                        </span>
                    </li>
                    <li className="text-sm text-muted-foreground">
                        Contact Number:{" "}
                        <span className="font-medium text-black">
                            {count.data.contactNumber}
                        </span>
                    </li>
                    <li className="text-sm text-muted-foreground">
                        Affiliation:{" "}
                        <span className="font-medium text-black">
                            {count.data.affiliation}
                        </span>
                    </li>
                    <li className="text-sm text-muted-foreground">
                        Team:{" "}
                        <span className="font-medium text-black">
                            {count.data.teamNameOrNumber}
                        </span>
                    </li>
                </ul>
                <ul>
                    <li className="text-sm text-muted-foreground">
                        Date:{" "}
                        <span className="font-medium text-black">
                            {formateDateString(new Date(count.data.date))}
                        </span>
                    </li>
                    <li className="text-sm text-muted-foreground">
                        Start Time:{" "}
                        <span className="font-medium text-black">
                            {count.data.startTime}
                        </span>
                    </li>
                    <li className="text-sm text-muted-foreground">
                        End Time:{" "}
                        <span className="font-medium text-black">
                            {count.data.endTime}
                        </span>
                    </li>
                    <li className="text-sm text-muted-foreground">
                        Location:{" "}
                        <span className="font-medium text-black">
                            {count.data.location}
                        </span>
                    </li>
                    <li className="text-sm text-muted-foreground">
                        Coordinates:{" "}
                        <span className="font-medium text-black">
                            {count.data.coordinates}
                        </span>
                    </li>
                </ul>
                <ul>
                    <li className="text-sm text-muted-foreground">
                        Altitude:{" "}
                        <span className="font-medium text-black">
                            {count.data.altitude}
                        </span>
                    </li>
                    <li className="text-sm text-muted-foreground">
                        Distance Covered:{" "}
                        <span className="font-medium text-black">
                            {count.data.distanceCovered}
                        </span>
                    </li>
                    <li className="text-sm text-muted-foreground">
                        Weather:{" "}
                        <span className="font-medium text-black">
                            {count.data.weather}
                        </span>
                    </li>
                    <li className="text-sm text-muted-foreground">
                        Image Link:{" "}
                        {count.data.imageLinks?.split(",").map((image, i) => (
                            <ImageLinks image={image} key={i} />
                        ))}
                    </li>
                    <li className="text-sm text-muted-foreground">
                        Comments:{" "}
                        <span className="font-medium text-black">
                            {count.data.comments}
                        </span>
                    </li>
                </ul>
            </div>
            <h4 className="font-semibold mt-3">Butterflies</h4>
            <hr className="my-2" />
            <div className="max-h-72 overflow-y-scroll scrollbar-thin">
                {count.data.speciesFound.map((specie, i) => (
                    <React.Fragment key={i}>
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-medium text-sm">
                                    {specie.commonName}
                                </h3>
                                <p className="text-xs">{specie.binomialName}</p>
                                <span className="text-xs">
                                    Count: {specie.count}
                                </span>
                            </div>
                            {specie.image && (
                                <Image
                                    src={specie.image}
                                    alt="Butterfly"
                                    width={60}
                                    height={60}
                                    style={{
                                        width: "auto",
                                        height: "auto",
                                    }}
                                />
                            )}
                        </div>
                        <hr className="my-2" />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default CountCard;
