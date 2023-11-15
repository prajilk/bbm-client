import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import axios from "@/config/axios.config";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const DeleteCount = ({ id, user }: { id: string; user: string }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function deleteCount() {
        try {
            setIsLoading(true);
            const { data } = await axios.delete(
                `/api/admin/counts/${id}/${user}`
            );
            if (data?.deleted) {
                router.refresh();
                toast.success("Deleted successfully");
            } else toast.error("Unable to delete count");
        } catch (error) {
            toast.error("Unable to delete count");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="border border-destructive px-2 py-1 rounded-md text-xs text-destructive hover:bg-red-50">
                delete
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-left">
                        Are you sure you want to delete this count?
                    </DialogTitle>
                    <DialogDescription className="text-left">
                        This action cannot be undone. This will permanently
                        delete this count and remove this count from the
                        servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-row gap-2 justify-end">
                    <DialogClose className="bg-gray-200 px-2.5 py-1.5 rounded-md text-sm w-fit">
                        Cancel
                    </DialogClose>
                    <Button
                        onClick={deleteCount}
                        className="bg-destructive px-2.5 py-1.5 rounded-md text-white text-sm hover:bg-red-700 w-fit"
                        disabled={isLoading}
                    >
                        <span className="w-14">
                            {isLoading ? (
                                <Loader2 className="animate-spin mx-auto" />
                            ) : (
                                "Delete"
                            )}
                        </span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteCount;
