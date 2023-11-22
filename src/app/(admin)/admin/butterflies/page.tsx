import { columns } from "@/components/table/butterflies/columns";
import { DataTable } from "@/components/table/butterflies/data-table";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ButterfliesJSON from "@/lib/butterflies_with_images.json";

const page = async () => {
    return (
        <>
            <div className="lg:flex bg-zinc-100">
                <div className="w-60 min-h-screen bg-white p-3 border-e hidden lg:block">
                    <div className="flex items-center gap-1">
                        <Image src="/logo.png" alt="" width={40} height={40} />
                        <Link href="/" className="font-light text-black">
                            <span className="font-semibold">Big</span> Butterfly
                            Month
                        </Link>
                    </div>
                    <h1 className="font-semibold text-muted-foreground mt-10 mb-2">
                        MENU
                    </h1>
                    <ul className="text-sm">
                        <li className="hover:bg-gray-100 rounded-md px-2 py-1">
                            <Link href={"/admin"} className="w-full block">
                                All counts
                            </Link>
                        </li>
                        <li className="hover:bg-gray-100 rounded-md px-2 py-1">
                            <Link
                                href={"/admin/users"}
                                className="w-full block"
                            >
                                Users
                            </Link>
                        </li>
                        <li className="hover:bg-gray-100 rounded-md px-2 py-1">
                            <Link
                                href={"/admin/butterflies"}
                                className="w-full block"
                            >
                                Butterflies
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex-1 min-h-screen">
                    <div className="bg-white shadow-[0_5px_5px_-7px_#333] h-16 flex items-center gap-4">
                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger className="ms-1">
                                    <Menu className="text-black" />
                                </SheetTrigger>
                                <SheetContent side={"left"}>
                                    <SheetHeader className="text-left">
                                        <SheetTitle className="font-normal">
                                            <span className="font-semibold">
                                                Big
                                            </span>{" "}
                                            Butterfly Month
                                        </SheetTitle>
                                    </SheetHeader>
                                    <ul className="font-light text-[1rem] mt-3">
                                        <li>
                                            <SheetClose asChild>
                                                <Link href={"/admin"}>
                                                    All counts
                                                </Link>
                                            </SheetClose>
                                        </li>
                                        <li>
                                            <SheetClose asChild>
                                                <Link href={"/admin/users"}>
                                                    Users
                                                </Link>
                                            </SheetClose>
                                        </li>
                                        <li>
                                            <SheetClose asChild>
                                                <Link
                                                    href={"/admin/butterflies"}
                                                >
                                                    Butterflies
                                                </Link>
                                            </SheetClose>
                                        </li>
                                    </ul>
                                </SheetContent>
                            </Sheet>
                        </div>
                        <div className="flex items-center gap-1 lg:hidden">
                            <Image
                                src="/logo.png"
                                alt=""
                                width={40}
                                height={40}
                            />
                            <Link href="/" className="font-light text-black">
                                <span className="font-semibold">Big</span>{" "}
                                Butterfly Month
                            </Link>
                        </div>
                    </div>
                    <div className="bg-white m-2 mt-5">
                        <div className="flex justify-between items-center p-5">
                            <h1 className="font-semibold text-lg">
                                Butterfly List
                            </h1>
                            <span className="text-sm text-muted-foreground">
                                Total Butterflies: {ButterfliesJSON.length || 0}
                            </span>
                        </div>
                        <hr className="my-5" />
                        <div className="container mx-auto py-5">
                            <DataTable
                                columns={columns}
                                data={ButterfliesJSON}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
