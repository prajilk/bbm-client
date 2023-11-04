import { SearchResultCardProps } from "@/lib/types";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import React from "react";

const SearchResultCard = (props: SearchResultCardProps) => {
    return (
        <React.Fragment>
            <div
                className="my-2 cursor-pointer items-center flex w-full"
                onClick={() => {
                    props.setSelectedButterfly({
                        binomialName: props.result.binomialName,
                        commonName: props.result.commonName,
                        image: props.result.image,
                    });
                    props.setCommonInput(props.result.commonName);
                    props.setShowSearch(false);
                }}
            >
                <div>
                    <h1 className="text-sm font-medium">
                        {props.result.commonName}
                    </h1>
                    <p className="text-xs mb-1 text-muted-foreground">
                        {props.result.binomialName}
                    </p>
                </div>
                {props.result.image ? (
                    <div className="relative w-[80px] h-[80px] ms-auto">
                        <Image
                            alt="Butterfly"
                            className="ms-auto"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            src={props.result.image}
                        />
                    </div>
                ) : (
                    <ImageOff className="ms-auto text-gray-400" />
                )}
            </div>
            <hr />
        </React.Fragment>
    );
};

export default SearchResultCard;
