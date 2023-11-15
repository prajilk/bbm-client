import Container from "@/components/container";
import Image from "next/image";
import { formateDateString } from "@/lib/utils";
import React from "react";
import ImageLinks from "./image-links";
import { getButterflyCounts } from "@/lib/api/butterfky-counts";

const MyData = async () => {
    const countData = await getButterflyCounts();

    return (
        <div className="w-full bg-zinc-100 min-h-screen">
            <Container className="py-16 md:py-24 px-2 max-w-5xl">
                <h1 className="font-semibold text-xl md:text-2xl">
                    My Counts Data
                </h1>
                <hr className="my-3" />
                {!countData || countData.length === 0 ? (
                    <div className="flex items-center flex-col">
                        <h1>No counts found!</h1>
                        <span className="text-xs text-muted-foreground">
                            Try after login or Refresh
                        </span>
                    </div>
                ) : (
                    countData.map((count, i) => (
                        <div
                            className="bg-white rounded-lg w-full shadow-sm p-5 border mb-2"
                            key={i}
                        >
                            <h1 className="font-semibold text-lg">
                                Count {i + 1}:
                            </h1>
                            <hr className="my-2" />
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <ul>
                                    <li className="text-sm text-muted-foreground">
                                        Name:{" "}
                                        <span className="font-medium text-black">
                                            {count.name}
                                        </span>
                                    </li>
                                    <li className="text-sm text-muted-foreground">
                                        Email:{" "}
                                        <span className="font-medium text-black">
                                            {count.email}
                                        </span>
                                    </li>
                                    <li className="text-sm text-muted-foreground">
                                        Contact Number:{" "}
                                        <span className="font-medium text-black">
                                            {count.contactNumber}
                                        </span>
                                    </li>
                                    <li className="text-sm text-muted-foreground">
                                        Affiliation:{" "}
                                        <span className="font-medium text-black">
                                            {count.affiliation}
                                        </span>
                                    </li>
                                    <li className="text-sm text-muted-foreground">
                                        Team:{" "}
                                        <span className="font-medium text-black">
                                            {count.teamNameOrNumber}
                                        </span>
                                    </li>
                                </ul>
                                <ul>
                                    <li className="text-sm text-muted-foreground">
                                        Date:{" "}
                                        <span className="font-medium text-black">
                                            {formateDateString(
                                                new Date(count.date)
                                            )}
                                        </span>
                                    </li>
                                    <li className="text-sm text-muted-foreground">
                                        Start Time:{" "}
                                        <span className="font-medium text-black">
                                            {count.startTime}
                                        </span>
                                    </li>
                                    <li className="text-sm text-muted-foreground">
                                        End Time:{" "}
                                        <span className="font-medium text-black">
                                            {count.endTime}
                                        </span>
                                    </li>
                                    <li className="text-sm text-muted-foreground">
                                        Location:{" "}
                                        <span className="font-medium text-black">
                                            {count.location}
                                        </span>
                                    </li>
                                    <li className="text-sm text-muted-foreground">
                                        Coordinates:{" "}
                                        <span className="font-medium text-black">
                                            {count.coordinates}
                                        </span>
                                    </li>
                                </ul>
                                <ul>
                                    <li className="text-sm text-muted-foreground">
                                        Altitude:{" "}
                                        <span className="font-medium text-black">
                                            {count.altitude}
                                        </span>
                                    </li>
                                    <li className="text-sm text-muted-foreground">
                                        Distance Covered:{" "}
                                        <span className="font-medium text-black">
                                            {count.distanceCovered}
                                        </span>
                                    </li>
                                    <li className="text-sm text-muted-foreground">
                                        Weather:{" "}
                                        <span className="font-medium text-black">
                                            {count.weather}
                                        </span>
                                    </li>
                                    <li className="text-sm text-muted-foreground">
                                        Image Link:{" "}
                                        {count.imageLinks
                                            ?.split(",")
                                            .map((image, i) => (
                                                <ImageLinks
                                                    image={image}
                                                    key={i}
                                                />
                                            ))}
                                    </li>
                                    <li className="text-sm text-muted-foreground">
                                        Comments:{" "}
                                        <span className="font-medium text-black">
                                            {count.comments}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <h4 className="font-semibold mt-3">Butterflies</h4>
                            <hr className="my-2" />
                            {count.speciesFound.map((specie, i) => (
                                <React.Fragment key={i}>
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="font-medium text-sm">
                                                {specie.commonName}
                                            </h3>
                                            <p className="text-xs">
                                                {specie.binomialName}
                                            </p>
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
                    ))
                )}
            </Container>
        </div>
    );
};

export default MyData;
