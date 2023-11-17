import EditCountForm from "@/components/form/edit-count-form";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { getCount } from "@/lib/api/admin/get-count";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Edit = async ({
    searchParams,
}: {
    searchParams: {
        "count-id": string | undefined;
        "user-id": string | undefined;
    };
}) => {
    const cid = searchParams["count-id"];
    const userId = searchParams["user-id"];

    const count = await getCount(cid, userId);

    return (
        <div className="w-full bg-zinc-100 min-h-screen pb-3">
            <nav className="w-full bg-white shadow-md px-1 md:px-5 py-3 flex items-center gap-3">
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger className="ms-1">
                            <Menu className="text-black" />
                        </SheetTrigger>
                        <SheetContent side={"left"}>
                            <SheetHeader className="text-left">
                                <SheetTitle className="font-normal">
                                    <span className="font-semibold">Big</span>{" "}
                                    Butterfly Month
                                </SheetTitle>
                            </SheetHeader>
                            <ul className="font-light text-[1rem] mt-3">
                                <li>
                                    <SheetClose asChild>
                                        <Link href={"/admin"}>All counts</Link>
                                    </SheetClose>
                                </li>
                                <li>
                                    <SheetClose asChild>
                                        <Link href={"/admin/users"}>Users</Link>
                                    </SheetClose>
                                </li>
                            </ul>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="flex items-center gap-1">
                    <Image src="/logo.png" alt="" width={40} height={40} />
                    <Link href="/" className="font-light text-black">
                        <span className="font-semibold">Big</span> Butterfly
                        Month
                    </Link>
                </div>
                <ul className="text-sm ms-auto hidden md:flex">
                    <li className="hover:text-primaryGreen px-2 py-1">
                        <Link href={"/admin"} className="w-full block">
                            All counts
                        </Link>
                    </li>
                    <li className="hover:text-primaryGreen px-2 py-1">
                        <Link href={"/admin/users"} className="w-full block">
                            Users
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="bg-white my-3 max-w-6xl mx-auto p-5">
                <h1 className="text-lg font-semibold">Edit count</h1>
                <hr className="my-2" />
                {cid && cid !== "" && count && count.user && count.count ? (
                    <>
                        <h1 className="font-semibold mb-3">Details</h1>
                        <div className="flex gap-2 lg:gap-4 flex-wrap">
                            <h2 className="text-sm text-muted-foreground lg:mb-5 w-full lg:w-fit">
                                User id:{" "}
                                <span className="text-black font-semibold">
                                    {count.user._id}
                                </span>
                            </h2>
                            <h2 className="text-sm text-muted-foreground w-full lg:w-fit">
                                User:{" "}
                                <span className="text-black font-semibold">
                                    {count.user.fullname}
                                </span>
                            </h2>
                            <h2 className="text-sm text-muted-foreground w-full lg:w-fit">
                                Email:{" "}
                                <span className="text-black font-semibold">
                                    {count.user.email}
                                </span>
                            </h2>
                            <h2 className="text-sm text-muted-foreground mb-5 w-full lg:w-fit">
                                Count id:{" "}
                                <span className="text-black font-semibold">
                                    {count.count._id}
                                </span>
                            </h2>
                        </div>
                        <hr className="my-2" />
                        <h1 className="font-semibold mb-3">Count Data</h1>
                        <EditCountForm
                            count={count.count}
                            userId={count.user._id}
                        />
                    </>
                ) : (
                    <h1 className="text-center text-muted-foreground mt-5 text-sm">
                        Unable to find any data!
                    </h1>
                )}
            </div>
        </div>
    );
};

export default Edit;
