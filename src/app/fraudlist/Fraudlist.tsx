'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { profiles } from "@/components/fraudlist/profile";
import DataTable from "@/components/fraudlist/dataTable";



export default function Fraudlist() {
  const [filter, setFilter] = useState("");
  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div className="w-full h-screen flex flex-col p-6 gap-4">
      <Input
        placeholder="Search name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"/>
      <DataTable profiles={filteredProfiles} />
    </div>
  );
}
