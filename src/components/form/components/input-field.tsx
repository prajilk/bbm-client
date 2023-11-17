import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGlobalContext } from "@/context/store";
import { ChecklistProps } from "@/lib/types";

const InputField = ({
    label,
    id,
    value,
    type,
}: {
    label: string;
    id: keyof Omit<ChecklistProps, "speciesFound">;
    value?: string;
    type?: string;
}) => {
    const { checklistData, setChecklistData } = useGlobalContext();

    return (
        <div className="space-y-1">
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                value={value || checklistData[id]}
                onChange={(e) =>
                    setChecklistData((prev) => ({
                        ...prev,
                        [id]: e.target.value,
                    }))
                }
                type={type || "text"}
            />
        </div>
    );
};

export default InputField;
