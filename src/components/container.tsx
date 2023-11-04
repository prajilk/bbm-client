import { cn } from "@/lib/utils";

const Container = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("mx-auto w-full max-w-6xl md:px-2", className)}>
            {children}
        </div>
    );
};

export default Container;
