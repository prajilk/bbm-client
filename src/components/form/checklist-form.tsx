"use client";

import React, { useState, ChangeEvent } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { ButterflyProps } from "@/lib/types";
import SpeciesListCard from "../species/species-list-card";
import SpeciesNotFound from "../species/species-not-found";
import SearchResultCard from "../species/search-result-card";
import { useGlobalContext } from "@/context/store";
import { saveChecklist } from "@/lib/api/save-checklist";
import SignUpForm from "./signup-form";
import { getDistanceFromLatLonInKm } from "@/lib/utils";
import { validateUser } from "@/lib/api/validate-user";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/config/dexie.config";

const { butterflies } = db;

const ChecklistForm = () => {
    const {
        setCurrentTab,
        checklistData,
        setChecklistData,
        setIsSignUpFormOpen,
        setIsLoading,
        isSignUpFormOpen,
        setShowSuccess,
    } = useGlobalContext();

    const [showCommonSearch, setCommonSearch] = useState(false);
    const [showBinomialSearch, setBinomialSearch] = useState(false);
    const [commonInput, setCommonInput] = useState("");
    const [binomialInput, setBinomialInput] = useState("");
    const [selectedButterfly, setSelectedButterfly] = useState<ButterflyProps>({
        binomialName: "",
        commonName: "",
        image: "",
    });
    const [searchResult, setSearchResult] = useState<
        { commonName: string; binomialName: string; image?: string }[]
    >([]);

    const allButterflies = useLiveQuery(() => butterflies.toArray(), []);

    function findCommonName(e: ChangeEvent<HTMLInputElement>) {
        setCommonInput(e.target.value);
        setCommonSearch(true);
        const result = allButterflies
            ?.filter((butterfly) =>
                butterfly.commonName
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            )
            .map((butterfly) => ({
                commonName: butterfly.commonName,
                binomialName: butterfly.binomialName,
                image: butterfly.image,
            }));
        setSearchResult(result || []);
    }

    function findBinomialName(e: ChangeEvent<HTMLInputElement>) {
        setBinomialInput(e.target.value);
        setBinomialSearch(true);
        const result = allButterflies
            ?.filter((butterfly) =>
                butterfly.binomialName
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            )
            .map((butterfly) => ({
                commonName: butterfly.commonName,
                binomialName: butterfly.binomialName,
                image: butterfly.image,
            }));
        setCommonInput(selectedButterfly?.commonName);
        setSearchResult(result || []);
    }

    function addSpecies() {
        if (
            selectedButterfly.binomialName !== "" &&
            selectedButterfly.commonName !== ""
        ) {
            setCommonInput("");
            setBinomialInput("");
            toast.success(`"${commonInput}" added successfully!`);

            setChecklistData((prev) => {
                const updatedSpeciesFound = [...prev.speciesFound];
                const index = updatedSpeciesFound.findIndex(
                    (specie) =>
                        specie.binomialName === selectedButterfly.binomialName
                );

                if (index !== -1) {
                    // Species found, update count
                    updatedSpeciesFound[index] = {
                        ...updatedSpeciesFound[index],
                        count: (updatedSpeciesFound[index].count || 0) + 1,
                    };
                } else {
                    // Species not found, add a new entry
                    updatedSpeciesFound.push({
                        ...selectedButterfly,
                        count: 1,
                    });
                }

                return {
                    ...prev,
                    speciesFound: updatedSpeciesFound,
                };
            });

            setSelectedButterfly({
                binomialName: "",
                commonName: "",
            });
        } else {
            toast.error("Please fill the above required fields!");
        }
    }

    async function submitCounts(distanceCovered: number) {
        try {
            setIsLoading(true);
            localStorage.setItem(
                "butterfly-count",
                JSON.stringify({
                    ...checklistData,
                    distanceCovered: distanceCovered,
                })
            );
            const data = await saveChecklist({
                ...checklistData,
                distanceCovered: distanceCovered,
            });
            if (data.countSaved) {
                toast.success("Form submitted successfully.");
                localStorage.removeItem("butterfly-count");
                setShowSuccess(true);
                setCurrentTab("user");
            }
        } catch (error) {
            toast.error(
                "Failed to submit form. Refresh the page to submit again!"
            );
        } finally {
            setIsLoading(false);
        }
    }

    async function submitChecklist(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const data = await validateUser(checklistData.email);

        if (data?.userVerified) {
            let distanceCovered;
            try {
                const location =
                    window.navigator && window.navigator.geolocation;
                if (location) {
                    location.getCurrentPosition(async (position) => {
                        const coor2 = `${position.coords.latitude}, ${position.coords.longitude}`;

                        distanceCovered = getDistanceFromLatLonInKm(
                            checklistData.coordinates,
                            coor2
                        );
                        await submitCounts(distanceCovered);
                    });
                } else {
                    await submitCounts(0);
                }
            } catch (error: any) {
                if (!error.response.data.countSaved)
                    toast.error("Failed to submit form. Try again!");
            }
        } else {
            setIsSignUpFormOpen(true);
        }

        setIsLoading(false);
    }

    return (
        <form
            className="space-y-2"
            id="checklist-form"
            onSubmit={submitChecklist}
        >
            <div className="space-y-1 relative">
                <Label htmlFor="common-name">Common Name</Label>
                <Input
                    id="common-name"
                    autoComplete="off"
                    value={commonInput}
                    onChange={findCommonName}
                />
                <div
                    className={`absolute w-full h-60 scrollbar-thin overflow-y-scroll bg-white top-[calc(100%+.25rem)] rounded-md border p-3 shadow-lg z-50 ${
                        showCommonSearch ? "block" : "hidden"
                    }`}
                >
                    {searchResult.length !== 0 ? (
                        searchResult.map((result, i) => (
                            <SearchResultCard
                                key={i}
                                result={result}
                                setCommonInput={setCommonInput}
                                setBinomialInput={setBinomialInput}
                                setSelectedButterfly={setSelectedButterfly}
                                setShowSearch={setCommonSearch}
                            />
                        ))
                    ) : (
                        <SpeciesNotFound
                            commonInput={commonInput}
                            setSelectedButterfly={setSelectedButterfly}
                            setShowSearch={setCommonSearch}
                        />
                    )}
                </div>
            </div>
            <div className="space-y-1 relative">
                <Label htmlFor="binominal-name">Binominal Name</Label>
                <Input
                    id="binominal-name"
                    value={binomialInput}
                    onChange={findBinomialName}
                />
                <div
                    className={`absolute w-full h-60 scrollbar-thin overflow-y-scroll bg-white z-[1] top-[calc(100%+.25rem)] rounded-md border p-3 shadow-lg ${
                        showBinomialSearch ? "block" : "hidden"
                    }`}
                >
                    {searchResult.length !== 0 ? (
                        searchResult.map((result, i) => (
                            <SearchResultCard
                                key={i}
                                result={result}
                                setCommonInput={setCommonInput}
                                setBinomialInput={setBinomialInput}
                                setSelectedButterfly={setSelectedButterfly}
                                setShowSearch={setBinomialSearch}
                            />
                        ))
                    ) : (
                        <SpeciesNotFound
                            commonInput={binomialInput}
                            setSelectedButterfly={setSelectedButterfly}
                            setShowSearch={setBinomialSearch}
                        />
                    )}
                </div>
            </div>
            <div className="space-y-1">
                <Label htmlFor="remarks">
                    Remarks &#40;Male, Female, Seasonal form, etc&#41;
                </Label>
                <Input id="remarks" />
            </div>
            <div
                className="w-full flex justify-end"
                style={{ marginTop: "1rem" }}
            >
                <Button
                    className="bg-primaryGreen hover:bg-green-600"
                    type="button"
                    onClick={addSpecies}
                >
                    Add Species
                </Button>
            </div>
            <hr style={{ marginTop: "1rem", marginBottom: "2rem" }} />
            <div style={{ marginBottom: "3rem" }}>
                <h1 className="text-lg font-medium">Species List</h1>
                <hr />
                <div className="my-5 max-h-[500px] overflow-hidden overflow-y-scroll scrollbar-thin">
                    {checklistData.speciesFound.length !== 0 ? (
                        checklistData.speciesFound.map((specie, i) => (
                            <React.Fragment key={i}>
                                <SpeciesListCard specie={specie} index={i} />
                                <hr />
                            </React.Fragment>
                        ))
                    ) : (
                        <span className="text-sm text-muted-foreground flex justify-center">
                            No Species added yet.
                        </span>
                    )}
                </div>
            </div>
            {isSignUpFormOpen && <SignUpForm />}
        </form>
    );
};

export default ChecklistForm;
