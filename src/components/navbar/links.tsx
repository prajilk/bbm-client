"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";

const LINKS = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "About us",
        href: "/about",
    },
    {
        title: "Data",
        href: "/data",
    },
    {
        title: "How to participate",
        href: "/participate",
    },
    {
        title: "Butterfly counts",
        href: "/butterfly-counts",
    },
    {
        title: "Resources",
        href: "/resources",
    },
    {
        title: "Calender",
        href: "/calender",
    },
    {
        title: "Login",
        href: "/login",
    },
];

const Links = () => {
    const pathname = usePathname();
    return (
        <>
            <div className="block lg:hidden">
                <Sheet>
                    <SheetTrigger>
                        <Menu className="text-white" />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader className="text-left">
                            <SheetTitle className="font-normal">
                                <span className="font-semibold">Big</span>{" "}
                                Butterfly Month
                            </SheetTitle>
                        </SheetHeader>
                        <ul className="font-light text-[1rem] mt-3">
                            {LINKS.map((link, i) => (
                                <li
                                    className={`${
                                        pathname === link.href
                                            ? "text-primaryGreen font-medium"
                                            : ""
                                    } cursor-pointer hover:text-primaryGreen duration-300 px-2 py-1`}
                                    key={i}
                                >
                                    <Link href={link.href}>{link.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </SheetContent>
                </Sheet>
            </div>
            <ul className="text-white font-light text-sm items-center hidden lg:flex">
                {LINKS.map((link, i) => (
                    <li
                        className={`${
                            pathname === link.href
                                ? "text-[#5dc269] font-medium"
                                : ""
                        } cursor-pointer hover:text-primaryGreen duration-300 px-2 py-1`}
                        key={i}
                    >
                        <Link href={link.href}>{link.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Links;
