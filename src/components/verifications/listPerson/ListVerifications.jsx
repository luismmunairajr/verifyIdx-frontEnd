import PersonVerifications from "./PersonVerifications"
import unknow from "../../../../public/unknowProfile.svg"
export default function ListVerifications({ onSelectPerson, profiles }) {
  return (
    <div className="flex flex-col space-y-2 w-full overflow-y-auto pr-1">
      {profiles && profiles.length > 0 ? (
        profiles.map((person, index) => (
          <PersonVerifications
            key={index}
            name={person.fullName}
            status={person.status}
            image={person.auditTrailImage? `data:image/png;base64,${person.auditTrailImage}` : unknow}
            onclick={() => onSelectPerson(person)}
          />
        ))
      ) : (
        <div>No persons available</div>
      )}
    </div>
  )
}
