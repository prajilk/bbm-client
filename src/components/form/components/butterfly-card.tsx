import ChangeImageUrl from "@/components/dialog/change-image-url";
import DeleteCountEdit from "@/components/dialog/delete-count-edit";
import { useGlobalContext } from "@/context/store";
import { Species } from "@/lib/types";
import Image from "next/image";
import ButterflyInputField from "./butterfly-input-field";
import { ChangeEvent } from "react";

const ButterflyCard = ({
    specie,
    index,
}: {
    specie: Species;
    index: number;
}) => {
    const { setChecklistData } = useGlobalContext();

    function handleCommonName(e: ChangeEvent<HTMLInputElement>) {
        setChecklistData((prev) => ({
            ...prev,
            speciesFound: [
                ...prev.speciesFound.slice(0, index),
                {
                    ...prev.speciesFound[index],
                    commonName: e.target.value,
                },
                ...prev.speciesFound.slice(index + 1),
            ],
        }));
    }

    function handleBinomialName(e: ChangeEvent<HTMLInputElement>) {
        setChecklistData((prev) => ({
            ...prev,
            speciesFound: [
                ...prev.speciesFound.slice(0, index),
                {
                    ...prev.speciesFound[index],
                    binomialName: e.target.value,
                },
                ...prev.speciesFound.slice(index + 1),
            ],
        }));
    }

    function handleCount(e: ChangeEvent<HTMLInputElement>) {
        setChecklistData((prev) => ({
            ...prev,
            speciesFound: [
                ...prev.speciesFound.slice(0, index),
                {
                    ...prev.speciesFound[index],
                    count: Number(e.target.value) || 0,
                },
                ...prev.speciesFound.slice(index + 1),
            ],
        }));
    }
    return (
        <>
            <div className="space-y-1 min-w-[250px] flex-grow-0 flex-shrink-0">
                <div className="flex justify-between items-center">
                    <h1 className="font-medium text-sm my-3 border-b border-primaryGreen w-fit">
                        Count {index + 1}
                    </h1>
                    <DeleteCountEdit index={index} />
                </div>
                <ButterflyInputField
                    id="commonName"
                    label="Common Name"
                    value={specie.commonName}
                    onChange={handleCommonName}
                />
                <ButterflyInputField
                    id="binomialName"
                    label="Binomial Name"
                    value={specie.binomialName}
                    onChange={handleBinomialName}
                />
                <ButterflyInputField
                    id="count"
                    label="Count"
                    value={specie.count}
                    onChange={handleCount}
                    min={0}
                    type="number"
                />
                <div className="flex items-center gap-4 py-2">
                    <div className="relative w-16 aspect-square">
                        <Image
                            src={specie.image || "/"}
                            alt="Butterfly"
                            fill
                            sizes="100px"
                        />
                    </div>
                    <ChangeImageUrl index={index} />
                </div>
            </div>
            <div className="border-r mx-5" />
        </>
    );
};

export default ButterflyCard;
