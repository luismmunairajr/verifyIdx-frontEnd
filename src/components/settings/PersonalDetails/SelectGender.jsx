import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectGender({ disabled }) {
  return (
    <Select disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Gender</SelectLabel>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="prefer_not_say">Prefer not to say</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
