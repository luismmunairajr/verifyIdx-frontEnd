import { Person } from "../type";
import PersonVerifications from "./PersonVerifications"

interface ListVerificationsProps {
  onSelectPerson: (person: Person) => void
  profiles: Person[]
}

export default function ListVerifications({ onSelectPerson, profiles }: ListVerificationsProps) {
  return (
    <div className="flex flex-col space-y-2 w-full overflow-y-auto pr-1">
      {profiles && profiles.length > 0 ? (
        profiles.map((person: Person, index: number) => (
          <PersonVerifications
            key={index}
            name={person.name}
            status={person.status}
            image={person.image}
            onclick={() => onSelectPerson(person)}
          />
        ))
      ) : (
        <div>No persons available</div>
      )}
    </div>
  )
}
