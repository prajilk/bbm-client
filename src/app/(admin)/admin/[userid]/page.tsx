import CountsContainer from "@/components/count/counts-container";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { getUserCounts } from "@/lib/api/admin/get-user-counts";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params }: { params: { userid: string } }) => {
    const counts = await getUserCounts(params.userid);

    return (
        <div className="flex bg-zinc-100">
            <div className="w-60 min-h-screen bg-white p-3 border-e hidden md:block">
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
                        <Link href={"/admin/users"} className="w-full block">
                            Users
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="flex-1 min-h-screen">
                <div className="bg-white shadow-[0_5px_5px_-7px_#333] h-16 flex items-center gap-4">
                    <div className="md:hidden">
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
                                </ul>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="flex items-center gap-1 md:hidden">
                        <Image src="/logo.png" alt="" width={40} height={40} />
                        <Link href="/" className="font-light text-black">
                            <span className="font-semibold">Big</span> Butterfly
                            Month
                        </Link>
                    </div>
                </div>
                <div className="p-5 bg-white m-2 mt-5">
                    <h1 className="text-sm text-muted-foreground">
                        User:{" "}
                        <span className="text-black font-semibold">
                            {counts?.user.fullname}
                        </span>
                    </h1>
                    <h2 className="text-sm text-muted-foreground mb-5">
                        Email:{" "}
                        <span className="text-black font-semibold">
                            {counts?.user.email}
                        </span>
                    </h2>
                    <CountsContainer counts={counts} />
                </div>
            </div>
        </div>
    );
};

export default page;
