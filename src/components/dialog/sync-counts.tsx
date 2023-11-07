import { Dialog, DialogContent } from "../ui/dialog";
import { RefreshCcwDot } from "lucide-react";

const SyncCount = ({ isSyncing }: { isSyncing: boolean }) => {
    return (
        <Dialog open={isSyncing}>
            <DialogContent className="max-w-[200px] rounded-md outline-none px-0">
                <RefreshCcwDot className="animate-spin mx-auto text-primaryGreen" />
                <p className="text-center font-medium text-xs">
                    Syncing Previous Counts...
                </p>
            </DialogContent>
        </Dialog>
    );
};

export default SyncCount;
