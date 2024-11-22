import { Input } from "@/components/ui/input";

interface InputProps {
    filterText: string;
    setFilterText: (text: string) => void;
}

export default function InputSearch({
    filterText,
    setFilterText,
}: InputProps) {
    return (
        <div className="bg-white w-full rounded-lg px-3 flex items-center justify-between dark:bg-zinc-950">
            <Input
                type="text"
                placeholder="Search name"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="bg-transparent w-full h-12 border-none" />
        </div>
    )
}