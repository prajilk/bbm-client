import { z } from "zod";
import { ZodLocationSchema, ZodUserSchema } from "./zodSchemas";

export type ButterflyProps = {
    commonName: string;
    binomialName: string;
    image?: string;
};

export type SpeciesNotFoundProps = {
    setSelectedButterfly: React.Dispatch<React.SetStateAction<ButterflyProps>>;
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
    commonInput: string;
};

export type SearchResultCardProps = {
    setSelectedButterfly: React.Dispatch<React.SetStateAction<ButterflyProps>>;
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
    setCommonInput: React.Dispatch<React.SetStateAction<string>>;
    setBinomialInput: React.Dispatch<React.SetStateAction<string>>;
    result: ButterflyProps;
};

export type LoadingButtonProps = {
    children?: React.ReactNode;
    type?: "button" | "reset" | "submit" | undefined;
    form?: string;
    className?: string;
    disabled?: boolean;
    loader: boolean;
};

export type ChecklistProps = z.infer<typeof ZodUserSchema> &
    z.infer<typeof ZodLocationSchema> & {
        distanceCovered?: number;
        speciesFound: {
            commonName: string;
            binomialName: string;
            image?: string;
            count: number;
        }[];
    };
