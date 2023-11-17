import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Species } from "@/lib/types";

const ButterflyInputField = ({
    value,
    id,
    label,
    ...props
}: {
    value?: string | number;
    id: keyof Omit<Species, "speciesFound">;
    label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div className="space-y-1">
            <Label htmlFor={id}>{label}</Label>
            <Input className="h-8" id={id} value={value} {...props} />
        </div>
    );
};

export default ButterflyInputField;
