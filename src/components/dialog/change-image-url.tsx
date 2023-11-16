"use client";

import { useGlobalContext } from "@/context/store";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";

const ChangeImageUrl = ({ index }: { index: number }) => {
    const { setChecklistData } = useGlobalContext();
    const [newImage, setNewImage] = useState("");

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size={"sm"}
                    variant={"outline"}
                    className="text-xs"
                    type="button"
                >
                    Change Image url
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Image Url</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    <Input
                        placeholder="Enter new image url"
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                    />
                    <DialogClose asChild>
                        <Button
                            className="bg-primaryGreen hover:bg-green-600 float-right"
                            size={"sm"}
                            onClick={() =>
                                setChecklistData((prev) => ({
                                    ...prev,
                                    speciesFound: prev.speciesFound.map(
                                        (specie, i) =>
                                            index === i
                                                ? { ...specie, image: newImage }
                                                : specie
                                    ),
                                }))
                            }
                        >
                            Change
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ChangeImageUrl;
