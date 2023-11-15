"use client";

import { usePathname } from "next/navigation";

const NavbarVisibility = ({ children }: { children: React.ReactNode }) => {
    const path = usePathname();
    if (path.startsWith("/admin")) return;

    return <>{children}</>;
};

export default NavbarVisibility;
