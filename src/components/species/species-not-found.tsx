import { SpeciesNotFoundProps } from "@/lib/types";

const SpeciesNotFound = (props: SpeciesNotFoundProps) => {
    return (
        <div className="w-full flex flex-col gap-3 items-center">
            <h1 className="mt-5">Not Found</h1>
            <button
                type="button"
                className="text-xs bg-primaryGreen rounded-md px-2 py-1 text-white"
                onClick={() => {
                    props.setSelectedButterfly((prev) => ({
                        ...prev,
                        commonName: props.commonInput,
                    }));
                    props.setShowSearch(false);
                }}
            >
                Add {props.commonInput}?
            </button>
        </div>
    );
};

export default SpeciesNotFound;
