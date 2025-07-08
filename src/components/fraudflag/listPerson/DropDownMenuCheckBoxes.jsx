import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";

export function DropdownMenuCheckboxes({
  showPending,
  showApproved,
  showRejected,
  setShowPending,
  setShowApproved,
  setShowRejected,
}) {
  const { t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SlidersHorizontal strokeWidth={1} className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("filterStatus")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showPending}
          onCheckedChange={setShowPending}
        >
          {t("pending")}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showApproved}
          onCheckedChange={setShowApproved}
        >
          {t("approved")}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showRejected}
          onCheckedChange={setShowRejected}
        >
          {t("rejected")}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
