import { useGlobalContext } from "@/context/store";
import { ButterflyProps } from "@/lib/types";
import { ImageOff, Minus, Plus, X } from "lucide-react";
import Image from "next/image";

const SpeciesListCard = ({
    specie,
    index,
}: {
    specie: ButterflyProps;
    index: number;
}) => {
    const { checklistData, setChecklistData } = useGlobalContext();

    function removeSpecies() {
        setChecklistData((prev) => ({
            ...prev,
            speciesFound: prev.speciesFound.filter((_, i) => i !== index),
        }));
    }

    function decreaseCount() {
        setChecklistData((prev) => ({
            ...prev,
            speciesFound: prev.speciesFound.map((specie, i) => ({
                ...specie,
                count:
                    i === index ? Math.max(1, specie.count - 1) : specie.count,
            })),
        }));
    }

    function increaseCount() {
        setChecklistData((prev) => ({
            ...prev,
            speciesFound: prev.speciesFound.map((specie, i) => ({
                ...specie,
                count:
                    i === index ? Math.max(1, specie.count + 1) : specie.count,
            })),
        }));
    }

    return (
        <div className="my-2 px-2 cursor-pointer items-center flex w-full">
            <div>
                <h1 className="text-sm font-medium">{specie.commonName}</h1>
                <p className="text-xs mb-1 text-muted-foreground">
                    {specie.binomialName}
                </p>
                <div className="flex w-fit mt-2 md:me-10 rounded-md border border-[rgba(0,0,0,0.4)]">
                    <button
                        type="button"
                        className="px-2 disabled:cursor-not-allowed"
                        onClick={decreaseCount}
                    >
                        <Minus size={15} />
                    </button>
                    <span className="min-w-[1em] py-0.5 text-center md:min-w-[1.5em] md:py-1">
                        {checklistData.speciesFound.map(
                            (specie, i) => i === index && specie.count
                        )}
                    </span>
                    <button
                        type="button"
                        className="px-2 disabled:cursor-not-allowed"
                        onClick={increaseCount}
                    >
                        <Plus size={15} />
                    </button>
                </div>
            </div>
            {specie.image ? (
                <div className="relative w-[80px] h-[80px] flex-shrink-0 ms-auto">
                    <Image
                        alt="Butterfly"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={specie.image}
                    />
                </div>
            ) : (
                <ImageOff className="ms-auto text-gray-400" />
            )}
            <button
                type="button"
                className="ms-1 md:ms-3"
                onClick={removeSpecies}
            >
                <X size={15} />
            </button>
        </div>
    );
};

export default SpeciesListCard;
