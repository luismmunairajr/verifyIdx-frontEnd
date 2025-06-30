"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const cities = [
  "Maputo",
  "Matola",
  "Beira",
  "Nampula",
  "Quelimane",
  "Tete",
  "Chimoio",
  "Xai-Xai",
  "Inhambane",
  "Pemba",
]

export function CitySelect() {
  const [selectedCity, setSelectedCity] = useState<string | undefined>()

  return (
    <div className="w-96">
      <Select value={selectedCity} onValueChange={setSelectedCity}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma cidade" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
