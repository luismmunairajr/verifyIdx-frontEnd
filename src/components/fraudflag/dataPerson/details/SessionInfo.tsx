import { Person } from "../../type";

interface PersonDetailsProps {
    person: Person
}

export default function SessionInfo({person}: PersonDetailsProps) {
    return(
        <div>
            Session Info
        </div>
    )
}