import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

const loading = () => {
    return (
        <AlertDialog open>
            <AlertDialogContent className="max-w-fit flex justify-center items-center p-5">
                <Loader2 className="animate-spin text-primaryGreen" />
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default loading;
