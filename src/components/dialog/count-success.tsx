import { Dialog, DialogContent } from "../ui/dialog";
import { CheckCircle } from "lucide-react";
import { useGlobalContext, checklistDefaultValues } from "@/context/store";
import { useEffect, useRef, useState } from "react";

const CountSuccess = () => {
    const { checklistData, setShowSuccess, showSuccess, setChecklistData } =
        useGlobalContext();
    const [successData, _] = useState({
        species: checklistData.speciesFound.length,
        butterflies: checklistData.speciesFound.reduce(
            (acc, curr) => acc + curr.count,
            0
        ),
        distanceCovered: checklistData.distanceCovered,
    });
    useEffect(() => {
        setChecklistData({
            ...checklistDefaultValues,
            email: checklistData.email,
            name: checklistData.name,
            contactNumber: checklistData.contactNumber,
        });
    });
    return (
        <Dialog
            open={showSuccess}
            onOpenChange={() => setShowSuccess((prev) => !prev)}
        >
            <DialogContent className="max-w-xs rounded-md">
                <CheckCircle className="text-primaryGreen mx-auto" />
                <p className="text-center font-medium">
                    Successfully Submitted Counts!
                </p>
                <ul>
                    <li className="text-xs md:text-sm">
                        Total Species found:{" "}
                        <span className="font-bold">{successData.species}</span>
                    </li>
                    <li className="text-xs md:text-sm">
                        Total Butterflies found:{" "}
                        <span className="font-bold">
                            {successData.butterflies}
                        </span>
                    </li>
                    <li className="text-xs md:text-sm">
                        Total Distance covered:{" "}
                        <span className="font-bold">
                            {successData.distanceCovered?.toFixed(1)} KM
                        </span>
                    </li>
                </ul>
            </DialogContent>
        </Dialog>
    );
};

export default CountSuccess;
