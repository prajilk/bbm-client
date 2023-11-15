"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export type Users = {
    _id: string;
    fullname: string;
    email: string;
};

export const columns: ColumnDef<Users>[] = [
    {
        accessorKey: "_id",
        header: "Id",
    },
    {
        accessorKey: "fullname",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-2"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Fullname
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-2"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        id: "actions",
        header: "Counts",
        cell: ({ row }) => {
            const userId = row.original._id;
            return (
                <Link
                    href={`/admin/${userId}`}
                    className="text-xs bg-primaryGreen p-2 rounded-md text-white hover:bg-green-600 duration-300 whitespace-nowrap"
                >
                    View Counts
                </Link>
            );
        },
    },
];
