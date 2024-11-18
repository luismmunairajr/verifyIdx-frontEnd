import { DropdownMenuCheckboxes } from "./DropDownMenuCheckBoxes"
import { Input } from "@/components/ui/input";

interface InputProps {
    filterText: string;
    setFilterText: (text: string) => void;
    showPending: boolean;
    showApproved: boolean;
    showRejected: boolean;
    setShowPending: (value: boolean) => void;
    setShowApproved: (value: boolean) => void;
    setShowRejected: (value: boolean) => void;
}

export default function InputSearch({
    filterText,
    setFilterText,
    showPending,
    showApproved,
    showRejected,
    setShowPending,
    setShowApproved,
    setShowRejected,
}: InputProps) {
    return (
        <div className="bg-white w-full rounded-lg px-3 flex items-center justify-between dark:bg-zinc-950">
            <Input
                type="text"
                placeholder="Search name"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="bg-transparent w-full h-12 border-none" />
            <div className="flex items-center justify-center space-x-2">
                <DropdownMenuCheckboxes
                    showPending={showPending}
                    showApproved={showApproved}
                    showRejected={showRejected}
                    setShowPending={setShowPending}
                    setShowApproved={setShowApproved}
                    setShowRejected={setShowRejected} />
            </div>
        </div>
    )
}