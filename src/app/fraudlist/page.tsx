'use client'

import { useState } from "react";
import CardList from "@/components/fraudlist/cardList";
import { Input } from "@/components/ui/input";
import { profiles } from "@/components/fraudlist/profile";

export default function Fraudlist() {
  const [search, setSearch] = useState("")

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full h-screen flex flex-col p-6">
      <div className="mb-4 w-full items-ce">
        <Input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-md items-center flex justify-center"
        />
      </div>
      <CardList profiles={filteredProfiles} />
    </div>
  );
}
