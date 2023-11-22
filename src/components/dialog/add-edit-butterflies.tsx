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
import ButterflyJson from "@/lib/butterflies_with_images.json";
import { useState } from "react";
import { Species } from "@/lib/types";
import { addButterflyAction, editButterflyAction } from "@/app/action";
import { toast } from "sonner";
import { Table } from "@tanstack/react-table";

const AddEditButterflies = ({
    id,
    table,
    action,
    children,
}: {
    id?: number;
    action: "add" | "edit";
    table: Table<any>;
    children: React.ReactNode;
}) => {
    const index = ButterflyJson.findIndex((value) => value.id === id);
    const [data, setData] = useState<Omit<Species, "count">>(
        id
            ? {
                  commonName: ButterflyJson[index].commonName,
                  binomialName: ButterflyJson[index].binomialName,
                  image: ButterflyJson[index].image,
              }
            : {
                  commonName: "",
                  binomialName: "",
                  image: "",
              }
    );
    async function handleAction(formData: FormData) {
        try {
            const result =
                action === "add"
                    ? await addButterflyAction(formData)
                    : await editButterflyAction(formData);
            if (result?.error) toast.error(result.error);
            // Delete BUTTERFLY from state
            else {
                if (action === "add") {
                    ButterflyJson.push({
                        ...data,
                        id: ButterflyJson.length + 1,
                    });
                    toast.success("New Butterfly added successfully!");
                    setData({
                        commonName: "",
                        binomialName: "",
                        image: "",
                    });
                } else {
                    ButterflyJson[index] = {
                        id: id!,
                        ...data,
                    };
                    toast.success("Butterfly updated successfully!");
                }
                table.options.meta?.setData([...ButterflyJson]);
            }
        } catch (error) {
            toast.error("Unable to add new data");
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
                <form action={handleAction} id="addEditData">
                    <input type="number" value={id} hidden name="id" />
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
                    <img src={data.image} width={80} className="mt-2" />
                </form>
                <DialogFooter className="flex-row gap-1 justify-end">
                    <DialogClose className="bg-gray-200 px-2.5 py-1.5 rounded-md text-sm w-fit">
                        Cancel
                    </DialogClose>
                    <Button
                        className="bg-primaryGreen px-2.5 py-1.5 rounded-md text-white text-sm hover:bg-green-600 w-fit"
                        disabled={(data.binomialName || data.commonName) === ""}
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
