"use client";

import { toast } from "sonner";

const ImageLinks = ({ image }: { image: string }) => {
    return (
        <span
            className="ms-3 font-medium text-black w-full truncate block cursor-pointer"
            onClick={() => {
                navigator.clipboard.writeText(image);
                toast.success("Image url copied to clipboard!");
            }}
        >
            {image}
        </span>
    );
};

export default ImageLinks;
