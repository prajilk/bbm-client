import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
    const cookie = cookies();
    const adminCookie = cookie.get("admin")?.value;
    if (!adminCookie) redirect("/admin-login");
    return <div className="bg-zinc-50 w-full min-h-screen">{children}</div>;
};

export default layout;
