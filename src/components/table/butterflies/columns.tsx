"use client";

import AddEditButterflies from "@/components/dialog/add-edit-butterflies";
import DeleteButterfly from "@/components/dialog/delete-butterfly";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ImageOff, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type Butterflies = {
    id: number;
    commonName: string;
    binomialName: string;
    image?: string;
};

export const columns: ColumnDef<Butterflies>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "commonName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-2"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Common Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "binomialName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-2"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Binomial Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "image",
        header: "Images",
        cell: ({ row }) => {
            return row.original.image ? (
                <div className="w-14 h-14 relative">
                    <Image src={row.original.image} alt="" fill sizes="300px" />
                </div>
            ) : (
                <ImageOff />
            );
        },
    },
    {
        id: "actions",
        header: "Edit",
        cell: ({ row, table }) => {
            return (
                <>
                    <AddEditButterflies
                        action="edit"
                        table={table}
                        id={row.original.id}
                    >
                        <Button
                            className="bg-green-100 rounded-full hover:bg-green-200 duration-300"
                            size={"sm"}
                        >
                            <Pencil size={15} className="text-primaryGreen" />
                        </Button>
                    </AddEditButterflies>
                    <DeleteButterfly id={row.original.id} table={table} />
                </>
            );
        },
    },
];
