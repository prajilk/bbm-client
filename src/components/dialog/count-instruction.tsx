import { Info } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { countInstructions } from "@/lib/data";

const CountInstruction = () => {
    return (
        <Dialog>
            <DialogTrigger className="flex justify-center items-center rounded-full bg-gray-200 p-3">
                <Info />
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-left">
                        Join the Butterfly Adventure! Count and Explore!
                    </DialogTitle>
                </DialogHeader>
                <hr />
                <div className="max-h-[calc(100vh-100px)] overflow-y-scroll scrollbar-thin space-y-3">
                    {countInstructions.map((instruction, i) => (
                        <div className="space-x-2 text-xs md:text-sm" key={i}>
                            <span>{instruction.icon}</span>
                            <span className="font-bold">
                                {instruction.title}
                            </span>
                            <span>{instruction.description}</span>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CountInstruction;
