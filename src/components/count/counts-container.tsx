"use client";

import CountCard from "./count-card";
import { ChecklistProps } from "@/lib/types";
import { useEffect, useState } from "react";
import SortDropdown from "./sort-dropdown";

type CountsContainerProps = {
    counts: {
        counts: (ChecklistProps & { _id: string })[];
        user: {
            _id: string;
            fullname: string;
            email: string;
        };
    } | null;
};

const CountsContainer = ({ counts }: CountsContainerProps) => {
    const [sortedData, setSortedData] = useState(counts ? counts.counts : []);

    useEffect(() => {
        setSortedData(counts ? counts.counts : []);
    }, [counts]);

    const sortByDate = () => {
        setSortedData((prev) =>
            [...prev].sort(
                (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
            )
        );
    };

    const sortByCount = () => {
        setSortedData((prev) =>
            [...prev]
                .sort(
                    (a, b) =>
                        a.speciesFound.reduce(
                            (acc, curr) => curr.count + acc,
                            0
                        ) -
                        b.speciesFound.reduce(
                            (acc, curr) => curr.count + acc,
                            0
                        )
                )
                .reverse()
        );
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">User counts</h3>
                <div className="flex gap-3 items-center">
                    <SortDropdown
                        sortByCount={sortByCount}
                        sortByDate={sortByDate}
                    />
                    <span className="text-sm text-muted-foreground">
                        Total counts: {counts?.counts.length}
                    </span>
                </div>
            </div>
            <hr className="my-5" />
            <div className="max-h-screen overflow-y-scroll scrollbar-thin">
                {counts?.counts.length === 0 ? (
                    <div className="flex justify-center items-center">
                        <h1 className="text-muted-foreground">
                            No counts found!
                        </h1>
                    </div>
                ) : (
                    sortedData.map((count, i) => (
                        <CountCard
                            key={i}
                            count={{ data: count, user: counts?.user._id! }}
                            i={i}
                        />
                    ))
                )}
            </div>
        </>
    );
};

export default CountsContainer;
