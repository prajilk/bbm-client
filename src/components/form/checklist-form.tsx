"use client";

import React, { useState, ChangeEvent } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import ButterfliesJson from "../../lib/butterflies_with_images.json";
import { ButterflyProps } from "@/lib/types";
import SpeciesListCard from "../species/species-list-card";
import SpeciesNotFound from "../species/species-not-found";
import SearchResultCard from "../species/search-result-card";
import { useGlobalContext } from "@/context/store";
import { saveChecklist } from "@/lib/api/save-checklist";
import SignUpForm from "./signup-form";
import { getDistanceFromLatLonInKm } from "@/lib/utils";
import { validateUser } from "@/lib/api/validate-user";

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
    const [species, setSpecies] = useState<ButterflyProps[]>(
        checklistData.speciesFound
    );
    const [selectedButterfly, setSelectedButterfly] = useState<ButterflyProps>({
        binomialName: "",
        commonName: "",
        image: "",
    });
    const [searchResult, setSearchResult] = useState<
        { commonName: string; binomialName: string; image?: string }[]
    >([]);

    function findCommonName(e: ChangeEvent<HTMLInputElement>) {
        setCommonInput(e.target.value);
        setCommonSearch(true);
        const result = ButterfliesJson.filter((butterfly) =>
            butterfly.commonName
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        );
        setSearchResult(result);
    }

    function findBinomialName(e: ChangeEvent<HTMLInputElement>) {
        setBinomialInput(e.target.value);
        setBinomialSearch(true);
        const result = ButterfliesJson.filter((butterfly) =>
            butterfly.binomialName
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        );
        setCommonInput(selectedButterfly?.commonName);
        setSearchResult(result);
    }

    function addSpecies() {
        if (
            selectedButterfly.binomialName !== "" &&
            selectedButterfly.commonName !== ""
        ) {
            setSpecies((prevSpecies) => {
                if (
                    prevSpecies.some(
                        (species) =>
                            species.binomialName ===
                            selectedButterfly.binomialName
                    )
                )
                    return prevSpecies;
                return [...prevSpecies, selectedButterfly];
            });
            setCommonInput("");
            setBinomialInput("");
            toast.success(`"${commonInput}" added successfully!`);
            setChecklistData((prev) => ({
                ...prev,
                speciesFound: [
                    ...prev.speciesFound,
                    Object.assign({}, selectedButterfly, { count: 1 }),
                ],
            }));

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
                setSpecies([]);
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
        try {
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
            }
        } catch (error: any) {
            if (!error.response.data.userVerified) setIsSignUpFormOpen(true);
        } finally {
            setIsLoading(false);
        }
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
                    className={`absolute w-full h-60 scrollbar-thin overflow-y-scroll bg-white top-[calc(100%+.25rem)] rounded-md border p-3 shadow-lg ${
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
                <div className="my-5">
                    {species.length !== 0 ? (
                        species.map((specie, i) => (
                            <React.Fragment key={i}>
                                <SpeciesListCard
                                    specie={specie}
                                    setSpecies={setSpecies}
                                    index={i}
                                />
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
            {isSignUpFormOpen && <SignUpForm setSpecies={setSpecies} />}
        </form>
    );
};

export default ChecklistForm;
