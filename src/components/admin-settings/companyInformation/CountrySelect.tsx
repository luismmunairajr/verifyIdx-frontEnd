"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const countries = [
  "Moçambique",
  "Brasil",
  "Portugal",
  "Angola",
  "Estados Unidos",
  "Canadá",
  "França",
  "Alemanha",
  "Reino Unido",
  "Japão",
  "China",
  "Índia",
]

export function CountrySelect() {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>()

  return (
    <div className="w-96">
      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um país" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country} value={country}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
