import { DropdownMenuCheckboxes } from "./DropDownMenuCheckBoxes.jsx";
import { Input } from "@/components/ui/input";

export default function InputSearch({
    filterText,
    setFilterText,
    showPending,
    showComplete,
    showRejected,
    setShowPending,
    setShowComplete,
    setShowRejected
}) {
    return (
        <div className="bg-white w-full rounded-lg px-3 flex items-center justify-between dark:bg-zinc-950">
            <Input
                type="text"
                placeholder="Search name"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="bg-transparent w-full h-12 border-none" 
            />
            <div className="flex items-center justify-center space-x-2">
                <DropdownMenuCheckboxes
                    showPending={showPending}
                    showComplete={showComplete}
                    showRejected={showRejected}
                    setShowPending={setShowPending}
                    setShowComplete={setShowComplete}
                    setShowRejected={setShowRejected} 
                />
            </div>
        </div>
    );
}
