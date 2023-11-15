import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

type SortDropdownProps = {
    sortByCount: () => void;
    sortByDate: () => void;
};

const SortDropdown = ({ sortByCount, sortByDate }: SortDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size={"sm"}>
                    Sort by
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={sortByCount}
                    className="cursor-pointer flex justify-between gap-2"
                >
                    Sort by Counts
                    <ArrowUpDown className="h-4 w-4" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={sortByDate}
                    className="cursor-pointer flex justify-between gap-2"
                >
                    Sort by Date
                    <ArrowUpDown className="h-4 w-4" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SortDropdown;
