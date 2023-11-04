"use client";

import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
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
import axios from "@/config/axios.config";
import { saveChecklist } from "@/lib/api/save-checklist";
import SignUpForm from "./signup-form";
import { getDistanceFromLatLonInKm } from "@/lib/utils";
import { Dialog, DialogContent } from "../ui/dialog";
import { CheckCircle } from "lucide-react";

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

    const [showSearch, setShowSearch] = useState(false);
    const [commonInput, setCommonInput] = useState("");
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
        setShowSearch(true);
        const result = ButterfliesJson.filter((butterfly) =>
            butterfly.commonName
                .toLowerCase()
                .startsWith(e.target.value.toLowerCase())
        );
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
            const data = await saveChecklist({
                ...checklistData,
                distanceCovered: distanceCovered,
            });
            if (data.countSaved) {
                toast.success("Form submitted successfully.");
                setSpecies([]);
                setShowSuccess(true);
                setCurrentTab("user");
            }
        } catch (error) {
            toast.error("Failed to submit form. Try again!");
        } finally {
            setIsLoading(false);
        }
    }

    async function submitChecklist(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true);
            const { data } = await axios.post("/api/user/validate-user", {
                email: checklistData.email,
            });
            if (data.userVerified) {
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
                    className={`absolute w-full h-60 scrollbar-thin overflow-y-scroll bg-white top-[4.3rem] rounded-md border p-3 shadow-lg ${
                        showSearch ? "block" : "hidden"
                    }`}
                >
                    {searchResult.length !== 0 ? (
                        searchResult.map((result, i) => (
                            <SearchResultCard
                                key={i}
                                result={result}
                                setCommonInput={setCommonInput}
                                setSelectedButterfly={setSelectedButterfly}
                                setShowSearch={setShowSearch}
                            />
                        ))
                    ) : (
                        <SpeciesNotFound
                            commonInput={commonInput}
                            setSelectedButterfly={setSelectedButterfly}
                            setShowSearch={setShowSearch}
                        />
                    )}
                </div>
            </div>
            <div className="space-y-1">
                <Label htmlFor="binominal-name">Binominal Name</Label>
                <Input
                    id="binominal-name"
                    value={selectedButterfly?.binomialName}
                    onChange={(e) =>
                        setSelectedButterfly((prev) => ({
                            ...prev,
                            binomialName: e.target.value,
                        }))
                    }
                />
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
                        species.reverse().map((specie, i) => (
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
