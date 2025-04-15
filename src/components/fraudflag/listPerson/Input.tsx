import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/language/language-provider";

interface InputProps {
  filterText: string;
  setFilterText: (text: string) => void;
}

export default function InputSearch({ filterText, setFilterText }: InputProps) {
  const { t } = useLanguage();
  return (
    <div className="bg-white w-full rounded-lg px-3 flex items-center justify-between dark:bg-zinc-950">
      <Input
        type="text"
        placeholder={t("searchName")}
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="bg-transparent w-full h-12 border-none"
      />
    </div>
  );
}
