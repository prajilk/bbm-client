"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Table } from "@tanstack/react-table";
import { Butterflies } from "../table/butterflies/columns";
import { updateButterfly } from "@/lib/api/admin/update-butterfly";
import { addButterfly } from "@/lib/api/admin/add-butterfly";

const AddEditButterflies = ({
    id,
    table,
    action,
    children,
}: {
    id?: string;
    action: "add" | "edit";
    table: Table<any>;
    children: React.ReactNode;
}) => {
    const butterfly = table.options.meta?.data.find(
        (value: Butterflies) => value._id === id
    ) as Butterflies;

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Butterflies>(
        id
            ? {
                  _id: butterfly?._id,
                  commonName: butterfly?.commonName,
                  binomialName: butterfly?.binomialName,
                  image: butterfly?.image,
              }
            : {
                  _id: "",
                  commonName: "",
                  binomialName: "",
                  image: "",
              }
    );
    async function handleAction(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true);
            if (action === "add") {
                const result = await addButterfly({
                    commonName: data.commonName,
                    binomialName: data.binomialName,
                    image: data.image,
                });
                if (result?.error || result.id === null)
                    toast.error(result.error);
                else {
                    table.options.meta?.setData((prev) => [
                        ...prev,
                        {
                            _id: result.id,
                            commonName: data.commonName,
                            binomialName: data.binomialName,
                            image: data.image,
                        },
                    ]);
                    toast.success("New Butterfly added successfully!");
                    setData({
                        _id: "",
                        commonName: "",
                        binomialName: "",
                        image: "",
                    });
                }
            } else {
                const result = await updateButterfly(id!, data);
                if (result?.error) toast.error(result.error);
                else {
                    table.options.meta?.setData((prev) =>
                        prev.map((value) => (value._id === id ? data : value))
                    );
                    toast.success("Butterfly updated successfully!");
                }
            }
        } catch (error) {
            toast.error("Unable to perform the operation!");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-left">
                        Edit Butterfly
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAction} id="addEditData">
                    <input type="number" defaultValue={id} hidden name="id" />
                    <Label>Common Name</Label>
                    <Input
                        type="text"
                        name="commonName"
                        placeholder="Enter Common name"
                        className="my-2"
                        value={data.commonName}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                commonName: e.target.value,
                            }))
                        }
                    />
                    <Label>Binomial Name</Label>
                    <Input
                        type="text"
                        name="binomialName"
                        placeholder="Enter Binomial name"
                        className="my-2"
                        value={data.binomialName}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                binomialName: e.target.value,
                            }))
                        }
                    />
                    <Label>Image URL</Label>
                    <Input
                        type="text"
                        name="image"
                        placeholder="Paste Image URL"
                        value={data.image}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                image: e.target.value,
                            }))
                        }
                        className="my-2"
                    />
                    <span className="text-muted-foreground text-sm">
                        Preview:
                    </span>
                    <img src={data.image} width={80} className="mt-2" alt="" />
                </form>
                <DialogFooter className="flex-row gap-1 justify-end">
                    <DialogClose className="bg-gray-200 px-2.5 py-1.5 rounded-md text-sm w-fit">
                        Cancel
                    </DialogClose>
                    <Button
                        className="bg-primaryGreen px-2.5 py-1.5 rounded-md text-white text-sm hover:bg-green-600 w-fit"
                        disabled={
                            data.binomialName === "" ||
                            data.commonName === "" ||
                            !(
                                data.image?.startsWith("https://") ||
                                data.image?.startsWith("http://")
                            )
                        }
                        type="submit"
                        form="addEditData"
                        size={"sm"}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddEditButterflies;
