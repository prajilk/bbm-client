import { Loader2 } from "lucide-react";
import { Button } from "./button";
import { LoadingButtonProps } from "@/lib/types";

const LoadingButton: React.FunctionComponent<LoadingButtonProps> = ({
    children,
    className,
    loader,
    ...buttonProps
}) => {
    return (
        <Button {...buttonProps} className={className}>
            {loader ? <Loader2 className="animate-spin" /> : children}
        </Button>
    );
};

export default LoadingButton;
