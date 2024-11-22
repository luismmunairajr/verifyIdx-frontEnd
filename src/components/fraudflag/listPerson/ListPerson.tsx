import InputSeatch from "./Input";
import ListVerifications from "./ListVerifications";
import { Person } from "../type";
import { useState } from "react";
import { profiles } from "../example/profile";

interface ListPersonProps {
  onSelectPerson: (person: Person) => void;
}

export default function ListPerson({ onSelectPerson }: ListPersonProps) {
  const [filterText, setFilterText] = useState<string>("")

  const filteredProfiles = profiles.filter((person: Person) => {
    const matchesText = person.name.toLowerCase().includes(filterText.toLowerCase())
    return matchesText
  })


  return (
    <div className="bg-zinc-100 flex w-96 text-black flex-col items-start p-4 space-y-6 overflow-y-auto dark:text-white dark:bg-zinc-900">
      <InputSeatch
        filterText={filterText}
        setFilterText={setFilterText} />
      <h2 className="text-lg font-medium">Fraudflag</h2>
      <ListVerifications onSelectPerson={onSelectPerson} profiles={filteredProfiles}/>
    </div>
  );
}
