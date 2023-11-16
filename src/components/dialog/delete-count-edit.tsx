"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useGlobalContext } from "@/context/store";
import { Trash2 } from "lucide-react";

const DeleteCountEdit = ({ index }: { index: number }) => {
    const { setChecklistData } = useGlobalContext();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="w-8 h-8 bg-gray-100 rounded-full flex justify-center items-center hover:bg-gray-200 duration-300"
                >
                    <Trash2 size={15} color="red" />
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-left">
                        Are you sure you want to delete this count?
                    </DialogTitle>
                    <DialogDescription className="text-left">
                        This action cannot be undone. This will permanently
                        delete this count and remove this count from the
                        servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-row gap-2 justify-end">
                    <DialogClose className="bg-gray-200 px-2.5 py-1.5 rounded-md text-sm w-fit">
                        Cancel
                    </DialogClose>
                    <Button
                        onClick={() =>
                            setChecklistData((prev) => ({
                                ...prev,
                                speciesFound: prev.speciesFound.filter(
                                    (_, i) => index !== i
                                ),
                            }))
                        }
                        className="bg-destructive px-2.5 py-1.5 rounded-md text-white text-sm hover:bg-red-700 w-fit"
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteCountEdit;
