import { Person } from "../../type";

interface PersonDetailsProps {
    person: Person
}

export default function OtherInfo({person}:PersonDetailsProps) {
    return(
        <div>
            Other Info
        </div>
    )
}