"use client";

import { FormEvent, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
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
import { Butterflies } from "../table/butterflies/columns";
import { Table } from "@tanstack/react-table";
import { toast } from "sonner";
import { deleteButterfly } from "@/lib/api/admin/delete-butterfly";

const DeleteButterfly = ({
    id,
    table,
}: {
    id: string;
    table: Table<Butterflies>;
}) => {
    const [isLoading, setIsLoading] = useState(false);

    async function handleDelete(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true);
            // Delete BUTTERFLY from Json
            const result = await deleteButterfly(id);
            if (result?.error) toast.error("Unable to delete data!");
            else {
                table.options.meta?.setData((prev) =>
                    prev.filter((value) => value._id !== id)
                );
                toast.success("Data deleted successfully!");
            }
        } catch (error) {
            toast.error("Unable to delete data");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="bg-red-100 rounded-full hover:bg-red-200 duration-300"
                    size={"sm"}
                >
                    <Trash2 size={15} className="text-destructive" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-left">
                        Are you sure you want to delete data?
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
                    <form onSubmit={handleDelete} className="m-0 p-0">
                        <input
                            type="number"
                            hidden
                            name="id"
                            defaultValue={id}
                        />
                        <Button
                            type="submit"
                            className="bg-destructive px-2.5 py-1.5 rounded-md text-white text-sm hover:bg-red-700 w-fit"
                            disabled={isLoading}
                        >
                            <span className="w-14">
                                {isLoading ? (
                                    <Loader2 className="animate-spin mx-auto" />
                                ) : (
                                    "Delete"
                                )}
                            </span>
                        </Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteButterfly;
