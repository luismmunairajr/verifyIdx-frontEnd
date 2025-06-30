"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TimezoneSelect() {
  const [timezones, setTimezones] = useState<string[]>([])
  const [selectedTimezone, setSelectedTimezone] = useState<string | undefined>()

  useEffect(() => {
    if (typeof Intl !== "undefined" && typeof Intl.supportedValuesOf === "function") {
      const tz = Intl.supportedValuesOf("timeZone")
      setTimezones(tz)
    } else {
      // fallback caso a API não seja suportada
      setTimezones([
        "Africa/Maputo",
        "America/New_York",
        "Europe/Lisbon",
        "Asia/Tokyo",
        "UTC",
      ])
    }
  }, [])

  return (
    <div className="w-96">
      <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o fuso horário" />
        </SelectTrigger>
        <SelectContent>
          {timezones.map((tz) => (
            <SelectItem key={tz} value={tz}>
              {tz}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
