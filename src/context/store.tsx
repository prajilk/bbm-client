"use client";

import { ChecklistProps } from "@/lib/types";
import { formatCurrentDate, getCurrentTime } from "@/lib/utils";
import {
    createContext,
    useContext,
    useState,
    SetStateAction,
    Dispatch,
} from "react";

type ContextProps = {
    showSuccess: boolean;
    setShowSuccess: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    isSignUpFormOpen: boolean;
    setIsSignUpFormOpen: Dispatch<SetStateAction<boolean>>;
    currentTab: string;
    setCurrentTab: Dispatch<SetStateAction<string>>;
    checklistData: ChecklistProps;
    setChecklistData: Dispatch<SetStateAction<ChecklistProps>>;
};

export const checklistDefaultValues = {
    name: "",
    affiliation: "",
    contactNumber: "",
    email: "",
    teamNameOrNumber: "",
    date: formatCurrentDate(),
    startTime: getCurrentTime(),
    endTime: getCurrentTime(),
    location: "",
    coordinates: "",
    altitude: "",
    distanceCovered: 0,
    weather: "",
    imageLinks: "",
    comments: "",
    speciesFound: [],
};

const GlobalContext = createContext<ContextProps>({
    showSuccess: false,
    setShowSuccess: () => undefined,
    isLoading: false,
    setIsLoading: () => undefined,
    isSignUpFormOpen: false,
    setIsSignUpFormOpen: () => undefined,
    currentTab: "user",
    setCurrentTab: () => undefined,
    checklistData: checklistDefaultValues,
    setChecklistData: () => undefined,
});

export const GlobalContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState("user");
    const [checklistData, setChecklistData] = useState<ChecklistProps>(
        checklistDefaultValues
    );
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    return (
        <GlobalContext.Provider
            value={{
                showSuccess,
                setShowSuccess,
                isLoading,
                setIsLoading,
                isSignUpFormOpen,
                setIsSignUpFormOpen,
                currentTab,
                setCurrentTab,
                checklistData,
                setChecklistData,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
