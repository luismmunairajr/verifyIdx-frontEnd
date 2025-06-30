import { Label } from "@/components/ui/label";

  export default function DetailField({ label, value }) {
    return (
      <div className="space-y-1">
        <Label className="uppercase text-zinc-600 text-xs">{label}</Label>
        <p className="dark:text-white">{value}</p>
      </div>
    );
  }
  