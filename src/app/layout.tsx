import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import { GlobalContextProvider } from "@/context/store";
import { Toaster } from "sonner";
import NavbarVisibility from "@/components/navbar/navbar-visibility";
import SyncButterflyData from "@/components/sync-butterfly-data";

export const metadata: Metadata = {
    title: "Big Butterfly Month",
    description: "",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className="bg-zinc-50"
                style={{
                    background:
                        "url(https://images.unsplash.com/photo-1545703399-4313b14625d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    backgroundPosition: "top -250px right 70%",
                }}
            >
                <GlobalContextProvider>
                    <NavbarVisibility>
                        <Navbar />
                    </NavbarVisibility>
                    <main>{children}</main>
                    <Footer />
                    <Toaster richColors position="top-center" />
                    <SyncButterflyData />
                </GlobalContextProvider>
            </body>
        </html>
    );
}
