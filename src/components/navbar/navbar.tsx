import Image from "next/image";
import React from "react";
import Container from "../container";
import Links from "./links";

const Navbar = () => {
    return (
        <header
            className="fixed top-0 z-10 py-2 md:py-5 bg-[rgba(37,53,38,0.85)]
                   dark:bg-primary dark:text-white w-full px-3 md:px-2"
        >
            <Container>
                <nav
                    className="flex items-center font-semibold text-sm justify-between
       after:absolute after:inset-x-0 after:w-full after:h-12 after:shadow-hr after:z-[-1]"
                >
                    <div className="flex items-center gap-1">
                        <Image src="/logo.png" alt="" width={40} height={40} />
                        <h1 className="text-lg md:text-2xl font-light text-gray-100">
                            <span className="font-semibold">Big</span> Butterfly
                            Month
                        </h1>
                    </div>
                    <Links />
                </nav>
            </Container>
        </header>
    );
};

export default Navbar;
