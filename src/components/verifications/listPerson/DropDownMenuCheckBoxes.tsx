import * as React from "react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";

interface DropdownMenuCheckboxesProps {
  showPending: boolean;
  showComplete: boolean;
  showRejected: boolean;
  setShowPending: (value: boolean) => void;
  setShowComplete: (value: boolean) => void;
  setShowRejected: (value: boolean) => void;
}

export function DropdownMenuCheckboxes({
  showPending,
  showComplete,
  showRejected,
  setShowPending,
  setShowComplete,
  setShowRejected,
}: DropdownMenuCheckboxesProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SlidersHorizontal strokeWidth={1} className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filtrar Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={showPending} onCheckedChange={setShowPending}>
          Pending
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showComplete} onCheckedChange={setShowComplete}>
          Complete
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showRejected} onCheckedChange={setShowRejected}>
          Rejected
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
