import { DropdownMenuCheckboxes } from "./DropDownMenuCheckBoxes.jsx";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/language/language-provider";

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
    const { t } = useLanguage()
    return (
        <div className="bg-white w-full rounded-lg px-3 flex items-center justify-between dark:bg-zinc-950">
            <Input
                type="text"
                placeholder={t("searchName")}
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
