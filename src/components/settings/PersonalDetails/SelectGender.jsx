import * as React from "react";

import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue,} from "@/components/ui/select";
import { useLanguage } from "@/components/language/language-provider";

export function SelectGender({ disabled }) {
  const { t } = useLanguage()
  
  return (
    <Select disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={t("selectGender")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("gender")}</SelectLabel>
          <SelectItem value="male">{t("male")}</SelectItem>
          <SelectItem value="female">{t("female")}</SelectItem>
          <SelectItem value="prefer_not_say">{t("preferNotSay")}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
